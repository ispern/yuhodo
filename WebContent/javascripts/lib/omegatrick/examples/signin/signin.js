/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */
Application.setup({

    // Ext.Direct Provider
    directProvider: Ext.app.REMOTING_API,

    // {{{ onReady

    onReady : function() {

        // スクリプトタグ消去
        Trick.removeScriptTags();

        // ローディングマスク管理オブジェクト
        var lm = Application.LoadingMask;

        // アカウント管理オブジェクト
        var ac = Application.Account;

        // 認証実行
        /**
         * サンプルのID、パスワードは
         *
         * UserID:omega
         * Password:trick
         */
        ac.init({
            directFn: Account,
            authsuccess: function(o) {

                // サインアウトボタン生成
                new Ext.Button({
                    text: 'サインアウト',
                    handler: function() {

                        // サインアウト処理
                        ac.signout();

                    },
                    renderTo: Ext.getBody()
                });

            },
            authfailure : function() {

                // 認証失敗イベントハンドラ

            },
            signout: function() {

                // リロード
                location.reload();

            }
        });

    }

    // }}}

});

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
