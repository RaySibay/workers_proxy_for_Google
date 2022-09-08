# workers_proxy_for_Google
Due to Google had ban the ipv4 address of cloudflare, so i use ipv6.google.com as back-to-source hostname for google search, but ipv6.google.com doesn't support image search, so when using image search, it will jump back to www.google.com automatically.
    由于谷歌搜索屏蔽了 cloudflare 回源的ipv4地址，因此在这里我使用ipv6.google.com作为回源主机名，但是ipv6.google.com不支持图片搜索，又做了一些额外的修改以在使用图片搜索的时候跳转回www.google.com。

    Additional for mainland chinese users：
    适用于中国大陆用户：
    由于中国大陆屏蔽了workers.dev域名，如需使用，请参考这篇文章绑定自己的域名:
    https://cloud.tencent.com/developer/article/1948298

参考：
1. https://github.com/klightso/Workers-Proxy-1
2. https://github.com/xiaoyang-sde/reflare
