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

        // {{{ setup

        /**
         * setup
         *
         * セットアップメソッド
         */
        setup : function(config) {

            setupConfig = Trick.util.clone(config);
            config.onReady = config.onReady || Ext.emptyFn;

            // Ext.Directプロバイダ設定
            if(Ext.isExtJS && config.directProvider) {
                Ext.Direct.addProvider(config.directProvider);
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

// }}}
// {{{ Shorthand

Application = Trick.app.App;
Trick.setup = Trick.app.App.setup;

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
