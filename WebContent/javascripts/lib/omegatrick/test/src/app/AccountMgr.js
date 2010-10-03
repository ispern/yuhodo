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
    var _success = function() {

        var me = this;
        var lm = Application.LoadingMask;

        // ローディングマスク解除
        lm.remove();

        // イベント発火
        me.fireEvent('authsuccess');

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

                if(ret) {

                    // ローディングマスクテキスト更新
                    lm.setText(me.msg.complete);

                    // 認証成功処理
                    _success.call(me);

                } else {

                    // 自動サインイン処理
                    var key = Ext.util.Cookies.get(o.autoSigninKey);

                    o.directFn.autoSignin(key, function(ret) {

                        if(ret.success) {

                            // 認証成功処理
                            _success.call(me);

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

                    me.success(ret.options);

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
            dlg.on('hide', function(){

                // 認証成功処理
                _success.call(me);

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
