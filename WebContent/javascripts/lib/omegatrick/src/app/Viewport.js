/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.app.Viewport

/**
 * Trick.app.Viewport Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.app.Viewport = Ext.extend(Ext.Viewport, {

    // {{{ initComponent

    /**
     * コンポーネント初期化メソッド
     */
    initComponent : function() {

        var me = this;

        // 履歴変更イベントリスナー設定
        App.History.on('change', me.onHistoryChange, me);

        // スーパークラスメソッドコール
        Trick.app.Viewport.superclass.initComponent.apply(me, arguments);

    },

    // }}}
    // {{{ onHistoryChange

    onHistoryChange : Ext.emptyFn

    // }}}

});

// }}}

/*
* Local variables:
* tab-width: 4
* c-basic-offset: 4
* c-hanging-comment-ender-p: nil
* End:
*/
