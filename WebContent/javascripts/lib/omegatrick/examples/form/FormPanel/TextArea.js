/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ App.form.TextArea

/**
 * App.form.TextArea Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
App.form.TextArea = Ext.extend(Ext.form.TextArea, {

    // 名前
    name: 'textarea',

    // キーイベント有効化
    enableKeyEvents: true,

    // フィールドラベル設定
    fieldLabel: 'TextArea'

});

// }}}
// {{{ Register xtype

Ext.reg('app-textarea', App.form.TextArea);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
