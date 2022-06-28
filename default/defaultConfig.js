const {adjectives, animals,colors,countries,NumberDictionary,names,languages,starWars} = require("unique-names-generator");
module.exports = {
    info:{
        webName:'Matchdrop',
        webURL:'http://localhost:8080',
        author:'Match',
        beian:'false'
    },
    port:{
        // frontend选项配置整个web服务对外的端口号
        frontend:8080,
        // backend选项配置后端服务的运行接口，如果启动服务时未提示端口被占用，一般无需更改
        backend:3000
    },
    network:{
        // set the polling speed
        pollingSpeed:3000
    },
    uniqueName:{
        length: 1,
        separator: ' ',
        dictionaries: [names],
        style: 'capital'
    },
    theme:{
        primaryColor:'rgb(255, 235, 167)',
        enableSwitch:'true',
        defaultTheme:'auto',
        uiShadow:'true',
        topBar:'white',
        icon_size:'24px',
        channelUi_width:'120px'
    }
}