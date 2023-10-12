// 反代目标网站
const upstream = 'ipv6.google.com.hk'
const upstream_v4 = 'www.google.com.hk'

// 访问区域黑名单（按需设置）.
const blocked_region = ['TK']

//资源重定向
const replace_dict = {
'$upstream': '$custom_domain',

'www.google.com/': 'YOUR SUB DOMAIN/', //填入你的子域名
 
'gstatic.com': 'gstatic.cn',

'ajax.googleapis.com': 'ajax.lug.ustc.edu.cn',
'fonts.googleapis.com': 'fonts.googleapis.cn',
'themes.googleusercontent.com': 'google-themes.lug.ustc.edu.cn',
'www.gravatar.com/avatar':'dn-qiniu-avatar.qbox.me/avatar',

'www.google.co.jp': '$custom_domain',
'www.google.com.sg': '$custom_domain',
'books.google.com.hk': '$custom_domain',
'books.google.co.jp': '$custom_domain',
'books.google.com.sg': '$custom_domain',
'maps.google.com.hk': '$custom_domain',
'maps.google.co.jp': '$custom_domain',
'maps.google.com.sg': '$custom_domain',
'maps.google.com': '$custom_domain',
'books.google.com': '$custom_domain'

}

addEventListener('fetch', event => {
event.respondWith(fetchAndApply(event.request));
})

async function fetchAndApply(request) {

const region = request.headers.get('cf-ipcountry').toUpperCase();
//const ip_address = request.headers.get('cf-connecting-ip');
const user_agent = request.headers.get('user-agent');

let response = null;
let url = new URL(request.url);
let url_host = url.host;

if (url.protocol == 'http:') {
    url.protocol = 'https:'
    response = Response.redirect(url.href);
    return response;
}

//检查是否为图片搜索
var key=url.href;
var ikey1='tbm=isch';
var ikey2='/img';
if ((key.search(ikey1)==-1)&(key.search(ikey2)==-1)){
  var upstream_domain = upstream;
}else{
  var upstream_domain = upstream_v4;
}

url.host = upstream_domain;

if (blocked_region.includes(region)) {
    response = new Response('Access denied: WorkersProxy is not available in your region yet.', {
        status: 403
    });
} else{
    let method = request.method;
    let request_headers = request.headers;
    let new_request_headers = new Headers(request_headers);

    new_request_headers.set('Host', upstream_domain);
    new_request_headers.set('Referer', url.href);

    let original_response = await fetch(url.href, {
        method: method,
        headers: new_request_headers
    })

    let original_response_clone = original_response.clone();
    let original_text = null;
    let response_headers = original_response.headers;
    let new_response_headers = new Headers(response_headers);
    let status = original_response.status;

    new_response_headers.set('cache-control' ,'public, max-age=14400')
    new_response_headers.set('access-control-allow-origin', '*');
    new_response_headers.set('access-control-allow-credentials', true);
    new_response_headers.delete('content-security-policy');
    new_response_headers.delete('content-security-policy-report-only');
    new_response_headers.delete('clear-site-data');

    const content_type = new_response_headers.get('content-type');
    if (content_type.includes('text/html')&& content_type.includes('UTF-8')) {// && content_type.includes('UTF-8')
        original_text = await replace_response_text(original_response_clone, upstream_domain, url_host);
    } else {
        original_text = original_response_clone.body
    }

    response = new Response(original_text, {
        status,
        headers: new_response_headers
    })
}
return response;
}


async function replace_response_text(response, upstream_domain, host_name) {
let text = await response.text()

var i, j;
for (i in replace_dict) {
    j = replace_dict[i]
    if (i == '$upstream') {
        i = upstream_domain
    } else if (i == '$custom_domain') {
        i = host_name
    }
    
    if (j == '$upstream') {
        j = upstream_domain
    } else if (j == '$custom_domain') {
        j = host_name
    }

    let re = new RegExp(i, 'g')
    text = text.replace(re, j);
}

return text;
}
