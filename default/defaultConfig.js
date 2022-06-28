const {adjectives, animals,colors,countries,NumberDictionary,names,languages,starWars} = require("unique-names-generator");
module.exports = {
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