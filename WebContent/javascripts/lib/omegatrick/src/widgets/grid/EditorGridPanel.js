/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.grid.EditorGridPanel

/**
 * Trick.grid.EditorGridPanel Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.grid.EditorGridPanel = Ext.extend(Ext.grid.EditorGridPanel, {

    // {{{ initComponent

    /**
     * コンポーネント初期化メソッド
     */
    initComponent : function() {

        var me = this;

        Ext.apply(me, new Trick.grid.AbstractGridPanel());

        me.initAbstruct();

        // スーパークラスメソッドコール
        Trick.grid.EditorGridPanel.superclass.initComponent.apply(me, arguments);

    }

    // }}}

});

// }}}
// {{{ Shorthand

Trick.EditorGridPanel = Trick.grid.EditorGridPanel;

// }}}
// {{{ Register xtype

Ext.reg('t.editorgrid', Trick.grid.EditorGridPanel);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
