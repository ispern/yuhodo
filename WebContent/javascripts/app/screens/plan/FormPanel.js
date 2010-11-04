Yuhodo.Plan.FormPanel = Ext.extend(Trick.form.FormPanel, {
    
    initComponent: function() {
        var me = this,
            checkboxs = [],
            data = Yuhodo.data.MapionMasterData.parent;
    
        Ext.each(data, function(item) {
            checkboxs.push({
                boxLabel: item.name,
                name: item.code,
                checked: (item.code == 'M06')
            });
        });
    
        // 設定適用
        Ext.apply(me, {

            border: false,

            layout: 'vbox',

            padding: 3,

            layoutConfig: {
                pack: 'start',
                align: 'left'
            },

            items: [{
                xtype: 'container',
                layout: 'hbox',
                layoutConfig: {
                    pack: 'start',
                    aplign: 'middle'
                },
                flex: 0.7,
                width: 900,
                defaults: {
                    xtype: 'fieldset',
                    labelWidth: 80,
                    border: false,
                    width: 450,
                    height: 60,
                    defaults: {
                        width: 330,
                        msgTarget: 'under'
                    }
                },
                items: [{
                    items: [{
                        fieldLabel: 'キーワード',
                        hiddenName: 'keyword',
                        xtype: 'yuhodo-form-geosuggestion',
                        tabindex: 1,
                        allowBlank: false
                    }]
                },{
                    items: [{
                        fieldLabel: '検索範囲(km)',
                        xtype: 'sliderfield',
                        name: 'radius',
                        minValue: 1,
                        maxValue: 20,
                        increment: 1,
                        tipText: function(thumb) {
                            return String(thumb.value) + 'km';
                        }      
                    }]
                }]
            },{
                xtype: 'fieldset',
                width: 900,
                flex: 1.3,
                labelWidth: 1,
                border: true,
                title: 'ジャンル',
                name: 'name',
                items: [{
                    xtype: 'checkboxgroup',
                    columns: 5,
                    autoWidth: true,
                    tabindex: 3,
                    name: 'gnrs',
                    allowBlank: false,
                    msgTarget: 'under',
                    items: checkboxs
                }]
            },{
                xtype: 'container',
                flex: 0.6,
                width: 900,
                items: [{
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

        var me = this,
            form = me.getForm();

        // フォームフィールドのキャッシュ
        me.forms = {
            keyword: form.findField('keyword'),
            radius: form.findField('radius'),
            gnr: form.findField('gnrs')
        };
    },

    getValue: function() {
        var me = this,
            forms = me.forms,
            hiddenValue = Ext.fly(forms.keyword.getId()).dom.value,
            gnrs = forms.gnr.getValue();

        var gnrData = [];
        Ext.each(gnrs, function(gnr) {
            gnrData.push(gnr.getName());
        });
        return {
            keyword: forms.keyword.getStore().getById(hiddenValue) || forms.keyword.getEl().dom.value,
            radius: forms.radius.getValue() * 1000,
            gnr: gnrData.join(',')
        };
    },

    isValid: function() {
        return this.getForm().isValid();
    },

    getField: function(name) {
        return this.forms[name];
    }
});

Ext.reg('yuhodo-plan-formpanel', Yuhodo.Plan.FormPanel);
