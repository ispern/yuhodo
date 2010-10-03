/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.grid.GridPanel

/**
 * Trick.grid.GridPanel Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.grid.GridPanel = Ext.extend(Ext.grid.GridPanel, {

    // {{{ plugins

    plugins: ['t.xcolumns'],

    // }}}
    // {{{ initComponent

    /**
     * コンポーネント初期化メソッド
     */
    initComponent : function() {

        var me = this;

        // スーパークラスメソッドコール
        Trick.grid.GridPanel.superclass.initComponent.apply(me, arguments);

    }

    // }}}

});

// }}}
// {{{ Shorthand

Trick.GridPanel = Trick.grid.GridPanel;

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
