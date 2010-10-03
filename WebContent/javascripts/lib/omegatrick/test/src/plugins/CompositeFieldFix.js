/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.plugins.CompositeFieldFix

/**
 * Trick.plugins.CompositeFieldFix Plugin
 *
 * コンテナーオブジェクトにコンフィグオプションxitemsを追加し
 * xtype名の配列によりアイテム設定を行うことが可能になります。
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.plugins.CompositeFieldFix = function() {

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

        if(Ext.isIE6) {
            cmp.on('afterrender', function() {
                cmp.hide();
                cmp.show();
            });
        }

    }

    // }}}

};

// }}}
// {{{ Register ptype

Ext.preg('t.CompositeFieldFix', Trick.plugins.CompositeFieldFix);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
