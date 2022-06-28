(function _styleHandler() {
    /**
     * Import config
     */
    const _location = window.location.href.replace(/#\w*/,'');

    async function _handler(){
        try{
            const configStr = await axios('GET',_location + 'cache/config.json') + '';
            const configObj = JSON.parse(configStr);
            console.log(configObj);
            // import config to window
            window.configObj = configObj;
            // call handlers
            _webNameHandler(configObj.info.webName);
            _rootStyleHandler(configObj);
            _beianHandler(configObj);
            _topBarHandler(configObj.theme.topBar);
            _uiShadowHandler(configObj.theme.uiShadow);
        }catch (err){
            console.log(err);
        }
    }
    _handler().then(r => console.log('config import'));

    function $$(Tag) {
        return document.getElementsByTagName(Tag)[0];
    }

    function $(selector) {
        return document.querySelector(selector);
    }

    function axios(method,url) {
        return new Promise((resolve,reject) => {
            const x = new XMLHttpRequest();
            x.open(method, url);
            x.send();
            x.onreadystatechange = function () {
                if (x.readyState === 4) {
                    if (x.status >= 200 && x.status < 300) {
                        //成功啦
                        resolve(x.response);
                    }else{
                        //如果失败
                        reject(x.status);
                    }
                }
            }
        })
    }

    function _webNameHandler(webName) {
        $$('title').innerHTML = webName;
        $('#about h1').innerHTML = webName;

    }

    function _beianHandler(configObj) {
        if (configObj.info.beian === 'false')
            $('#about .footer').style.display = 'none';
    }

    function _rootStyleHandler(configObj) {
        document.documentElement.style.setProperty('--primary-color',configObj.theme.primaryColor);
        document.documentElement.style.setProperty('--icon-size',configObj.theme.icon_size);
        document.documentElement.style.setProperty('--peer-width',configObj.theme.channelUi_width);
    }
    
    function _topBarHandler(topBar) {
        $('head #meta_themeColor').content = topBar;
    }

    function _uiShadowHandler(uiShadow) {
        if (uiShadow === 'true'){
            $('x-no-peers h2').style = 'text-shadow: 0 0 15px rgb(88, 88, 88);background-color: rgba(0, 0, 0, .1);';
            $('footer font-body2').style = 'background-color: rgba(0, 0, 0, .2);text-shadow: 0 0 15px rgb(88, 88, 88);';
        }
    }
})();
