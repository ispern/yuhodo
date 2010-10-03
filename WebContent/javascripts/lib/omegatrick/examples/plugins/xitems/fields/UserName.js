/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ UserName

/**
 * UserName Class
 *
 * コンフィグオプションの初期設定のみを行う場合は
 * プロパティだけを下記のように上書き
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
UserName = Ext.extend(Ext.form.TextField, {

    // フィールドラベル設定
    fieldLabel: 'ユーザー名',

    // アンカー設定
    anchor: '100%'

});

// }}}
// {{{ xtype register

Ext.reg('UserName', UserName);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
