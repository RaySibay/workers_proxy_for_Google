# workers_proxy_for_Google
- Due to Google had ban the ipv4 address of cloudflare, so i use ipv6.google.com as back-to-source hostname for google search, but ipv6.google.com doesn't support image search, so when using image search, it will jump back to www.google.com automatically.
- 由于谷歌搜索屏蔽了 cloudflare 回源的ipv4地址，因此在这里我使用ipv6.google.com作为回源主机名，但是ipv6.google.com不支持图片搜索，又做了一些额外的修改以在使用图片搜索的时候跳转回www.google.com。

#### Additional for mainland chinese users/适用于中国大陆用户：
- 由于中国大陆屏蔽了workers.dev域名，如需使用，请参考这篇文章绑定自己的域名:    
- https://cloud.tencent.com/developer/article/1948298

#### How to use/使用方法：
- Read this article/可以参考这篇文章： https://xuwuyibing.github.io/googlemirror/

#### 2023更新：cloudflare现在已被国内运营商严重限速，有可能导致在谷歌镜像的搜索首页无法搜索，可以将其设置为默认搜索引擎，在地址栏搜索，方法以edge为例：
1. 打开浏览器设置
2. 搜索“搜索引擎”
3. 点击 地址栏与搜索-管理搜索引擎-添加
4. 搜索引擎名字和快捷方式随便填，最后一栏填入
https://[你绑定的域名]/search?q=%s
5. 将其改为默认设置，即可在浏览器地址栏搜索

#### 2024 Update: 
时过境迁，谷歌翻译也终于没了中国版。本来想着谷歌翻译api的镜像非常好做，没想到github似乎没有相关的代码库，就顺便新增了google_translate_api.js，和部署谷歌镜像类似，复制粘贴，并绑定自己的域名即可。
翻译API镜像，个人推荐结合翻译插件食用：
划词翻译：https://hcfy.app/blog/2022/09/28/ggg#%E6%96%B9%E6%A1%88-c%E4%BD%BF%E7%94%A8%E9%95%9C%E5%83%8F%E5%9C%B0%E5%9D%80%E6%9C%80%E7%AE%80%E5%8D%95
沉浸式翻译：https://github.com/immersive-translate/immersive-translate/issues/307
CopyTranslate:https://copytranslator.github.io/guide/questions.html

参考：
1. https://github.com/klightso/Workers-Proxy-1
2. https://github.com/xiaoyang-sde/reflare
