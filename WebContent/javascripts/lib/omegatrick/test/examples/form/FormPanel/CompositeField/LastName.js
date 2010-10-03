/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ App.form.LastName

/**
 * App.form.LastName Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
App.form.LastName = Ext.extend(Ext.form.TextField, {

    // 名前
    name: 'lastName',

    // キーイベント有効化
    enableKeyEvents: true,

    // flex
    flex : 2

});

// }}}
// {{{ Register xtype

Ext.reg('app-lastname', App.form.LastName);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
