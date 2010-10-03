/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ App.form.ComboBox

/**
 * App.form.ComboBox Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
App.form.ComboBox = Ext.extend(Ext.form.ComboBox, {

    // 名前
    name: 'combobox',

    // キーイベント有効化
    enableKeyEvents: true,

    // フィールドラベル設定
    fieldLabel: 'ComboBox',

    // プラグイン設定
    plugins: ['t.combo.empty'],

    typeAhead: true,
    triggerAction: 'all',
    lazyRender:true,
    mode: 'local',
    store: {
       xtype: 'arraystore',
       id: 0,
       fields: [
          'myId',
          'displayText'
       ],
       data: [['', ''], [1, 'item1'], [2, 'item2']]
    },
    valueField: 'myId',
    displayField: 'displayText'
});

// }}}
// {{{ Register xtype

Ext.reg('app-combobox', App.form.ComboBox);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
