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

        Ext.apply(me, new Trick.grid.AbstractGridPanel());

        me.initAbstruct();

        // スーパークラスメソッドコール
        Trick.grid.GridPanel.superclass.initComponent.apply(me, arguments);

    }

    // }}}

});

// }}}
// {{{ Trick.grid.AbstractGridPanel

(function(){

    Trick.grid.AbstractGridPanel = function(){
    };

    Trick.grid.AbstractGridPanel.prototype = {

        // {{{ autoBeforeUnload

        autoBeforeUnload: true,

        // }}}
        // {{{ initAbstruct

        initAbstruct : function() {

            var me = this;

            // データ変更イベントリスナー追加
            if(me.autoBeforeUnload) {
                me.on('dirty', function() {
                    Application.beforeunload = Application.beforeunloadMsg;
                }, me);
                me.on('undirty', function() {
                    Application.beforeunload = false;
                }, me);
            }

            me.on('afterrender', function() {

                var s = me.getStore();
                s.on('update', me.onUpdate, me);

            }, me);

        },

        // }}}
        // {{{ onUpdate

        onUpdate : function() {

            var me = this;
            var s = me.getStore();
            var view = me.getView();
            var mr = s.getModifiedRecords();

            Ext.each(mr, function(r, cnt) {

                var dirty = false;
                var i = 0;
                Ext.iterate(r.data, function(key, v) {

                    if(r.json[i] != v) {
                        dirty = true;
                    } else {
                        delete r.modified[key];
                    }

                    i++;
                });

                if(!dirty) {
                    r.commit();
                }

            });

            view.refresh();

            if(me.isDirty()) {
                me.fireEvent('dirty');
            } else {
                me.fireEvent('undirty');
            }

        },

        // }}}
        // {{{ isDirty

        isDirty : function() {

            var me = this;
            var s = me.getStore();
            var mr = s.getModifiedRecords();

            if(mr.length > 0) {
                return true;
            }

            return false;
        }

        // }}}

    };

})();

// }}}
// {{{ Shorthand

Trick.GridPanel = Trick.grid.GridPanel;

// }}}
// {{{ Register xtype

Ext.reg('t_grid', Trick.grid.GridPanel);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
