/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ App.form.TriggerField

/**
 * App.form.TriggerField Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
App.form.TriggerField = Ext.extend(Ext.form.TriggerField, {

    // 名前
    name: 'triggerfield',

    // キーイベント有効化
    enableKeyEvents: true,

    // フィールドラベル設定
    fieldLabel: 'TriggerField'

});

// }}}
// {{{ Register xtype

Ext.reg('app-triggerfield', App.form.TriggerField);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
