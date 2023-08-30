# 超文本传输协议HTTP
## 超文本传输协议各个版本
### HTTP 0.9
已过时。只接受GET一种请求方法，没有在通讯中指定版本号，且不支持请求头
### HTTP 1.0
- 开始出现版本号
- 增加了POST方法和HEAD方法
- 出现请求头
- 支持多种数据类型
- 支持缓存
- 状态码 
- 长链接
- 多字符集支持、多部分发送（multi-part type）、权限（authorization）、内容编码（content encoding）等

### HTTP1.1 与 HTTP1.0 的区别
> 内容来自JavaGuide

- **连接方式** : HTTP 1.0 为短连接，HTTP 1.1 支持长连接。
- **状态响应码** : HTTP/1.1中新加入了大量的状态码，光是错误响应状态码就新增了24种。比如说，`100 (Continue)`——在请求大资源前的预热请求，`206 (Partial Content)`——范围请求的标识码，`409 (Conflict)`——请求与当前资源的规定冲突，`410 (Gone)`——资源已被永久转移，而且没有任何已知的转发地址。
- **缓存处理** : 在 HTTP1.0 中主要使用 header 里的 If-Modified-Since,Expires 来做为缓存判断的标准，HTTP1.1 则引入了更多的缓存控制策略例如 Entity tag，If-Unmodified-Since, If-Match, If-None-Match 等更多可供选择的缓存头来控制缓存策略。
- **带宽优化及网络连接的使用** :HTTP1.0 中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，HTTP1.1 则在请求头引入了 range 头域，它允许只请求资源的某个部分，即返回码是 206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。
- **Host头处理** : HTTP/1.1在请求头中加入了`Host`字段。

### HTTP2 与 HTTP1.x 的区别
> 内容来自前端内参

- **二进制分帧**：HTTP1.x以换行符作为纯文本的分隔符，而HTTP2.0将所有传输的信息分割为更小的消息和帧，并对它们采用二进制格式的编码。

- **多路复用**：在HTTP1.x中，如果客户端想发送多个并行的请求以及改进性能，那么必须使用多个TCP连接。HTTP2实现了多向请求和响应：客户端和服务器可以把HTTP消息分解为互不依赖的帧，然后乱序发送，最后再在另一端把它们重新组合起来。

- **请求优先级**：HTTP2把HTTP消息分解为很多独立的帧之后，就可以通过优化这些帧的交错和传输顺序，进一步提升性能。为了做到这一点，每个流都可以带有一个31比特的优先值：0表示最高优先级； (2^31)-1表示最低优先级。

- **每个来源一个连接**：HTTP1.x依赖多个TCP连接去实现多流并行，所有HTTP2.0连接都是持久化的，而且客户端与服务器之间也只需要一个连接即可。

- **流量控制**：HTTP2.0为数据流和连接的流量控制提供了一个简单的机制：

    - 流量控制基于每一跳进行，而非端到端的控制；

    - 流量控制基于窗口更新帧进行，即接收方广播自己准备接收某个数据流的多少字节，以及整个连接要接收多少字节；

    - 流量控制窗口大小通过WINDOW_UPDATE帧更新，这个字段指定了流ID和窗口大小递增值；

    - 流量控制有方向性，即接收放可能根据自己的情况为每个流乃至整个连接设置任意窗口大小；

    - 流量控制可以由接收方禁用，包括针对个别的流和针对整个连接。

- **服务端推送**：服务器可以对一个客户端请求发送多个响应，即服务器还可以额外向客户端推送资源，而无需客户端明确的请求。

- **首部压缩**：在HTTP1.x中首部是以纯文本形式发送的，通常会给每个请求增加 500-800 字节的负担。 HTTP2.0在客户端和服务器端使用“首部表”来跟踪和存储之前发送的键值对，对于相同的数据，不再通过每次请求和响应发送； 首部表在HTTP2.0的连接存续期内始终存在，有客户端和服务器共同更新； 每个新的首部键值对要么被追加到当前表的末尾，要么替换表中之前的值。

### HTTP3
HTTP3协议放弃了TCP，转而使用基于UDP的QUIC(Quick UDP Internet Connections)

### HTTP与HTTPs
- **端口号** ：HTTP 默认是 80，HTTPS 默认是 443。
- **URL 前缀** ：HTTP 的 URL 前缀是 `http://`，HTTPS 的 URL 前缀是 `https://`。
- **安全性和资源消耗** ： HTTP 协议运行在 TCP 之上，所有传输的内容都是明文，客户端和服务器端都无法验证对方的身份。HTTPS 是运行在 SSL/TLS 之上的 HTTP 协议，SSL/TLS 运行在 TCP 之上。所有传输的内容都经过加密，加密采用对称加密，但对称加密的密钥用服务器方的证书进行了非对称加密。所以说，HTTP 安全性没有 HTTPS 高，但是 HTTPS 比 HTTP 耗费更多服务器资源。

关于更多信息请参考加密算法章节

## HTTP状态码

http响应状态码有五类

1. 信息响应 (100–199)
2. 成功响应 (200–299)
3. 重定向消息 (300–399)
4. 客户端错误响应 (400–499)
5. 服务端错误响应 (500–599)

更详细的描述见下表（加粗的为常见状态码）：

| 状态码 | 状态码英文名称                         | 中文描述                                                                                                              |
|-----|---------------------------------|-------------------------------------------------------------------------------------------------------------------|
| 100 | **Continue**                    | 这个临时响应表明，迄今为止的所有内容都是可行的，客户端应该继续请求，如果已经完成，则忽略它。                                                                    |
| 101 | Switching Protocols             | 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议                                                                 |
| 103 | Early HInts                     | 此状态代码主要用于与 Link 链接头一起使用，以允许用户代理在服务器准备响应阶段时开始预加载 preloading 资源。                                                    |
| 200 | **OK**                          | 请求成功。                                                                                                             |
| 201 | Created                         | 已创建。成功请求并创建了新的资源                                                                                                  |
| 202 | Accepted                        | 已接受。已经接受请求，但未处理完成                                                                                                 |
| 203 | Non-Authoritative Information   | 非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本                                                                              |
| 204 | No Content                      | 对于该请求没有的内容可发送，但头部字段可能有用。用户代理可能会用此时请求头部信息来更新原来资源的头部缓存字段。                                                           |
| 205 | Reset Content                   | 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域                                                                 |
| 206 | Partial Content                 | 当从客户端发送Range范围标头以只请求资源的一部分时，将使用此响应代码                                                                              |
| 300 | Multiple Choices                | 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择                                                               |
| 301 | **Moved Permanently**           | 永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替                                             |
| 302 | **Found**                       | 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI                                                                              |
| 303 | See Other                       | 查看其它地址。与301类似。使用GET请求另一个URI获取资源                                                                                   |
| 304 | **Not Modified**                | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源                                  |
| 305 | Use Proxy                       | 使用代理。已经被废弃。                                                                                                       |
| 306 | Unused                          | 已经被废弃的HTTP状态码                                                                                                     |
| 307 | Temporary Redirect              | 临时重定向。与302类似。但用户代理 不能 更改所使用的 HTTP 方法。                                                                             |
| 308 | Permanent Redirect              | 这意味着资源现在永久位于由Location: HTTP Response 标头指定的另一个 URI。这与 301 Moved Permanently HTTP 响应代码具有相同的语义，但用户代理不能更改所使用的 HTTP 方法 |
| 400 | **Bad Request**                 | 客户端请求的语法错误，服务器无法理解                                                                                                |
| 401 | Unauthorized                    | 请求要求用户的身份认证                                                                                                       |
| 402 | Payment Required                | 保留，将来使用                                                                                                           |
| 403 | **Forbidden**                   | 客户端没有访问内容的权限。与 401 Unauthorized 不同，服务器知道客户端的身份。                                                                   |
| 404 | **Not Found**                   | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面                                                           |
| 405 | **Method Not Allowed**          | 客户端请求中的方法被禁止                                                                                                      |
| 406 | Not Acceptable                  | 服务器无法根据客户端请求的内容特性完成请求                                                                                             |
| 407 | Proxy Authentication Required   | 请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权                                                                                 |
| 408 | Request Time-out                | 服务器等待客户端发送的请求时间过长，超时                                                                                              |
| 409 | Conflict                        | 服务器完成客户端的 PUT 请求时可能返回此代码，服务器处理请求时发生了冲突                                                                            |
| 410 | Gone                            | 客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置                                            |
| 411 | Length Required                 | 服务器无法处理客户端发送的不带Content-Length的请求信息                                                                                |
| 412 | Precondition Failed             | 客户端在其头文件中指出了服务器不满足的先决条件                                                                                           |
| 413 | Request Entity Too Large        | 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息                              |
| 414 | Request-URI Too Large           | 请求的URI过长（URI通常为网址），服务器无法处理                                                                                        |
| 415 | Unsupported Media Type          | 无法满足请求中 Range 标头字段指定的范围。该范围可能超出了目标 URI 数据的大小。                                                                     |
| 416 | Requested range not satisfiable | 客户端请求的范围无效                                                                                                        |
| 417 | Expectation Failed              | 服务器无法满足Expect的请求头信息                                                                                               |
| 418 | I'm a teapot                    | 服务端拒绝用茶壶煮咖啡。笑话，典故来源茶壶冲泡咖啡                                                                                         |
| 421 | Misdirected Request             | 请求被定向到无法生成响应的服务器。这可以由未配置为针对请求 URI 中包含的方案和权限组合生成响应的服务器发送。                                                          |
| 426 | Upgrade Required                | 服务器拒绝使用当前协议执行请求，但在客户端升级到其他协议后可能愿意这样做                                                                              |
| 428 | Precondition Required           | 源服务器要求请求是有条件的                                                                                                     |
| 429 | Too Many Requests               | 用户在给定的时间内发送了太多请求                                                                                                  |
| 431 | Request Header Fields Too Large | 服务器不愿意处理请求，因为其头字段太大。在减小请求头字段的大小后，可以重新提交请求。                                                                        |
| 451 | Unavailable For Legal Reasons   | 用户代理请求了无法合法提供的资源，例如政府审查的网页。                                                                                       |
| 500 | **Internal Server Error**       | 服务器内部错误，无法完成请求                                                                                                    |
| 501 | Not Implemented                 | 服务器不支持请求的功能，无法完成请求                                                                                                |
| 502 | **Bad Gateway**                 | 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应                                                                           |
| 503 | Service Unavailable             | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中                                                           |
| 504 | **Gateway Time-out**            | 充当网关或代理的服务器，未及时从远端服务器获取请求                                                                                         |
| 505 | HTTP Version not supported      | 服务器不支持请求的HTTP协议的版本，无法完成处理                                                                                         |
| 506 | Variant Also Negotiates         | 服务器存在内部配置错误                                                                                                       |
| 510 | Not Extended                    | 服务器需要对请求进行进一步扩展才能完成请求                                                                                             |
| 511 | Network Authentication Required | 指示客户端需要进行身份验证才能获得网络访问权限                                                                                           |

## HTTP请求头

HTTP头字段（HTTP header fields）,是指在超文本传输协议（HTTP）的请求和响应消息中的消息头部分

它们定义了一个超文本传输协议事务中的操作参数

HTTP头部字段可以自己根据需要定义，因此可能在 Web 服务器和浏览器上发现非标准的头字段

下面是一个HTTP请求的请求头：

```http request
GET /home.html HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/testpage.html
Connection: keep-alive
Upgrade-Insecure-Requests: 1
If-Modified-Since: Mon, 18 Jul 2016 02:36:04 GMT
If-None-Match: "c561c68d0ba92bbeb8b0fff2a9199f722e3a621a"
Cache-Control: max-age=0
```

### 常用请求头

| 字段名               | 说明                                                                                        | 示例                                                                                      |
|-------------------|-------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Accept            | 能够接受的回应内容类型（Content-Types）                                                                | Accept: text/plain                                                                      |
| Accept-Charset    | 能够接受的字符集                                                                                  | Accept-Charset: utf-8                                                                   |
| Accept-Encoding   | 能够接受的编码方式列表                                                                               | Accept-Encoding: gzip, deflate                                                          |
| Accept-Language   | 能够接受的回应内容的自然语言列表                                                                          | Accept-Language: en-US                                                                  |
| Authorization     | 用于超文本传输协议的认证的认证信息                                                                         | Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==                                       |
| Cache-Control     | 用来指定在这次的请求/响应链中的所有缓存机制 都必须 遵守的指令                                                          | Cache-Control: no-cache                                                                 |
| Connection        | 该浏览器想要优先使用的连接类型                                                                           | Connection: keep-alive Connection: Upgrade                                              |
| Cookie            | 服务器通过 Set- Cookie （下文详述）发送的一个 超文本传输协议Cookie                                               | Cookie: $Version=1; Skin=new;                                                           |
| Content-Length    | 以 八位字节数组 （8位的字节）表示的请求体的长度                                                                 | Content-Length: 348                                                                     |
| Content-Type      | 请求体的 多媒体类型                                                                                | Content-Type: application/x-www-form-urlencoded                                         |
| Date              | 发送该消息的日期和时间                                                                               | Date: Tue, 15 Nov 1994 08:12:31 GMT                                                     |
| Expect            | 表明客户端要求服务器做出特定的行为                                                                         | Expect: 100-continue                                                                    |
| Host              | 服务器的域名(用于虚拟主机 )，以及服务器所监听的传输控制协议端口号                                                        | Host: en.wikipedia.org:80 Host: en.wikipedia.org                                        |
| If-Match          | 仅当客户端提供的实体与服务器上对应的实体相匹配时，才进行对应的操作。主要作用时，用作像 PUT 这样的方法中，仅当从用户上次更新某个资源以来，该资源未被修改的情况下，才更新该资源 | If-Match: "737060cd8c284d8af7ad3082f209582d"                                            |
| If-Modified-Since | 允许在对应的内容未被修改的情况下返回304未修改                                                                  | If-Modified-Since: Sat, 29 Oct 1994 19:43:31 GMT                                        |
| If-None-Match     | 允许在对应的内容未被修改的情况下返回304未修改                                                                  | If-None-Match: "737060cd8c284d8af7ad3082f209582d"                                       |
| If-Range          | 如果该实体未被修改过，则向我发送我所缺少的那一个或多个部分；否则，发送整个新的实体                                                 | If-Range: "737060cd8c284d8af7ad3082f209582d"                                            |
| Range             | 仅请求某个实体的一部分                                                                               | Range: bytes=500-999                                                                    |
| User-Agent        | 浏览器的浏览器身份标识字符串                                                                            | User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/21.0        |
| Origin            | 发起一个针对 跨来源资源共享 的请求                                                                        | Origin: [http://www.example-social-network.com](http://www.example-social-network.com/) |

## 应用层其他协议

### SMTP

**简单邮件传输(发送)协议（SMTP，Simple Mail Transfer Protocol）** 基于 TCP 协议，用来发送电子邮件。

**发送过程**

1. 发送者将邮件发送到对应的服务器
2. 若接收者与发送者不在同一个服务器，服务器将邮件转发到接收者所在的服务器
3. 接收者所在的服务器通知接收者接收邮件


**判断邮箱存在**

1. 查找邮箱域名对应的 SMTP 服务器地址
2. 尝试与服务器建立连接
3. 连接成功后尝试向需要验证的邮箱发送邮件
4. 根据返回结果判定邮箱地址的真实性


### POP3/IMAP
> 内容来自JavaGuide

**POP3 和 IMAP 两者都是负责邮件接收的协议**

**SMTP 协议只负责邮件的发送，真正负责接收的协议是POP3/IMAP。**

IMAP 协议相比于POP3更新一点，为用户提供的可选功能也更多一点,几乎所有现代电子邮件客户端和服务器都支持IMAP。大部分网络邮件服务提供商都支持POP3和IMAP。

### FTP

**FTP 协议** 主要提供文件传输服务，基于 TCP 实现可靠的传输。使用 FTP 传输文件的好处是可以屏蔽操作系统和文件存储方式。

FTP 是基于客户—服务器（C/S）模型而设计的，在客户端与 FTP 服务器之间建立两个连接。如果我们要基于 FTP 协议开发一个文件传输的软件的话，首先需要搞清楚 FTP 的原理。关于 FTP 的原理，很多书籍上已经描述的非常详细了：

> FTP 的独特的优势同时也是与其它客户服务器程序最大的不同点就在于它在两台通信的主机之间使用了两条 TCP 连接（其它客户服务器应用程序一般只有一条 TCP 连接）：
>
> 1. 控制连接：用于传送控制信息（命令和响应）
> 2. 数据连接：用于数据传送；
>
> 这种将命令和数据分开传送的思想大大提高了 FTP 的效率。

### Telnet

**Telnet 协议** 通过一个终端登陆到其他服务器，建立在可靠的传输协议 TCP 之上。Telnet 协议的最大缺点之一是所有数据（包括用户名和密码）均以明文形式发送，这有潜在的安全风险。这就是为什么如今很少使用Telnet并被一种称为SSH的非常安全的协议所取代的主要原因。

### SSH

**SSH（ Secure Shell）** 是目前较可靠，专为远程登录会话和其他网络服务提供安全性的协议。利用 SSH 协议可以有效防止远程管理过程中的信息泄露问题。SSH 建立在可靠的传输协议 TCP 之上。