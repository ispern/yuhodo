/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.plugins.xforms

/**
 * Trick.plugins.forms Plugin
 *
 * 多階層に配置されたコンポーネントをプロパティxformsから
 * 参照可能にします。
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.plugins.xforms = function() {

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

        cmp.initXForms = true;

        cmp.on('afterrender', me.onAfterRender, cmp);

    };

    // }}}
    // {{{ onAfterRender

    /**
     * レンダリング後イベントハンドラ
     */
    me.onAfterRender = function() {

        var cmp = this;

        cmp.xforms = {};

        // フォームアイテムスキャン
        me.scanFormItems(cmp.items, cmp);

    };

    // }}}
    // {{{ scanFormItems

    /**
     * フォームアイテムスキャンメソッド
     *
     * @return void
     */
    me.scanFormItems = function(items, cmp) {

        items.each(function(item, index, length) {

            if(item.items && item.items.getCount() > 0) {
                me.scanFormItems(item.items, cmp);
            }

            if(item.xname) {
                cmp.xforms[item.xname] = item;
            }

        });

    };

    // }}}

};

// }}}
// {{{ Register ptype

Ext.preg('t.xforms', Trick.plugins.xforms);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
