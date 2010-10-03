/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.form.FormPanel

/**
 * Trick.form.FormPanel Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.form.FormPanel = Ext.extend(Ext.form.FormPanel, {

    // {{{ plugins

    plugins: ['t.xitems', 't.xforms', 't.CompositeFieldFix'],

    // }}}
    // {{{ initComponent

    /**
     * コンポーネント初期化メソッド
     */
    initComponent : function() {

        var me = this;

        me.setDeepDefault(me.initialConfig.items);

        // スーパークラスメソッドコール
        Trick.form.FormPanel.superclass.initComponent.apply(me, arguments);

    },

    // }}}
    // {{{ setDeepDefault

    /**
     * 多階層デフォルトオブジェクト適用メソッド
     */
    setDeepDefault : function(items) {

        var me = this;

        Ext.each(items, function(item, cnt, items) {

            Ext.applyIf(item, me.xdefault);

            if(item && item.items && item.items.length > 0) {
                me.setDeepDefault(item.items);
            }
        });

    }

    // }}}

});

// }}}
// {{{ Shorthand

Trick.FormPanel = Trick.form.FormPanel;

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
