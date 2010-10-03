/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.plugins.xitems

/**
 * Trick.plugins.xitems Plugin
 *
 * コンテナーオブジェクトにコンフィグオプションxitemsを追加し
 * xtype名の配列によりアイテム設定を行うことが可能になります。
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.plugins.xitems = function() {

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

        me.deep(cmp);

    };

    // }}}
    // {{{ deep

    me.deep = function(cmp) {

        Ext.each(cmp.xitems, function(item) {
            cmp.add({
                xtype: item
            });
        });

        if(cmp.items && cmp.items.each) {

            cmp.items.each(function(item) {
                me.deep(item);
            });
        }

    }

    // }}}

};

// }}}
// {{{ Register ptype

Ext.preg('t.xitems', Trick.plugins.xitems);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
