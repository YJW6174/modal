/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modal_js__ = __webpack_require__(1);


let template = document.getElementById('modal-template').innerHTML;
let tag1 = document.getElementById('id1');
let tag2 = document.getElementById('id2');
let tag3 = document.getElementById('id3');

let modal1 = new __WEBPACK_IMPORTED_MODULE_0__modal_js__["a" /* default */](tag1, {
    mode: '',
    text: '啦啦啦,德玛西亚!tag1',
    template: template,
    close: function () {
        console.log('close tag1');
    }
});

let modal2 = new __WEBPACK_IMPORTED_MODULE_0__modal_js__["a" /* default */](tag2, {
    mode: 'alert',
    text: '兽人永不为奴!tag2',
    template: template,
    success: function () {
        console.log('兽人永不为奴');
    },
    close: function () {
        console.log('close tag2');
    }
});

let modal3 = new __WEBPACK_IMPORTED_MODULE_0__modal_js__["a" /* default */](tag3, {
    mode: 'confirm',
    text: '德玛西亚!tag3',
    template: template,
    success: function () {
        console.log('德玛西亚');
    },
    close: function () {
        console.log('close tag3');
    }
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__template__);


const CUSTOM_TYPE = 'custom';
const ALET_TYPE = 'alert';
const CONFIRM_TYPE = 'confirm';
const data_property = 'data-modal';
const noop = function () {};

/**
 * options: Object
 * {
 * mode: custom,alert,confirm
 * text: 'default' content
 * success: success_callback
 * close: close_callback
 * template: innerHtml template
 * data_property: custom property
 * }
 * @param options
 * @constructor
 */
/**
 *
 * @param element
 * @param options
 * @constructor
 */

function Modal(element, options) {
    if (!options.mode || !~[CUSTOM_TYPE, ALET_TYPE, CONFIRM_TYPE].indexOf(options.mode)) {
        console.warn('undefined mode,use custom for default');
    }
    if (!options.template) {
        console.error('template is required');
        return;
    }
    this.cached = [];
    this.mode = options.mode;
    this.actionProperty = options.peoperty || data_property;
    this.$element = element instanceof HTMLElement ? element : document.querySelector(element);
    this._html = document.createElement('div');
    this._html.innerHTML = __WEBPACK_IMPORTED_MODULE_0__template___default()(options.template, {
        text: options.text,
        mode: options.mode
    });
    this.success = options.success && typeof options.success === 'function' ? options.success : noop;
    this.close = options.close && typeof options.close === 'function' ? options.close : noop;
    this.$element.onclick = () => {
        this.$element.append(this._html);
        this.trigger(true);
    };

    this.on = function (action, modal, fn) {
        let isCached = this.cached.filter(item => {
            return item.modal === modal;
        });
        if (isCached && isCached.length) {
            return;
        }
        this.cached.push({
            modal: modal,
            action: action,
            fn: fn
        });
    };
    this.on('click', `[${this.actionProperty}="close"]`, this.proxy(this.hide, this));
    this.on('click', `[${this.actionProperty}="show"]`, this.proxy(this.show, this));
    if (this.mode === CONFIRM_TYPE) {
        this.on('click', `[${this.actionProperty}="sure"]`, this.proxy(this.success, this));
    }
}

Modal.prototype.show = function (e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    this.trigger(true);
};

Modal.prototype.hide = function (e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    this.trigger(false);
};

Modal.prototype.proxy = function (fn, self) {
    if (fn) {
        return fn.bind(self);
    }
};

Modal.prototype.trigger = function (display) {
    if (!display) {
        // if close modal;
        if (this.close) {
            this.close.apply(this);
        }
    }
    this.$element.querySelector('.modal-layer').style.display = display ? 'flex' : 'none';
    this.cached.map(function (item) {
        let selector = document.querySelector(item.modal);
        if (selector) {
            selector.addEventListener(item.action, item.fn);
        }
    });
    this.cached = [];
};

/* harmony default export */ __webpack_exports__["a"] = (Modal);

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * template.js v0.7.1 (https://github.com/yanhaijing/template.js)
 * API https://github.com/yanhaijing/template.js/blob/master/doc/api.md
 * Copyright 2015 yanhaijing. All Rights Reserved
 * Licensed under MIT (https://github.com/yanhaijing/template.js/blob/master/MIT-LICENSE.txt)
 */
;(function (root, factory) {
    var template = factory(root);
    if (true) {
        // AMD
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return template;
        }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        // Node.js
        module.exports = template;
    } else {
        // Browser globals
        var _template = root.template;

        template.noConflict = function () {
            if (root.template === template) {
                root.template = _template;
            }

            return template;
        };
        root.template = template;
    }
})(this, function (root) {
    'use strict';

    var o = {
        sTag: '<%', //开始标签
        eTag: '%>', //结束标签
        compress: false, //是否压缩html
        escape: true, //默认输出是否进行HTML转义
        error: function (e) {} //错误回调
    };
    var functionMap = {}; //内部函数对象
    //修饰器前缀
    var modifierMap = {
        '': function (param) {
            return nothing(param);
        },
        'h': function (param) {
            return encodeHTML(param);
        },
        'u': function (param) {
            return encodeURI(param);
        }
    };

    var toString = {}.toString;
    var slice = [].slice;
    function type(x) {
        if (x === null) {
            return 'null';
        }

        var t = typeof x;

        if (t !== 'object') {
            return t;
        }

        var c = toString.call(x).slice(8, -1).toLowerCase();
        if (c !== 'object') {
            return c;
        }

        if (x.constructor == Object) {
            return c;
        }

        return 'unknown';
    }

    function isObject(obj) {
        return type(obj) === 'object';
    }
    function isFunction(fn) {
        return type(fn) === 'function';
    }
    function isString(str) {
        return type(str) === 'string';
    }
    function extend() {
        var target = arguments[0] || {};
        var arrs = slice.call(arguments, 1);
        var len = arrs.length;

        for (var i = 0; i < len; i++) {
            var arr = arrs[i];
            for (var name in arr) {
                target[name] = arr[name];
            }
        }
        return target;
    }
    function clone() {
        var args = slice.call(arguments);
        return extend.apply(null, [{}].concat(args));
    }
    function nothing(param) {
        return param;
    }
    function encodeHTML(source) {
        return String(source).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\\/g, '&#92;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
    function compress(html) {
        return html.replace(/\s+/g, ' ').replace(/<!--[\w\W]*?-->/g, '');
    }
    function consoleAdapter(cmd, msg) {
        typeof console !== 'undefined' && console[cmd] && console[cmd](msg);
    }
    function handelError(e) {
        var message = 'template.js error\n\n';

        for (var key in e) {
            message += '<' + key + '>\n' + e[key] + '\n\n';
        }
        message += '<message>\n' + e.message + '\n\n';
        consoleAdapter('error', message);

        o.error(e);
        function error() {
            return 'template.js error';
        }
        error.toString = function () {
            return '__code__ = "template.js error"';
        };
        return error;
    }
    function parse(tpl, opt) {
        var code = '';
        var sTag = opt.sTag;
        var eTag = opt.eTag;
        var escape = opt.escape;
        function parsehtml(line) {
            // 单双引号转义，换行符替换为空格
            line = line.replace(/('|")/g, '\\$1').replace(/\n/g, ' ');
            return ';__code__ += ("' + line + '")\n';
        }
        function parsejs(line) {
            //var reg = /^(:?)(.*?)=(.*)$/;
            var reg = /^(?:=|(:.*?)=)(.*)$/;
            var html;
            var arr;
            var modifier;

            // = := :*=
            // :h=123 [':h=123', 'h', '123']
            if (arr = reg.exec(line)) {
                html = arr[2]; // 输出
                if (Boolean(arr[1])) {
                    // :开头
                    modifier = arr[1].slice(1);
                } else {
                    // = 开头
                    modifier = escape ? 'h' : '';
                }

                return ';__code__ += __modifierMap__["' + modifier + '"](typeof (' + html + ') !== "undefined" ? (' + html + ') : "")\n';
            }

            //原生js
            return ';' + line + '\n';
        }

        var tokens = tpl.split(sTag);

        for (var i = 0, len = tokens.length; i < len; i++) {
            var token = tokens[i].split(eTag);

            if (token.length === 1) {
                code += parsehtml(token[0]);
            } else {
                code += parsejs(token[0], true);
                if (token[1]) {
                    code += parsehtml(token[1]);
                }
            }
        }

        return code;
    }
    function compiler(tpl, opt) {
        var mainCode = parse(tpl, opt);

        var headerCode = '\n' + '    var html = (function (__data__, __modifierMap__) {\n' + '        var __str__ = "", __code__ = "";\n' + '        for(var key in __data__) {\n' + '            __str__+=("var " + key + "=__data__[\'" + key + "\'];");\n' + '        }\n' + '        eval(__str__);\n\n';

        var footerCode = '\n' + '        ;return __code__;\n' + '    }(__data__, __modifierMap__));\n' + '    return html;\n';

        var code = headerCode + mainCode + footerCode;
        code = code.replace(/[\r]/g, ' '); // ie 7 8 会报错，不知道为什么
        try {
            var Render = new Function('__data__', '__modifierMap__', code);
            Render.toString = function () {
                return mainCode;
            };
            return Render;
        } catch (e) {
            e.temp = 'function anonymous(__data__, __modifierMap__) {' + code + '}';
            throw e;
        }
    }
    function compile(tpl, opt) {
        opt = clone(o, opt);

        try {
            var Render = compiler(tpl, opt);
        } catch (e) {
            e.name = 'CompileError';
            e.tpl = tpl;
            e.render = e.temp;
            delete e.temp;
            return handelError(e);
        }

        function render(data) {
            data = clone(functionMap, data);
            try {
                var html = Render(data, modifierMap);
                html = opt.compress ? compress(html) : html;
                return html;
            } catch (e) {
                e.name = 'RenderError';
                e.tpl = tpl;
                e.render = Render.toString();
                return handelError(e)();
            }
        }

        render.toString = function () {
            return Render.toString();
        };
        return render;
    }
    function template(tpl, data) {
        if (typeof tpl !== 'string') {
            return '';
        }

        var fn = compile(tpl);
        if (!isObject(data)) {
            return fn;
        }

        return fn(data);
    }

    template.config = function (option) {
        if (isObject(option)) {
            o = extend(o, option);
        }
        return clone(o);
    };

    template.registerFunction = function (name, fn) {
        if (!isString(name)) {
            return clone(functionMap);
        }
        if (!isFunction(fn)) {
            return functionMap[name];
        }

        return functionMap[name] = fn;
    };
    template.unregisterFunction = function (name) {
        if (!isString(name)) {
            return false;
        }
        delete functionMap[name];
        return true;
    };

    template.registerModifier = function (name, fn) {
        if (!isString(name)) {
            return clone(modifierMap);
        }
        if (!isFunction(fn)) {
            return modifierMap[name];
        }

        return modifierMap[name] = fn;
    };
    template.unregisterModifier = function (name) {
        if (!isString(name)) {
            return false;
        }
        delete modifierMap[name];
        return true;
    };

    template.__encodeHTML = encodeHTML;
    template.__compress = compress;
    template.__handelError = handelError;
    template.__compile = compile;
    template.version = '0.7.1';
    return template;
});

/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map