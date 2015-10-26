/************************************************ 
Message Box
Copyright (c) 2014-2015 Dongxu Ren  http://www.rendxx.com/

License: MIT (http://www.opensource.org/licenses/mit-license.php)
Version: 0.0.1
Update: 2015-10-26

Description:
    Create a light-weight message-box to show message on screen.
    
Compatibility:
    Chrome; Fire Fox; Safari; Edge; IE 9-11; IE 7,8;


API:

************************************************/

(function () {
    var MsgBox = function () {
        var that = this;
        var _onHide = null;
        var _isShown = false;       // whether the info box is shown or not
        var idx = 0;

        // extend object
        var _extend = function (obj1, obj2) {
            if (obj1 == null || obj2 == null || typeof obj1 != "object" || typeof obj2 != "object") return obj1;
            var obj = {};
            for (var i in obj1) obj[i] = obj1[i];
            for (var i in obj2) obj[i] = obj2[i];
            return obj;
        };

        // create style string
        var _createStyle = function (css, cssName) {
            var style = document.createElement('style');
            style.type = 'text/css';

            var text = "." + cssName + "{";
            for (var i in css) text += i + ':' + css[i] + ';';
            text += "}";


            if (style.styleSheet) style.styleSheet.cssText = text;  // ie 7-8
            else style.innerHTML = text;                            // Others
            document.getElementsByTagName('head')[0].appendChild(style);

            return style;
        };

        // create Dom element
        var _createDom = function (content, cssClass, parent) {
            var ele = document.createElement('div');
            ele.className = cssClass;
            ele.innerHTML = content;
            parent.appendChild(ele);

            return ele;
        };

        // -------------------------------------------------------------------------------------------------------------

        // Show information-box
        var show = function (content, cssWrap, cssClose, onHide) {
            var container = document.body;
            var wrapClassName = _cssName.wrap + idx;
            var closeClassName = _cssName.close + idx;
            idx = (idx + 1) % 1000;

            var style1 = _createStyle(_extend(_cssObj.wrap, cssWrap), wrapClassName);
            var style2 = _createStyle(_extend(_cssObj.close, cssClose), closeClassName);

            var wrap = _createDom(content, wrapClassName, container);
            var closeBtn = _createDom('&times;', closeClassName, wrap);

            var _hide = function () {
                container.removeChild(wrap);
                document.getElementsByTagName('head')[0].removeChild(style1);
                document.getElementsByTagName('head')[0].removeChild(style2);
                if (onHide != null) onHide();
            };

            if (closeBtn.addEventListener) {
                closeBtn.addEventListener('click', _hide, false);
            } else if (closeBtn.attachEvent) {
                closeBtn.attachEvent('onclick', _hide);
            }

            return wrap;
        };

        // Setup global function
        var functionSetup = function () {
            // Basic function

            window.$$ = window.$$ || {};
            window.$$.msg = show;
        };

        // Initialize the whole function
        var init = function () {
            functionSetup();
        };
        init();

        var _cssObj = {
            'wrap': {
                'font-size': '14px',
                'font-color': '#fff',
                'position': 'absolute',
                'top': '0px',
                'left': '0px',
                'background-color': '#333',
                'color': '#fff',
                'display': 'block',
                'width': '200px',
                'height': 'auto',
                'padding': '10px',
                'margin': '0px',
                'border': '0px',
                'line-height': '20px',
                'z-index': '999',
                'text-align': 'center'
            },
            'close': {
                'color': '#fff',
                'font-size': '14px',
                'font-family': 'Arial',
                'position': 'absolute',
                'top': '5px',
                'right': '5px',
                'display': 'block',
                'width': '20px',
                'height': '20px',
                'line-height': '20px',
                'cursor': 'pointer'
            }
        };

        var _cssName = {
            'wrap': 'msgbox_wrap_',
            'close': 'msgbox_close_'
        };
    };

    MsgBox();
})();
//# sourceMappingURL=MsgBox.js.map
