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

    // {{{ autoBeforeUnload

    autoBeforeUnload: true,

    // }}}
    // {{{ plugins

    plugins: ['t.xitems', 't.CompositeFieldFix'],

    // }}}
    // {{{ initComponent

    /**
     * コンポーネント初期化メソッド
     */
    initComponent : function() {

        var me = this;

        // 多階層初期値設定
        Ext.applyIf(me.xdefault, {
            xtype: 'container',
            layout: 'form'
        });
        me.setDeepDefault(me.initialConfig.items);

        // xformsプラグイン初期化イベントリスナー追加
        me.on('initxforms', me.onInitXForms, me);

        // データ変更イベントリスナー追加
        if(me.autoBeforeUnload) {
            me.on('dirty', function() {
                Application.beforeunload = Application.beforeunloadMsg;
            }, me);
            me.on('undirty', function() {
                Application.beforeunload = false;
            }, me);
        }

        // レンダリング後イベントリスナー追加
        me.on('afterrender', function(){

            var f = me.getForm();
            var v = f.getValues();

            me.form.trackResetOnLoad = true;

            me.form.reset = me.form.reset.createSequence(function() {
                me.fireEvent('undirty');
            });

            f.getFields = function() {

                var ret = f.items.items;

                Ext.iterate(v, function(key) {
                    var field = f.findField(key);

                    if(field) {

                        var exists = false;
                        Ext.iterate(ret, function(ef){
                            if(ef === field) {
                                exists = true;
                            }
                        });

                        if(!exists) {
                            ret.push(field);
                        }
                    }
                });

                return ret;
            };

            Ext.each(f.getFields(), function(form) {

                if(form instanceof Ext.form.Field) {
                    form.on('change', me.onChangeData, me);
                    form.on('keyup', me.onChangeData, me);
                }

                if(form instanceof Ext.form.Checkbox) {
                    form.on('check', me.onChangeData, me);
                }

                if(form.xradioSelector) {
                    Ext.each(form.items, function(item) {
                        item.on('check', me.onChangeData, me);
                    });
                }

                if(form instanceof Ext.form.ComboBox) {
                    form.on('select', me.onChangeData, me);
                }

                if(form instanceof Ext.form.SliderField) {
                    form.slider.on('change', me.onChangeData, me);
                }

                if(form instanceof Ext.form.HtmlEditor) {

                    form._preFireEventData = form.getValue();

                    Ext.TaskMgr.start({
                        run : function() {

                            if(form._preFireEventData != form.getValue()) {
                                form.fireEvent('change', form);
                                form._preFireEventData = form.getValue();
                            }

                        },
                        interval: 100
                    });

                }

            });

            f.on('actioncomplete', function(form, action) {

                if(
                    action.type == 'directload' ||
                    action.type == 'directsubmit'
                ) {
                    me.fireEvent('undirty');
                }

            }, me);
        }, me);

        // スーパークラスメソッドコール
        Trick.form.FormPanel.superclass.initComponent.apply(me, arguments);

    },

    // }}}
    // {{{ onChangeData

    /**
     * データ変更イベントハンドラ
     */
    onChangeData : function(form) {

        var me = this;
        var f = me.getForm();

        if(f.isDirty()) {
            me.fireEvent('dirty');
        } else {
            me.fireEvent('undirty');
        }

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
// {{{ Register xtype

Ext.reg('t_form', Trick.form.FormPanel);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
