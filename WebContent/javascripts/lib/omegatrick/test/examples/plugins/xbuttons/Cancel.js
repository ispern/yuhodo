/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ CancelButton

/**
 * CancelButton Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
CancelButton = Ext.extend(Ext.Button, {

    // xname
    xname: 'cancel',

    // テキスト設定
    text: 'Cancel',

    // ハンドラ設定
    handler: function() {
        alert('Cancel.');
    }

});

// }}}
// {{{ Register xtype

Ext.reg('cancel', CancelButton);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
