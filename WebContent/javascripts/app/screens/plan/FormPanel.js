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
                        ref: '../../leftform',
                        items: [{
                            fieldLabel: 'キーワード',
                            xtype: 'yuhodo-form-geosuggestion',
                            ref: 'keyword',
                            allowBlank: false,
                            anchor: '90%'
                        },{
                            fieldLabel: '検索範囲(km)',
                            xtype: 'sliderfield',
                            ref: 'radius',
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
                        ref: '../../rightform',
                        items: [{
                           fieldLabel: 'ジャンル',
                           xtype: 'multiselect',
                           ref: 'gnrselect',
                           height: 80,
                           width: 220,
                           store: new Yuhodo.data.MapionMasterDataStore({
                           }),
                           displayField: 'name',
                           valueField: 'code',
                           hiddenName: 'code'
                        },{
                            xtype: 'button',
                            text: '検索',
                            width: 70,
                            style: 'float: right; margin: 5px 7px 0 0;',
                            handler: function() {
                                me.fireEvent('search');
                            },
                            scope: me
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

        me.addEvents('search');

        // スーパークラスメソッドコール
        Yuhodo.Plan.FormPanel.superclass.initEvents.call(me);
    
        // レンダリング後のイベント定義
        me.on('afterrender', me.onAfterRender, me);
    },

    onAfterRender: function() {

        var me = this;

        // フォームフィールドのキャッシュ
        me.forms = {
            keyword: me.leftform.keyword,
            radius: me.leftform.radius,
            gnr: me.rightform.gnrselect
        };
        me.forms.gnr.store.load({
            params: {
            },
            callback: function() {
                me.forms.gnr.setValue(me.defaultValue.gnr);
            },
            scope: me
        });
    },

    getValue: function() {
        var me = this,
            forms = me.forms,
            hiddenValue = Ext.fly(forms.keyword.getId()).dom.value;

        return {
            keyword: forms.keyword.getStore().getById(hiddenValue) || forms.keyword.getEl().dom.value,
            radius: forms.radius.getValue() * 1000,
            gnr: forms.gnr.getValue()
        };
    },

    isValid: function() {
        return this.leftform.getForm().isValid() && this.rightform.getForm().isValid();
    },

    getField: function(name) {
        return this.forms[name];
    }
});

Ext.reg('yuhodo-plan-formpanel', Yuhodo.Plan.FormPanel);
