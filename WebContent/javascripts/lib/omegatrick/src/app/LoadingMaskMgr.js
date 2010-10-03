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
