/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Title

/**
 * Title Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Title = Ext.extend(Ext.form.TextField, {

    // xname
    xname: 'title',

    // アンカー設定
    anchor: '100%',

    // フィールドラベル設定
    fieldLabel: 'Title'

});

// }}}
// {{{ Register xtype

Ext.reg('Title', Title);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
