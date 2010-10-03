/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ App.form.CompositeField

/**
 * App.form.CompositeField Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
App.form.CompositeField = Ext.extend(Ext.form.CompositeField, {

    // フィールドラベル設定
    fieldLabel: 'CompositeField',

    // アイテム設定
    items: [{
        xtype: 'app-title'
    },{
        xtype: 'app-firstname'
    },{
        xtype: 'app-lastname'
    }]

});

// }}}
// {{{ Register xtype

Ext.reg('app-compositefield', App.form.CompositeField);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
