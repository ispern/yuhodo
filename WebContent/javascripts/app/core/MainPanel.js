Yuhodo.MainPanel = Ext.extend(Ext.Panel, {

    // private
    initComponent: function() {

        var me = this;
    
        // 設定適用
        Ext.apply(me, {
            
            region: 'center',

            xtype: 'container',

            layout: 'slickcard',

            items: [{

                // トップ画面
                xtype: 'yuhodo-top',
                id: 'top',
                ref: 'top'
            },{

                // ルート作成画面
                xtype: 'yuhodo-plan',
                id: 'plan',
                ref: 'plan'
            }]
        });
        
        // スーパークラスメソッドコール
        Yuhodo.MainPanel.superclass.initComponent.call(me);
    },

    // private
    initEvents: function() {

        var me = this;

        me.top.on('search', me.onScreenChange, me);
        me.plan.on('beforeshow', function() {
            me.plan.setCenter(me.top.getAddress());
        }, me);
    
        // スーパークラスメソッドコール
        Yuhodo.MainPanel.superclass.initEvents.call(me);
    
        // レンダリング後のイベント定義
        me.on('afterrender', me.onAfterRender, me);
    },

    // private
    onAfterRender: function() {

        var me = this;
    }
});

Ext.reg('yuhodo-mainpanel', Yuhodo.MainPanel);
