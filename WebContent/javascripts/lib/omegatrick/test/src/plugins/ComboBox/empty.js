/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.plugins.combobox.empty

/**
 * Trick.plugins.combobox.empty Plugin
 *
 * コンテナーオブジェクトにコンフィグオプションxbuttonsを追加し
 * xtype名の配列によりボタン設定を行うことが可能になります。
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.plugins.combobox.empty = function() {

    // {{{ vars

    var me = this;

    // }}}
    // {{{ init

    /**
     * 初期化メソッド
     *
     * @return void
     */
    me.init = function(cmp) {

        var d = cmp.displayField;

        Ext.applyIf(cmp, {
            tpl: [
                '<tpl for=".">',
                '<div class="x-combo-list-item">',
                '<tpl if=' + d + '.length &gt; 1>{' + d + '}</tpl>',
                '<tpl if=' + d + '.length == 0>&nbsp;</tpl>',
                    '</div>',
                '</tpl>'
            ].join('')
        });

    }

    // }}}

};

// }}}
// {{{ Register ptype

Ext.preg('t.combo.empty', Trick.plugins.combobox.empty);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
