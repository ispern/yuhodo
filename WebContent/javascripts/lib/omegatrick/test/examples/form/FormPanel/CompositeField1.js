/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ CompositeField1

/**
 * CompositeField1 Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
CompositeField1 = Ext.extend(Ext.form.CompositeField, {

    // フィールドラベル設定
    fieldLabel: 'Full Name',

    // アンカー設定
    anchor: '100%',

    // アイテム設定
    items: [{
        xtype: 'Title'
    },{
        xtype: 'FirstName'
    },{
        xtype: 'LastName'
    }]

});

// }}}
// {{{ Register xtype

Ext.reg('CompositeField1', CompositeField1);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
