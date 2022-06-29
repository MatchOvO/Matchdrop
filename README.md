# Matchdrop 

* Author:MatchOvO

[Machdrop](https://matchdrop.chenzs.com): local file sharing in your browser. Inspired by Apple's Airdrop.Base on [Snapdrop](https://github.com/RobinLinus/snapdrop)


#### Matchdrop is built with the following technologies:
* base on [Snapdrop](https://github.com/RobinLinus/snapdrop)
* Vanilla HTML5 / ES6 / CSS3 frontend
* [WebRTC](http://webrtc.org/) / [WebSockets](http://www.websocket.org/)
* [NodeJS](https://nodejs.org/en/) backend
* [Progressive Web App](https://wikipedia.org/wiki/Progressive_Web_App)

[Machdrop](https://matchdrop.chenzs.com)是基于另一个开源项目[Snapdrop](https://github.com/RobinLinus/snapdrop)而开发出来的。由于Snapdrop现在开源的项目并不能很好的运行于Linux服务器上，且在原项目中有许多bug和不好的体验。
于是决定在Snapdrop的基础上进行项目的重构，在解读了Snapdrop所有的源码后，开始了Matchdrop的构建。原项目使用[Docker](https://www.docker.com)容器的方式，通过镜像nginx反向代理挂载服务，不仅要配置Docker和Docker-compose等，修改原项目Docker中的配置也比较麻烦。且因为未知原因，在Linux系统的服务器上，Docker容器的node服务无法正常运行，需要手动启动后端脚本，再手动配置自己的nginx反向代理给后端服务。
再加上原项目在服务器线上运行后有许多的bug，导致了即使Snapdrop的功能非常强大也非常的创新，但是部署和使用体验并不是很好。

Matchdrop完全放弃了Snapdrop原项目的服务框架，使用[Express](https://www.expressjs.com.cn)重构了整个项目的服务框架和逻辑，并且相较于原项目，修复了bug和优化了体验。全程仅需几行简单的命令即可部署web服务，特别是是在已安装好Node的环境下。更改web服务的配置仅需更改[config.js](./config.js)中一个文件即可轻松更改大量项目的设置，如项目的名称，服务端口号，轮询周期，主题色，生成随机名字的逻辑等，无需通读所有的源码去修改各种配置。
并将在未来开放更多的功能，融入远程文件传输等。

## Easy set up
* 1.确保安装了Node(V12或以上版本)和npm包管理工具
```
    //如果没有安装Node和npm，Linus可以通过yum等包管理工具快速安装,如下:
    yum install node.js
    
    //Win和Mac到（https://nodejs.org/en/）Node.Js官网下载安装包安装，安装了Node即安装了npm。
```
* 2.克隆GitHub仓库,在cmd工具或终端输入以下命令（需安装git工具，Mac自带git工具）
```
    git clone https://github.com/MatchOvO/Matchdrop
    //也可以直接在GitHub页面下载压缩包解压
    
    //进入项目文件夹
    cd Matchdrop/
```
* 3.安装
```
    npm install
```
* 4.启动服务
```
    //开发模式-开启 （能够输出调试代码）
    npm start   //"control+c"或"ctrl+c"退出
    
    //生产模式-开启服务（后台运行）====>推荐
    npm run on
    
    //生产模式-关闭服务
    npm run off
    
    //生产模式-重启服务
    npm run restart
    
```
* 5.本地浏览器地址栏输入 localhost:8080 即可访问部署好的web应用
* 6.打开config.js文件即可轻松修改大量前端和后端配置。
日后更新详细的option文档以帮助配置
```js
    module.exports={
        info:{
            // 你的web应用名称---（必需）
            // your web application name---(needed)
            webName:'Matchdrop',
    
            // your web url for serve
            webURL:'http://localhost:8080',

            // author's name
            author:'Match',

            // display footer 备案
            beian:'false'
        },
        port:{
            // frontend选项配置整个web服务对外的端口号---（必需）
            // frontend option set the whole web application's port---(needed)
            frontend:8080,
    
            // backend选项配置后端服务的运行接口，如果启动服务时未提示端口被占用，一般无需更改---（必需）
            // backend option set the backend script's running port(needed)
            backend:3000
        },
        network:{
            // set the polling speed
            pollingSpeed:3000
        },
        // set the format of every devices' unique name
        uniqueName:{
            // uniqueName's length---(needed)
            length: 1,
    
            // which sign to separate the words
            separator: ' ',

            // the dictionaries of name---(needed)
            dictionaries: [names],

            style: 'capital'
        },
        theme:{
            // 设置主题色 ---（必需）
            // set your primary color  ---(needed)
            primaryColor:'rgb(255, 235, 167)',
    
            // enable allow user to change theme
            enableSwitch:'true',

            // set the default them of your web application  --(needed)
            defaultTheme:'auto',

            // set if UI shadow is needed
            uiShadow:'true',

            // set the color of safari's address bar
            topBar:'white',

            // set the icons' size  ---(needed)
            icon_size:'24px',

            // set the width of channels' UI ----(needed)
            channelUi_width:'120px'
        }
    }
    
```

如果不小心损坏或丢失了config.js文件，或者项目出现问题，可以通过[default/](./default)文件夹中的[defaultConfig,js](./default/defaultConfig.js)来获取默认配置，以重设配置。

* 7.将frontend端口号设置为80，即可对外提供http链接的web服务（服务器安全组策略需要开启80端口）
* 8.如果你有nginx等web服务相关知识，建议使用nginx等web服务反向代理给本地的端口号，利用nginx等功能优化服务器性能。
* 9.如果使用反向代理，请务必要设置X-Fowarded-for的请求头字段和允许建立长连接配置，nginx参考配置如下：
```
       server {
            listen   80;
            # 可通过二级域名将不同url请求分配给多个应用
            server_name  matchdrop.chenzs.com;
            
            # Load configuration files for the default server block.
            include /etc/nginx/default.d/*.conf;
    
            location / {
                proxy_pass http://127.0.0.1:8080;
                proxy_http_version 1.1;
                proxy_set_header Connection "upgrade";
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header X-Forwarded-for $remote_addr;
            }
        }
```


## Support the Snapdrop Community
Snapdrop为免费开源项目，如果有能力赞助支持原作者，可通过以下方式支持：

[<img src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif">](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=FTP9DXUR7LA7Q&source=url)

or Bitcoin:

[<img src="https://coins.github.io/thx/logo-color-large-pill-320px.png" alt="CoinThx" width="200"/>](https://coins.github.io/thx/#1K9zQ8f4iTyhKyHWmiDKt21cYX2QSDckWB?label=Snapdrop&message=Thanks!%20Your%20contribution%20helps%20to%20keep%20Snapdrop%20free%20for%20everybody!) 


感谢你对于开源项目的支持！


 
