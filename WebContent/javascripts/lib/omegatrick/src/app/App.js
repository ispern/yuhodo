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
