Ext.QuickTips.init();
Yuhodo.Plan.FormPanel = Ext.extend(Ext.Panel, {
    
    initComponent: function() {
        var me = this;
    
        // 設定適用
        Ext.apply(me, {

            border: false,

            padding: 10,

            items: [{
                xtype: 'container',
                items: [{
                    xtype: 'container',
                    layout: 'column',
                    defaults: {
                        border: false
                    },
                    items: [{
                        columnWidth: 0.3,
                        xtype: 't_form',
                        items: [{
                            fieldLabel: 'キーワード',
                            xtype: 'textfield',
                            anchor: '90%'
                        },{
                            fieldLabel: '検索範囲(km)',
                            xtype: 'sliderfield',
                            value: 3,
                            minValue: 1,
                            maxValue: 20,
                            increment: 1,
                            anchor: '90%',
                            tipText: function(thumb) {
                                return String(thumb.value) + 'km';
                            }
                        }]
                    },{
                        columnWidth: 0.3,
                        xtype: 't_form',
                        items: [{
                           fieldLabel: 'ジャンル',
                           xtype: 'multiselect',
                           ref: '../../../multiselect',
                           height: 80,
                           width: 220,
                           store: new Yuhodo.data.MapionMasterDataStore({}),
                           displayField: 'name',
                           valueField: 'code',
                           hiddenName: 'code'
                        },{
                            xtype: 'button',
                            text: '検索',
                            width: 70,
                            style: 'float: right; margin: 5px 7px 0 0;'
                        }]
                    }]
                }]
            }]
        });
        
        // スーパークラスメソッドコール
        Yuhodo.Plan.FormPanel.superclass.initComponent.call(me);
    },

    initEvents: function() {
        var me = this;
    
        // スーパークラスメソッドコール
        Yuhodo.Plan.FormPanel.superclass.initEvents.call(me);
    
        // レンダリング後のイベント定義
        me.on('afterrender', me.onAfterRender, me);
    },

    onAfterRender: function() {

        var me = this;

        me.multiselect.store.load({
            params: {
            }
        });
    }
});

Ext.reg('yuhodo-plan-formpanel', Yuhodo.Plan.FormPanel);
