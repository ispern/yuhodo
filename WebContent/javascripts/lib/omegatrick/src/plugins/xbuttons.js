/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.plugins.xbuttons

/**
 * Trick.plugins.xbuttons Plugin
 *
 * コンテナーオブジェクトにコンフィグオプションxbuttonsを追加し
 * xtype名の配列によりボタン設定を行うことが可能になります。
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.plugins.xbuttons = function() {

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

        if(cmp.xbuttons) {
            var buttons = [];
            Ext.each(cmp.xbuttons, function(item) {

                buttons.push({
                    xtype: item
                });

            });
            cmp.fbar = buttons;
            cmp.createFbar(cmp.fbar);

            cmp.xbuttons = {};

            Ext.each(cmp.buttons, function(item) {
                if(item.xname) {
                    cmp.xbuttons[item.xname] = item;
                }
            });

        }

    }

    // }}}

};

// }}}
// {{{ Register ptype

Ext.preg('t.xbuttons', Trick.plugins.xbuttons);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
