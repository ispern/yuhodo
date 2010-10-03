/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Field2

/**
 * Field2 Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Field2 = Ext.extend(Ext.form.TextField, {

    // xname
    xname: 'field2',

    // アンカー設定
    anchor: '100%',

    // フィールドラベル設定
    fieldLabel: 'Field2'

});

// }}}
// {{{ Register xtype

Ext.reg('Field2', Field2);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
