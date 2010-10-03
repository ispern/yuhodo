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
