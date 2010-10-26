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
    var isSenchaTouch = Ext.getOrientation ? true : false;

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
            if(me.useHistory && Trick.isExtJS) {

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
/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.app.AccountMgr

/**
 * Trick.app.AccountMgr Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.app.AccountMgr = function(){

    // {{{ private

    /**
     * アカウント情報
     */
    var _info = {};

    /**
     * イベント初期化メソッド
     */
    var _initEvents = function() {

        var me = this;
        var o = me.config;

        // イベント登録
        var events = {
            authsuccess : true,
            authfailure : true,
            signout: true
        };
        me.addEvents(events);

        // イベントハンドラ登録
        Ext.iterate(events, function(name) {
            if(Ext.isFunction(o[name])) {
                me.on(name, o[name], o.scope || me);
            }
        });

    };

    /**
     * 認証成功処理メソッド
     */
    var _success = function(o) {

        var me = this;
        var lm = Application.LoadingMask;

        // ローディングマスク解除
        lm.remove();

        // アカウント情報設定
        _info = o;

        // イベント発火
        me.fireEvent('authsuccess', o);

    };

    // }}}
    // {{{ public

    return {

        // {{{ msg

        /**
         * メッセージオブジェクト
         *
         * 言語設定でオーバーライドできるように、あえてクロージャーにしない
         */
        msg : {
            text : '認証中...',
            complete : '認証完了'
        },

        // }}}
        // {{{ getInfo

        /**
         * アカウント情報取得メソッド
         */
        getInfo : function() {

            return _info;

        },

        // }}}
        // {{{ setInfo

        /**
         * アカウント情報設定メソッド
         */
        setInfo : function(o) {

            var me = this;

            _info = o;

            // イベント発火
            me.fireEvent('updateinfo', _info);
        },

        // }}}
        // {{{ init

        /**
         * 初期化メソッド
         *
         * @param o コンフィグオプション
         */
        init : function(o) {

            o = o || {};
            var me = this;
            var lm = Application.LoadingMask;

            // 初期値設定
            Ext.applyIf(o, {
                dialog: Trick.SigninDialog,
                expDay: 7,
                autoSigninKey: 'Trick.app.AccountMgr'
            });

            me.config = Trick.clone(o);

            // イベント初期化
            _initEvents.call(me);

            // ローディングマスクテキスト更新
            lm.setText(me.msg.text);

            // サインイン状態確認
            o.directFn.isSignin(function(ret) {

                if(ret !== false) {

                    // ローディングマスクテキスト更新
                    lm.setText(me.msg.complete);

                    // 認証成功処理
                    _success.call(me, ret);

                } else {

                    // 自動サインイン処理
                    var key = Ext.util.Cookies.get(o.autoSigninKey);

                    o.directFn.autoSignin(key, function(ret) {

                        if(ret.success) {

                            // 認証成功処理
                            _success.call(me, ret.info);

                        } else {

                            // ダイアログ表示
                            me._showDialog(o);

                        }
                    });
                }
            });

        },

        // }}}
        // {{{ auth

        /**
         * 認証メソッド
         *
         * @param o コンフィグオプション
         */
        auth : function(o) {

            var me = this;

            // サーバーサイド認証処理
            o.directFn.auth(o.userid, o.passwd, o.autoSignin, function(ret) {

                if(ret.success) {

                    if(o.autoSignin) {

                        // クッキーに自動サインインキーを保存
                        Ext.util.Cookies.set(
                            me.autoSigninKey,
                            ret.auto_signin_key,
                            new Date((new Date).getTime()+me.expDay*24*60*60*1000)
                        );

                    }

                    me.success(ret.options, ret.info);

                } else {

                    me.failure(ret.options);

                }

            });
        },

        // }}}
        // {{{ signout

        /**
         * サインアウトメソッド
         */
        signout : function() {

            var me = this;
            var o = me.config;

            // サインアウト処理
            o.directFn.signout(function() {

                // クッキークリア
                Ext.util.Cookies.set(
                    o.autoSigninKey,
                    null,
                    new Date((new Date).getTime()+-1*24*60*60*1000)
                );

                // イベント発火
                me.fireEvent('signout');

            });

        },

        // }}}
        // {{{ _showDialog

        _showDialog : function (o) {

            o = o || {};
            var me = this;
            var lm = Application.LoadingMask;
            var dlg = new o.dialog(o);

            // イベント設定
            dlg.on('auth', me.auth, dlg);
            dlg.on('hide', function(o){

                // 認証成功処理
                _success.call(me, o.info);

            }, me);
            dlg.on('failure', function(){

                // イベント発火
                me.fireEvent('authfailure');

            }, me);

            // ローディングテキスト非表示
            lm.hideText({
                callback : function() {

                    dlg.show();

                }
            });

        }

        // }}}

    }

    // }}}

}();

Ext.apply(Trick.app.AccountMgr, new Ext.util.Observable());

// }}}
// {{{ Shorthand

Application.Account = Trick.app.AccountMgr;

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

// {{{ Trick.app.Viewport

/**
 * Trick.app.Viewport Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.app.Viewport = Ext.extend(Ext.Viewport, {

    // {{{ initComponent

    /**
     * コンポーネント初期化メソッド
     */
    initComponent : function() {

        var me = this;

        // 履歴変更イベントリスナー設定
        App.History.on('change', me.onHistoryChange, me);

        // スーパークラスメソッドコール
        Trick.app.Viewport.superclass.initComponent.apply(me, arguments);

    },

    // }}}
    // {{{ onHistoryChange

    onHistoryChange : Ext.emptyFn

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

// {{{ Trick.SigninDialog

/**
 * Trick.SigninDialog Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.SigninDialog = Ext.extend(Ext.Component, {

    // {{{ initComponent

    /**
     * コンポーネント初期化メソッド
     */
    initComponent : function() {

        var me = this;

        // 初期設定適用
        Ext.applyIf(me, {

            // ID設定
            id: Ext.id(),

            // ベースCSSクラス設定
            baseCls: 'tx-signin',

            // 持続時間設定
            duration: 0.4,

            // 移動距離設定
            distance: 100

        });

        // レイヤー生成
        me.layer = new Ext.Layer({

            // ID設定
            id: me.id,

            // CSSクラス設定
            cls: me.baseCls

        });

        // プロパティ設定
        Ext.apply(me, {

            // ID設定
            id: Ext.id(),

            // フォームオブジェクト
            forms: {},

            // ボディーラッパーCSSクラス設定
            bwrapCls: me.baseCls + '-bwrap',

            // ボディーCSSクラス設定
            bodyCls: me.baseCls + '-body',

            // インナーCSSクラス設定
            innerCls: me.baseCls + '-inner',

            // アイテムCSSクラス設定
            itemsCls: me.baseCls + '-items',

            // アイテム内部CSSクラス設定
            itemsInnerCls: me.baseCls + '-items-inner',

            // ヘッダーCSSクラス設定
            headerCls: me.baseCls + '-header',

            // コンテンツCSSクラス設定
            contentCls: me.baseCls + '-content',

            // レンダリング先設定
            renderTo: me.layer

        });

        // ウィンドウリサイズイベント追加
        Ext.EventManager.onWindowResize(me.onWindowResize, me);

        // スーパークラスメソッドコール
        Trick.SigninDialog.superclass.initComponent.call(me);

    },

    // }}}
    // {{{ initEvents

    /**
     * イベント初期化メソッド
     *
     * @return void
     */
    initEvents : function(){

    },

    // }}}
    // {{{ onRender

    // private
    onRender : function(ct, position) {

        var me = this,
            dh = Ext.DomHelper;

        // スーパークラスメソッドコール
        Trick.SigninDialog.superclass.onRender.call(me, ct, position);

        var el = me.el;

        // ラッパークラス追加
        el.addClass(me.bwrapCls);

        // テンプレート生成
        var t = new Ext.Template(
            '<div class="{bodyCls}">',
            '   <div class="{innerCls}">',
            '       <div class="clearfix">',
            '           <div class="{headerCls}">',
            '               <div class="title">{title}</div>',
            '           </div>',
            '           <div class="{itemsCls} clearfix">',
            '               <div class="{itemsInnerCls} clearfix">',
            '                   <div class="{contentCls}">',
            '                       <table class="form">',
            '                       <tbody>',
            '                       <tr>',
            '                           <th>{labelUserId}</th>',
            '                           <td class="userid"></td>',
            '                       </tr>',
            '                       <tr>',
            '                           <th>{labelPassword}</th>',
            '                           <td class="passwd"></td>',
            '                       </tr>',
            '                       <tr>',
            '                           <th></th>',
            '                           <td class="msg"><span>&nbsp;</span></td>',
            '                       </tr>',
            '                       <tr>',
            '                           <th>&nbsp;</th>',
            '                           <td class="auto-signin"></td>',
            '                       </tr>',
            '                       <tr>',
            '                           <th>&nbsp;</th>',
            '                           <td class="btn-signin"></td>',
            '                       </tr>',
            '                       </tbody>',
            '                       </table>',
            '                    </div>',
            '                </div>',
            '            </div>',
            '        </div>',
            '    </div>',
            '</div>',
            '<div class="forget">',
            '    <a href="{forgetUrl}">{msgForgetPass}</a>',
            '</div>'
        );
        t.append(el, {
            bodyCls: me.bodyCls,
            innerCls: me.innerCls,
            itemsCls: me.itemsCls,
            itemsInnerCls: me.itemsInnerCls,
            headerCls: me.headerCls,
            contentCls: me.contentCls,
            title: Trick.SigninDialog.msg.signin.title,
            labelUserId: Trick.SigninDialog.msg.signin.labels.userid,
            labelPassword: Trick.SigninDialog.msg.signin.labels.password,
            msgForgetPass: Trick.SigninDialog.msg.signin.forget.text,
            forgetUrl: Trick.SigninDialog.msg.signin.forget.url
        });
        me.body = Ext.get(el.child('.' + me.bodyCls));
        me.bodyInner = Ext.get(me.body.child('.' + me.innerCls));
        me.bodyItems = Ext.get(me.body.child('.' + me.itemsCls));
        me.header = Ext.get(me.body.child('.' + me.headerCls));
        me.title = Ext.get(me.header.child('.title'));
        me.forget = Ext.get(el.child('.forget'));

        // タイトル要素透明度設定
        me.title.setOpacity(0);

        // パスワード紛失要素透明度設定
        me.forget.setOpacity(0);

        // フォームレンダリング
        me._renderForms();

        // レンダリングフラグ設定
        this.rendered = true;

        // イベント初期化
        me.initEvents();
    },

    // }}}
    // {{{ _renderForms

    _renderForms : function() {

        var me = this;
        var useridContainer = Ext.get(me.body.child('.form .userid'));
        var passwdContainer = Ext.get(me.body.child('.form .passwd'));
        var autosigninContainer = Ext.get(me.body.child('.form .auto-signin'));
        var btnsigninContainer = Ext.get(me.body.child('.form .btn-signin'));

        // ユーザーID/メールアドレステキストフィールド生成
        me.forms.userid = new Ext.form.TextField({
            tabIndex: 1,
            allowBlank: false,
            disabled: true,
            enableKeyEvents: true,
            validationEvent: false,
            validator : function(v) {
                if (v == '') {
                    return Trick.SigninDialog.msg.signin.validate.email;
                }
                return true;
            },
            listeners: {
                keypress: {
                    fn: function(field, e) {
                        if (e.getKey() === e.ENTER) {
                            me.signin();
                        }
                    },
                    scope: me
                }
            },
            renderTo: useridContainer
        });

        // パスワードテキストフィールド生成
        me.forms.password = new Ext.form.TextField({
            inputType: 'password',
            tabIndex: 2,
            disabled: true,
            enableKeyEvents: true,
            listeners: {
                keypress: {
                    fn: function(field, e) {
                        if (e.getKey() === e.ENTER) {
                            me.signin();
                        }
                    },
                    scope: me
                }
            },
            renderTo: passwdContainer
        });

        // チェックボックス生成
        me.forms.autosignin = new Ext.form.Checkbox({
            disabled: true,
            boxLabel : Trick.SigninDialog.msg.signin.labels.autosignin,
            tabIndex: 3,
            listeners: {
                afterrender: function(c) {
                    c.el.on('keypress', function(e, t) {
                        if (e.getKey() === e.ENTER) {
                            me.signin();
                        }
                    });
                }
            },
            renderTo: autosigninContainer
        });

        // サインインボタン生成
        me.forms.submit = new Ext.Button({
            text: Trick.SigninDialog.msg.signin.labels.submit,
            disabled: true,
            type: 'submit',
            tabIndex: 4,
            /*plugins: ['focusactive'],*/
            handler: me.signin,
            scope: me,
            renderTo: btnsigninContainer
        });

    },

    // }}}
    // {{{ signin

    /**
     * サインインメソッド
     */
    signin : function() {

        var me = this;
        var msg = me.bodyItems.child('td.msg span');

        // フォーム無効化
        me.forms.submit.disable();

        // タイトル変更
        me.title.update(Trick.SigninDialog.msg.signin.progress);

        // パスワード紛失要素フェードアウト
        me.forget.fadeOut({
            duration: me.duration
        });

        // エラーメッセージ非表示
        msg.fadeOut({
            duration: me.duration,
            callback: function() {

                /*
                msg.setStyle({
                    display: 'none'
                });
                */

                // イベント発火
                me.fireEvent('auth', {
                    directFn: me.directFn,
                    userid: me.forms.userid.getValue(),
                    passwd: me.forms.password.getValue(),
                    autoSignin: me.forms.autosignin.getValue()
                });

            }
        });


    },

    // }}}
    // {{{ success

    /**
     * 認証成功時処理メソッド
     */
    success : function(o,info) {

        var me = this;

        // ダイアログ非表示
        me.hide(o, info);

    },

    // }}}
    // {{{ failure

    /**
     * 認証失敗時処理メソッド
     *
     * @param o パラメータ
     */
    failure : function(o) {

        var me = this;
        var msg = me.bodyItems.child('td.msg span');

        // タイトル変更
        me.title.update(Trick.SigninDialog.msg.signin.title);

        // エラーメッセージ更新
        msg.update(o.msg);

        // パスワード紛失要素フェードイン
        me.forget.fadeIn({
            duration: me.duration
        });

        // フォーム有効化
        me.forms.submit.enable();

        // エラーメッセージ表示
        msg.setOpacity(0);
        msg.setStyle({
            display: 'block'
        });
        msg.fadeIn({
            callback: function() {

                // メールアドレスにフォーカス設定
                me.forms.userid.selectText();

                // イベント発火
                me.fireEvent('failure');

            }
        });
    },

    // }}}
    // {{{ hide

    /**
     * 非表示メソッド
     */
    hide : function(o, info) {

        var me = this,
            cp = me.getCenterPosition();

        // タイトル要素フェードアウト
        me.title.fadeOut({
            duration: me.duration
        });

        // パスワード紛失要素フェードアウト
        me.forget.fadeOut({
            duration: me.duration
        });

        // 内部アイテム要素フェードアウト
        me.bodyItems.fadeOut({
            duration: me.duration,
            callback: function() {

                // 非表示アニメーション開始
                me.layer.shift({
                    x: cp.x - me.distance,
                easing: 'easeOutStrong',
                opacity: 0,
                duration: me.duration,
                callback: function() {

                    // レイヤーオブジェクト削除
                    me.layer.remove();

                    // イベント発火
                    me.fireEvent('hide', {
                        options: o,
                        info: info
                    }, me);

                }
                });

            }
        });

   },

    // }}}
    // {{{ show

    /**
     * 表示メソッド
     *
     * @return void
     */
    show : function() {

        var me = this,
            cp = me.getCenterPosition();

        // 初期位置設定
        me.layer.setLeft(cp.x + me.distance);
        me.layer.setTop(cp.y);
        me.layer.setOpacity(0);
        me.layer.show();

        // ボディ要素透明度設定
        me.body.setOpacity(.5);

        // 内部アイテム要素透明度設定
        me.bodyItems.setOpacity(0);

        // 表示アニメーション開始
        me.layer.shift({
            x: cp.x,
            easing: 'easeOutStrong',
            opacity: 1,
            duration: me.duration,
            callback: function() {

                // ボディ要素透明度設定
                me.body.setOpacity(1);

                // タイトル要素フェードイン
                me.title.fadeIn({
                    duration: me.duration
                });

                // パスワード紛失要素フェードイン
                me.forget.fadeIn({
                    duration: me.duration
                });

                // 内部アイテム要素フェードイン
                me.bodyItems.fadeIn({
                    duration: me.duration,
                    callback: function() {

                        // フォーム有効化
                        me.forms.userid.enable();
                        me.forms.password.enable();
                        me.forms.autosignin.enable();
                        me.forms.submit.enable();

                        // メールアドレスにフォーカス設定
                        me.forms.userid.focus();

                        // イベント発火
                        me.fireEvent('show', me);
                    }
                });
            }
        });
    },

    // }}}
    // {{{ getCenterPosition

    /**
     * 画面中央位置取得取得メソッド
     */
    getCenterPosition : function() {

        var me = this,
            vs = Ext.getDoc().getViewSize();

        return {
            x: (vs.width - me.layer.getWidth()) / 2,
            y: (vs.height - me.layer.getHeight()) / 2
        };
    },

    // }}}
    // {{{ onWindowResize

    /**
     * ウィンドウリサイズイベントハンドラ
     */
    onWindowResize : function(w, h) {

        var me = this,
            vs = Ext.getDoc().getViewSize(),
            cwp = (vs.width - me.layer.getWidth()) / 2,
            chp = (vs.height - me.layer.getHeight()) / 2;

        if (me.isVisible) {
            me.layer.setLeft(cwp);
            me.layer.setTop(chp);
        }

    }

    // }}}

});

// }}}
// {{{ Setting Messages

/**
 * メッセージ設定
 */
Trick.SigninDialog.msg = {
    signin: {
        title: 'OmegaTrickにサインイン',
        progress: 'サインイン中...',
        labels: {
            userid: 'ユーザーID',
            password: 'パスワード',
            autosignin: '1 週間サインインし続ける',
            submit: 'サインイン'
        },
        validate: {
            email: 'ユーザIDを入力してください。'
        },
        forget: {
            text: 'パスワード紛失',
            url: 'forget.html'
        }
    }
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

// {{{ Trick.form.FormPanel

/**
 * Trick.form.FormPanel Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.form.FormPanel = Ext.extend(Ext.form.FormPanel, {

    // {{{ autoBeforeUnload

    autoBeforeUnload: true,

    // }}}
    // {{{ plugins

    plugins: ['t.xitems', 't.CompositeFieldFix'],

    // }}}
    // {{{ initComponent

    /**
     * コンポーネント初期化メソッド
     */
    initComponent : function() {

        var me = this;

        // 多階層初期値設定
        Ext.applyIf(me.xdefault, {
            xtype: 'container',
            layout: 'form'
        });
        me.setDeepDefault(me.initialConfig.items);

        // xformsプラグイン初期化イベントリスナー追加
        me.on('initxforms', me.onInitXForms, me);

        // データ変更イベントリスナー追加
        if(me.autoBeforeUnload) {
            me.on('dirty', function() {
                Application.beforeunload = Application.beforeunloadMsg;
            }, me);
            me.on('undirty', function() {
                Application.beforeunload = false;
            }, me);
        }

        // レンダリング後イベントリスナー追加
        me.on('afterrender', function(){

            var f = me.getForm();
            var v = f.getValues();

            me.form.trackResetOnLoad = true;

            me.form.reset = me.form.reset.createSequence(function() {
                me.fireEvent('undirty');
            });

            f.getFields = function() {

                var ret = f.items.items;

                Ext.iterate(v, function(key) {
                    var field = f.findField(key);

                    if(field) {

                        var exists = false;
                        Ext.iterate(ret, function(ef){
                            if(ef === field) {
                                exists = true;
                            }
                        });

                        if(!exists) {
                            ret.push(field);
                        }
                    }
                });

                return ret;
            };

            Ext.each(f.getFields(), function(form) {

                if(form instanceof Ext.form.Field) {
                    form.on('change', me.onChangeData, me);
                    form.on('keyup', me.onChangeData, me);
                }

                if(form instanceof Ext.form.Checkbox) {
                    form.on('check', me.onChangeData, me);
                }

                if(form.xradioSelector) {
                    Ext.each(form.items, function(item) {
                        item.on('check', me.onChangeData, me);
                    });
                }

                if(form instanceof Ext.form.ComboBox) {
                    form.on('select', me.onChangeData, me);
                }

                if(form instanceof Ext.form.SliderField) {
                    form.slider.on('change', me.onChangeData, me);
                }

                if(form instanceof Ext.form.HtmlEditor) {

                    form._preFireEventData = form.getValue();

                    Ext.TaskMgr.start({
                        run : function() {

                            if(form._preFireEventData != form.getValue()) {
                                form.fireEvent('change', form);
                                form._preFireEventData = form.getValue();
                            }

                        },
                        interval: 100
                    });

                }

            });

            f.on('actioncomplete', function(form, action) {

                if(
                    action.type == 'directload' ||
                    action.type == 'directsubmit'
                ) {
                    me.fireEvent('undirty');
                }

            }, me);
        }, me);

        // スーパークラスメソッドコール
        Trick.form.FormPanel.superclass.initComponent.apply(me, arguments);

    },

    // }}}
    // {{{ onChangeData

    /**
     * データ変更イベントハンドラ
     */
    onChangeData : function(form) {

        var me = this;
        var f = me.getForm();

        if(f.isDirty()) {
            me.fireEvent('dirty');
        } else {
            me.fireEvent('undirty');
        }

    },

    // }}}
    // {{{ setDeepDefault

    /**
     * 多階層デフォルトオブジェクト適用メソッド
     */
    setDeepDefault : function(items) {

        var me = this;

        Ext.each(items, function(item, cnt, items) {

            Ext.applyIf(item, me.xdefault);

            if(item && item.items && item.items.length > 0) {
                me.setDeepDefault(item.items);
            }
        });

    }

    // }}}

});

// }}}
// {{{ Shorthand

Trick.FormPanel = Trick.form.FormPanel;

// }}}
// {{{ Register xtype

Ext.reg('t_form', Trick.form.FormPanel);

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

// {{{ Trick.grid.Column

/**
 * Trick.grid.Column Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.grid.Column = Ext.extend(Ext.grid.Column, {

    // {{{ constructor

    /**
     * コンストラクタ
     */
    constructor: function(cfg){

        var me = this;

        Ext.iterate(cfg, function(name) {
            if(me[name]) {
                cfg[name] = me[name];
            }
        });

        Trick.grid.Column.superclass.constructor.call(me, cfg);

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

// {{{ Trick.grid.GridPanel

/**
 * Trick.grid.GridPanel Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.grid.GridPanel = Ext.extend(Ext.grid.GridPanel, {

    // {{{ plugins

    plugins: ['t.xcolumns'],

    // }}}
    // {{{ initComponent

    /**
     * コンポーネント初期化メソッド
     */
    initComponent : function() {

        var me = this;

        Ext.apply(me, new Trick.grid.AbstractGridPanel());

        me.initAbstruct();

        // スーパークラスメソッドコール
        Trick.grid.GridPanel.superclass.initComponent.apply(me, arguments);

    }

    // }}}

});

// }}}
// {{{ Trick.grid.AbstractGridPanel

(function(){

    Trick.grid.AbstractGridPanel = function(){
    };

    Trick.grid.AbstractGridPanel.prototype = {

        // {{{ autoBeforeUnload

        autoBeforeUnload: true,

        // }}}
        // {{{ initAbstruct

        initAbstruct : function() {

            var me = this;

            // データ変更イベントリスナー追加
            if(me.autoBeforeUnload) {
                me.on('dirty', function() {
                    Application.beforeunload = Application.beforeunloadMsg;
                }, me);
                me.on('undirty', function() {
                    Application.beforeunload = false;
                }, me);
            }

            me.on('afterrender', function() {

                var s = me.getStore();
                s.on('update', me.onUpdate, me);

            }, me);

        },

        // }}}
        // {{{ onUpdate

        onUpdate : function() {

            var me = this;
            var s = me.getStore();
            var view = me.getView();
            var mr = s.getModifiedRecords();

            Ext.each(mr, function(r, cnt) {

                var dirty = false;
                var i = 0;
                Ext.iterate(r.data, function(key, v) {

                    if(r.json[i] != v) {
                        dirty = true;
                    } else {
                        delete r.modified[key];
                    }

                    i++;
                });

                if(!dirty) {
                    r.commit();
                }

            });

            view.refresh();

            if(me.isDirty()) {
                me.fireEvent('dirty');
            } else {
                me.fireEvent('undirty');
            }

        },

        // }}}
        // {{{ isDirty

        isDirty : function() {

            var me = this;
            var s = me.getStore();
            var mr = s.getModifiedRecords();

            if(mr.length > 0) {
                return true;
            }

            return false;
        }

        // }}}

    };

})();

// }}}
// {{{ Shorthand

Trick.GridPanel = Trick.grid.GridPanel;

// }}}
// {{{ Register xtype

Ext.reg('t_grid', Trick.grid.GridPanel);

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

// {{{ Trick.grid.EditorGridPanel

/**
 * Trick.grid.EditorGridPanel Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.grid.EditorGridPanel = Ext.extend(Ext.grid.EditorGridPanel, {

    // {{{ initComponent

    /**
     * コンポーネント初期化メソッド
     */
    initComponent : function() {

        var me = this;

        Ext.apply(me, new Trick.grid.AbstractGridPanel());

        me.initAbstruct();

        // スーパークラスメソッドコール
        Trick.grid.EditorGridPanel.superclass.initComponent.apply(me, arguments);

    }

    // }}}

});

// }}}
// {{{ Shorthand

Trick.EditorGridPanel = Trick.grid.EditorGridPanel;

// }}}
// {{{ Register xtype

Ext.reg('t.editorgrid', Trick.grid.EditorGridPanel);

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

// {{{ Trick.plugins.xitems

/**
 * Trick.plugins.xitems Plugin
 *
 * コンテナーオブジェクトにコンフィグオプションxitemsを追加し
 * xtype名の配列によりアイテム設定を行うことが可能になります。
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.plugins.xitems = function() {

    // {{{ vars

    var me = this;

    // }}}
    // {{{ init

    /**
     * 初期化メソッド
     *
     * @return void
     */
    me.init = function(cmp) {

        me.deep(cmp);

    };

    // }}}
    // {{{ deep

    me.deep = function(cmp) {

        Ext.each(cmp.xitems, function(item) {
            cmp.add({
                xtype: item
            });
        });

        if(cmp.items && cmp.items.each) {

            cmp.items.each(function(item) {
                me.deep(item);
            });
        }

    }

    // }}}

};

// }}}
// {{{ Register ptype

Ext.preg('t.xitems', Trick.plugins.xitems);

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

// {{{ Trick.plugins.xcolumns

/**
 * Trick.plugins.forms Plugin
 *
 * 多階層に配置されたコンポーネントをプロパティxcolumnsから
 * 参照可能にします。
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.plugins.xcolumns = function() {

    // {{{ vars

    var me = this;

    // }}}
    // {{{ init

    /**
     * 初期化メソッド
     *
     * @return void
     */
    me.init = function(cmp) {

        var model = cmp.colModel;
        var config = model.config;

        if(Ext.isObject(config)) {

            Ext.each(config.xcolumns, function(name, cnt) {
                config.xcolumns[cnt] = {
                    xtype: name
                };
            });

            model.setConfig(config.xcolumns, true);
        }

    };

    // }}}

};

// }}}
// {{{ Register ptype

Ext.preg('t.xcolumns', Trick.plugins.xcolumns);

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

// {{{ Trick.plugins.xbuttons

/**
 * Trick.plugins.xbuttons Plugin
 *
 * コンテナーオブジェクトにコンフィグオプションxbuttonsを追加し
 * xtype名の配列によりボタン設定を行うことが可能になります。
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.plugins.xbuttons = function() {

    // {{{ vars

    var me = this;

    // }}}
    // {{{ init

    /**
     * 初期化メソッド
     *
     * @return void
     */
    me.init = function(cmp) {

        if(cmp.xbuttons) {
            var buttons = [];
            Ext.each(cmp.xbuttons, function(item) {

                buttons.push({
                    xtype: item
                });

            });
            cmp.fbar = buttons;
            cmp.createFbar(cmp.fbar);

            cmp.xbuttons = {};

            Ext.each(cmp.buttons, function(item) {
                if(item.xname) {
                    cmp.xbuttons[item.xname] = item;
                }
            });

        }

    }

    // }}}

};

// }}}
// {{{ Register ptype

Ext.preg('t.xbuttons', Trick.plugins.xbuttons);

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

// {{{ Trick.plugins.combobox.empty

/**
 * Trick.plugins.combobox.empty Plugin
 *
 * コンテナーオブジェクトにコンフィグオプションxbuttonsを追加し
 * xtype名の配列によりボタン設定を行うことが可能になります。
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.plugins.combobox.empty = function() {

    // {{{ vars

    var me = this;

    // }}}
    // {{{ init

    /**
     * 初期化メソッド
     *
     * @return void
     */
    me.init = function(cmp) {

        var d = cmp.displayField;

        Ext.applyIf(cmp, {
            tpl: [
                '<tpl for=".">',
                '<div class="x-combo-list-item">',
                '<tpl if=' + d + '.length &gt; 1>{' + d + '}</tpl>',
                '<tpl if=' + d + '.length == 0>&nbsp;</tpl>',
                    '</div>',
                '</tpl>'
            ].join('')
        });

    }

    // }}}

};

// }}}
// {{{ Register ptype

Ext.preg('t.combo.empty', Trick.plugins.combobox.empty);

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

// {{{ Trick.plugins.CompositeFieldFix

/**
 * Trick.plugins.CompositeFieldFix Plugin
 *
 * コンテナーオブジェクトにコンフィグオプションxitemsを追加し
 * xtype名の配列によりアイテム設定を行うことが可能になります。
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.plugins.CompositeFieldFix = function() {

    // {{{ vars

    var me = this;

    // }}}
    // {{{ init

    /**
     * 初期化メソッド
     *
     * @return void
     */
    me.init = function(cmp) {

        if(Ext.isIE6) {
            cmp.on('afterrender', function() {
                cmp.hide();
                cmp.show();
            });
        }

    }

    // }}}

};

// }}}
// {{{ Register ptype

Ext.preg('t.CompositeFieldFix', Trick.plugins.CompositeFieldFix);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
