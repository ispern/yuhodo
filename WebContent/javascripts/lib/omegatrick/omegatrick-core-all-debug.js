/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ OmegaTrick

Trick = {};

(function(){

    // バージョン情報
    var trick = {
        version : '0.5.0',
        versionDetail : {
            major : 0,
            minor : 5,
            patch : 0
        }
    };

    // OmegaTrick適用フラグ
    var isOmegaTrick = true;

    // SenchaTouch有効フラグ
    var isSenchaTouch = Ext.TouchEventManager ? true : false;

    // Ext Core有効フラグ
    var isExtCore = (!isSenchaTouch && !Ext.ComponentMgr) ? true : false;

    // Ext JS有効フラグ
    var isExtJS = (!isSenchaTouch && !isExtCore) ? true : false;

    // Extオブジェクトに適用
    Ext.apply(Ext, {
        isOmegaTrick : isOmegaTrick,
        trick: trick
    });
    Ext.applyIf(Ext, {
        isSenchaTouch : isSenchaTouch,
        isExtCore : isExtCore,
        isExtJS : isExtJS
    });

    // グローバルオブジェクトへリンク
    Trick = Ext.trick;

    Ext.applyIf(Trick, {
        isSenchaTouch : isSenchaTouch,
        isExtCore : isExtCore,
        isExtJS : isExtJS
    });

})();

Ext.apply(Trick, {

    // {{{ テスティングフレームワーク設定

    testingFramework : {
        name: 'yui'
    },

    // }}}
    // {{{ removeScriptTags

    /**
     * スクリプトタグ削除メソッド
     */
    removeScriptTags : function() {

        var me = this;

        // スクリプトタグ削除
        Ext.select('body script').each(function(el) {
            Ext.removeNode(Ext.getDom(el));
        }, me);

    }

    // }}}

});

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Ext.emptyFn

// for Ext Core
if(Ext.isExtCore && !Ext.emptyFn) {
    Ext.emptyFn = function(){};
}

// }}}
// {{{ Ext.Loader

if(!Ext.Loader) {

    Ext.Loader = Ext.apply({}, {

        load: function(fileList, callback, scope, preserveOrder) {
            var scope       = scope || this,
            head        = document.getElementsByTagName("head")[0],
            fragment    = document.createDocumentFragment(),
            numFiles    = fileList.length,
            loadedFiles = 0,
            me          = this;

            var loadFileIndex = function(index) {
                head.appendChild(
                    me.buildScriptTag(fileList[index], onFileLoaded)
                );
            };

            var onFileLoaded = function() {
                loadedFiles ++;

                if (numFiles == loadedFiles && typeof callback == 'function') {
                    callback.call(scope);
                } else {
                    if (preserveOrder === true) {
                        loadFileIndex(loadedFiles);
                    }
                }
            };

            if (preserveOrder === true) {
                loadFileIndex.call(this, 0);
            } else {
                Ext.each(fileList, function(file, index) {
                    fragment.appendChild(
                        this.buildScriptTag(file, onFileLoaded)
                    );
                }, this);

                head.appendChild(fragment);
            }
        },

        buildScriptTag: function(filename, callback) {
            var script  = document.createElement('script');
            script.type = "text/javascript";
            script.src  = filename;

            if (script.readyState) {
                script.onreadystatechange = function() {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {
                script.onload = callback;
            }

            return script;
        }
    });

}

// }}}
// {{{ Function.prototype.createCallback

// for Sencha Touch
if(Ext.isSenchaTouch && !Function.prototype.createCallback) {

    Ext.apply(Function.prototype, {

        createCallback : function(/*args...*/){

            var args = arguments,
            method = this;

            return function() {
                return method.apply(window, args);
            };

        }

    });

}

// }}}
// {{{ Function.createSequence

// for Ext Core and Sencha Touch
if((Ext.isExtCore || Ext.isSenchaTouch) && !Function.prototype.createSequence) {

    Ext.apply(Function.prototype, {

        createSequence : function(fcn, scope){
            var method = this;
            return (typeof fcn != 'function') ?
                this :
                    function(){
                var retval = method.apply(this || window, arguments);
                fcn.apply(scope || this || window, arguments);
                return retval;
            };
        }

    });

}

// }}}
// {{{ Ext expand methods

/**
 * Ext expand methods
 */
Ext.applyIf(Ext,{

    // {{{ getMaxZindex

    /**
     * DOMツリー内のzindex最大値を取得します。
     *
     * @return zindex最大値
     */
    getMaxZindex : function() {

        var ret = 0;
        Ext.select('*').each(function(el){

            var zIndex = el.getStyle('z-index');
            if(Ext.isNumber(parseInt(zIndex, 10)) && ret < zIndex) {
                ret = zIndex;
            }

        }, this);

        return ret;
    },

    // }}}
    // {{{ getScrollPos

    /**
     * スクロール位置取得
     *
     * @return Object x:x位置 y:y位置
     */
    getScrollPos: function() {

        var y = (document.documentElement.scrollTop > 0) ? document.documentElement.scrollTop : document.body.scrollTop;
        var x = (document.documentElement.scrollLeft > 0) ? document.documentElement.scrollLeft : document.body.scrollLeft;

        return {
            x: x,
            y: y
        };

    }

    // }}}

});

// }}}


/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// for Ext Core
if(Ext.isExtCore) {

    Ext.Element.addMethods({

        getSize : function(contentSize){
            return {width: this.getWidth(contentSize), height: this.getHeight(contentSize)};
        }

    });

}

// for Ext Core and Sencha Touch
if(Ext.isExtCore || Ext.isSenchaTouch) {

    Ext.Element.addMethods({

        setLeftTop : function(left, top){
            var me = this,
            style = me.dom.style;
            style.left = me.addUnits(left);
            style.top = me.addUnits(top);
            return me;
        },

        getStyles : function(){
            var ret = {};
            Ext.each(arguments, function(v) {
               ret[v] = this.getStyle(v);
            },
            this);
            return ret;
        }

    });

}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// for Ext Core and Sencha Touch
if(Ext.isExtCore || Ext.isSenchaTouch) {

    Ext.util.TextMetrics = function(){
        var shared;
        return {
            measure : function(el, text, fixedWidth){
                if(!shared){
                    shared = Ext.util.TextMetrics.Instance(el, fixedWidth);
                }
                shared.bind(el);
                shared.setFixedWidth(fixedWidth || 'auto');
                return shared.getSize(text);
            },

            createInstance : function(el, fixedWidth){
                return Ext.util.TextMetrics.Instance(el, fixedWidth);
            }
        };
    }();

    Ext.util.TextMetrics.Instance = function(bindTo, fixedWidth){
        var ml = new Ext.Element(document.createElement('div'));
        document.body.appendChild(ml.dom);
        ml.position('absolute');
        ml.setLeftTop(-1000, -1000);
        ml.hide();

        if(fixedWidth){
            ml.setWidth(fixedWidth);
        }

        var instance = {

            getSize : function(text){
                ml.update(text);
                var s = ml.getSize();
                ml.update('');
                return s;
            },

            bind : function(el){
                ml.setStyle(
                    Ext.fly(el).getStyles('font-size','font-style', 'font-weight', 'font-family','line-height', 'text-transform', 'letter-spacing')
                );
            },

            setFixedWidth : function(width){
                ml.setWidth(width);
            },

            getWidth : function(text){
                ml.dom.style.width = 'auto';
                return this.getSize(text).width;
            },

            getHeight : function(text){
                return this.getSize(text).height;
            }
        };

        instance.bind(bindTo);

        return instance;
    };

    Ext.Element.addMethods({
        getTextWidth : function(text, min, max){
            return (Ext.util.TextMetrics.measure(this.dom, Ext.value(text, this.dom.innerHTML, true)).width).constrain(min || 0, max || 1000000);
        }
    });
}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Namespaces

Ext.ns(
    'Trick.app',
    'Trick.data',
    'Trick.form',
    'Trick.grid',
    'Trick.util',
    'Trick.plugins',
    'Trick.plugins.combobox',
    'Trick.test',
    'Trick.test.unit',
    'Trick.test.case',
    'Trick.test.case.core',
    'Trick.test.case.touch'
);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.util.clone

Trick.util.clone = function(obj) {

    // {{{ doClone

    function doClone(o) {

        if (!o || 'object' !== typeof o) {
            return o;
        }

        if ('function' === typeof o.clone) {
            return o.clone();
        }

        if (o.hasOwnProperty('__clonedTo')) {
            return o.__clonedTo;
        }

        var c = '[object Array]' === Object.prototype.toString.call(o) ? [] : {};

        o.__clonedTo = c;

        var p, v;

        for (p in o) {

            if ((p !== '__clonedTo') && o.hasOwnProperty(p)) {

                v = o[p];

                if (v && 'object' === typeof v) {
                    c[p] = doClone(v);
                } else {
                    c[p] = v;
                }
            }
        }

        return c;
    }

    // }}}
    // {{{ finalizeClone

    function finalizeClone(o) {

        if (o.hasOwnProperty('__clonedTo')) {

            delete o.__clonedTo;

            var p, v;

            for (p in o) {

                if (o.hasOwnProperty(p)) {

                    v = o[p];

                    if (v && 'object' === typeof v) {
                        finalizeClone(v);
                    }
                }
            }
        }
    }

    // }}}

    var clone = doClone(obj);
    finalizeClone(obj);

    return clone;
};

// }}}
// {{{ Shorthand

Trick.clone = Trick.util.clone;

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.test.unit.TestCase

/**
 * Trick.test.unit.TestCase
 *
 * テストケースクラス
 */
Trick.test.unit.TestCase = function(o) {

    var me = this,
        ret;

    switch(Trick.testingFramework.name) {

        // {{{ YUI Test

        case 'yui':

            // テストケース生成
            ret = new YAHOO.tool.TestCase(o);

            // assetメソッドショートハンド
            ret.assert = YAHOO.util.Assert;

            break;

        // }}}

    }

    return ret;
};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.test.unit.TestLogger

/**
 * Trick.test.unit.TestLogger
 *
 * テストロガークラス
 */
Trick.test.unit.TestLogger = function(id) {

    var me = this,
        ret;

    switch(Trick.testingFramework.name) {

        // YUI Test
        case 'yui':

            // テストロガークラス生成
            ret = new YAHOO.tool.TestLogger(id);

            break;
    }

    return ret;
};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.test.unit.Runner

/**
 * Trick.test.unit.TestRunner
 *
 * テストランナークラス
 */
Trick.test.unit.TestRunner = function() {

    var me = this,
        runner;

    return {

        // {{{ _runner

        _runner : function() {

            if(!runner) {

                // テストランナーオブジェクト生成
                switch(Trick.testingFramework.name) {

                    // YIU Test
                    case 'yui':
                        runner = YAHOO.tool.TestRunner;
                    break;
                }

            }

            return runner;
        },

        // }}}
        // {{{ add

        /**
         * テストケース/スイート追加メソッド
         *
         * @param t Ext.trick.unit.TestCase/Ext.trick.unit.TestSuite テストランナーに追加するオブジェクトを設定します。
         * @return void
         */
        add : function (t) {

            var me = this;

            switch(Trick.testingFramework.name) {

                // YUI Test
                case 'yui':
                    me._runner().add(t);
                    break;
            }
        },

        // }}}
        // {{{ run

        /**
         * テスト実行メソッド
         *
         * @return void
         */
        run : function() {

            var me = this;

            switch(Trick.testingFramework.name) {

                // YUI Test
                case 'yui':
                    me._runner().run();
                    break;
            }
        }

        // }}}
    };

}();

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.test.unit.TestSuite

/**
 * Trick.test.unit.TestSuite
 *
 * テストスイートクラス
 */
Trick.test.unit.TestSuite = function(name) {

    var me = this,
        ret;

    switch(Trick.testingFramework.name) {

        // YUI Test
        case 'yui':

            // テストケース生成
            ret = new YAHOO.tool.TestSuite(name);

            break;
    }

    return ret;
};

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.app.App

/**
 * Trick.app.App Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.app.App = function() {

    var me = this,
        setupConfig = {};

    return {

        // {{{ beforeunloadMsg

        beforeunloadMsg : 'このままページを移動すると編集中の内容は保存されませんがよろしいですか？',

        // }}}
        // {{{ beforeunload

        beforeunload : false,

        // }}}
        // {{{ useHistory

        useHistory: true,

        // }}}
        // {{{ setup

        /**
         * setup
         *
         * セットアップメソッド
         */
        setup : function(config) {

            var me = this;
            setupConfig = Trick.util.clone(config);
            config.onReady = config.onReady || Ext.emptyFn;

            // Ext.Directプロバイダ設定
            if(Ext.isExtJS && config.directProvider) {
                Ext.Direct.addProvider(config.directProvider);
            }

            // window.beforeunload
            window.onbeforeunload = function() {
                if(me.beforeunload) {
                    return me.beforeunload;
                }
            };

            // Ext.History初期化
            if(me.useHistory) {

                // Ext.History用タグ生成
                Ext.DomHelper.append(Ext.getBody(), {
                    tag: 'form',
                    id: 'history-form',
                    cls: 'x-hidden',
                    cn: [{
                        tag: 'input',
                        type: 'hidden',
                        id: 'x-history-field'
                    },{
                        tag: 'iframe',
                        id: 'x-history-frame'
                    }]
                });

                // Ext.History初期化
                Ext.History.init();

                // Shorthand
                me.History = Ext.History;

            }

            // エントリーポイント設定
            if(Ext.isSenchaTouch) {
                Ext.setup(config);
            } else {
                Ext.onReady(
                    config.onReady,
                    config.scope || window,
                    config.onReadyOption
                );
            }

            Trick.app.App.setupConfig = setupConfig;

        }

        // }}}

    };

}();

Ext.apply(Trick.app.App, new Ext.util.Observable());

// }}}
// {{{ Shorthand

Application = Trick.app.App;
App = Application;
Trick.setup = Trick.app.App.setup;

// }}}
// {{{ Application Namespaces

Ext.ns(
    'App.data',
    'App.form',
    'App.grid'
);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.app.LoadingMaskMgr

/**
 * Trick.app.LoadingMaskMgr Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.app.LoadingMaskMgr = function(){

    return {

        // {{{ remove

        /**
         * ローディングマスク削除メソッド
         *
         * @param o フェードアウトコンフィグオブジェクト
         */
        remove : function(o) {

            o = o || {};

            var mask = Ext.get('OMEGATRICK_LOADINGMASK'),
                logo = Ext.get('OMEGATRICK_LOADING_LOGO'),
                progress = Ext.get('OMEGATRICK_LOADING_PROGRESS');

            if(logo) {
                logo.fadeOut(Ext.apply(Trick.clone(o), {
                    callback: function() {
                        logo.remove();
                    }
                }));
            }

            if(progress) {

                progress.fadeOut(Ext.apply(Trick.clone(o), {
                    callback: function() {
                        progress.remove();
                        if(mask) {
                            var cb = function() {
                                mask.remove();
                            }
                            if(Ext.isFunction(o.callback)) {
                                cb.createSequence(o.callback);
                            }

                            mask.fadeOut(Ext.apply(Trick.clone(o), {
                                callback: cb
                            }));
                        }
                    }
                }));
            }

        },

        // }}}
        // {{{ setText

        /**
         * テキスト設定メソッド
         *
         * @param text 設定文字列
         */
        setText : function(text, iconWidth) {

            iconWidth = iconWidth || 32;
            var wrap = Ext.get('OMEGATRICK_LOADING_PROGRESS'),
                to = Ext.get('OMEGATRICK_LOADING_PROGRESS_MSG'),
                tm = Ext.util.TextMetrics.createInstance(wrap),
                width = tm.getWidth(text)+iconWidth;

            wrap.setWidth(width);
            wrap.setStyle({
                marginLeft: '-' + (width/2) + 'px'
            });

            to.update('<span>' + text + '</span>');

        },

        // }}}
        // {{{ showText

        /**
         * ローディングテキスト表示メソッド
         *
         * @param o コンフィグオブジェクト
         * @return void
         */
        showText : function(o) {

            var wrap = Ext.get('OMEGATRICK_LOADING_PROGRESS'),
                config = o || {};

            if(config.anim === false) {
                wrap.show();
            } else {
                wrap.fadeIn(config);
            }
        },

        // }}}
        // {{{ hideText

        /**
         * ローディングテキスト非表示メソッド
         *
         * @param o コンフィグオブジェクト
         * @return void
         */
        hideText : function(o) {

            var wrap = Ext.get('OMEGATRICK_LOADING_PROGRESS'),
                config = o || {};

            if(config.anim === false) {
                wrap.hide();
            } else {
                wrap.fadeOut(config);
            }
        }

        // }}}

    };

}();

// }}}
// {{{ Shorthand

Application.LoadingMask = Trick.app.LoadingMaskMgr;

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
