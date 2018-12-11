import template from './template';

const CUSTOM_TYPE = 'custom';
const ALET_TYPE = 'alert';
const CONFIRM_TYPE = 'confirm';
const data_property = 'data-modal';
const noop = function () {
};

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
        console.warn('undefined mode,use custom for default')
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
    this._html.innerHTML = template(options.template, {
        text: options.text,
        mode: options.mode
    });
    this.success = options.success && typeof options.success === 'function' ? options.success : noop;
    this.close = options.close && typeof options.close === 'function' ? options.close : noop;
    this.$element.onclick = () => {
        this.$element.append(this._html);
        this.trigger(true)
    };
    this.on('click', `[${this.actionProperty}="close"]`, this.proxy(this.hide, this));
    this.on('click', `[${this.actionProperty}="show"]`, this.proxy(this.show, this));
    if (this.mode === CONFIRM_TYPE) {
        this.on('click', `[${this.actionProperty}="sure"]`, this.proxy(this.success, this));
    }
}

Modal.prototype.on = function (action, modal, fn) {
    let isCached = this.cached.filter((item) => {
        return item.modal === modal
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

Modal.prototype.show = function (e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation()
    }
    this.trigger(true);
};

Modal.prototype.hide = function (e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation()
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
            this.close.apply(this)
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


export default Modal;
