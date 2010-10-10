Yuhodo.Plan.SpotView = Ext.extend(Ext.DataView, {

    tpl: [
        '<tpl for=".">',
        '   <div class="">{}</div>',
        '</tpl>'
    ],
    
    initComponent: function() {
        var me = this;
    
        // 設定適用
        Ext.apply(me, {
        });
        
        // スーパークラスメソッドコール
        Yuhodo.Plan.SpotView.superclass.initComponent.call(me);
    },   

    initEvents: function() {
        var me = this;
    
        // スーパークラスメソッドコール
        Yuhodo.Plan.SpotView.superclass.initEvents.call(me);
    
        // レンダリング後のイベント定義
        me.on('afterrender', me.onAfterRender, me);
    },

    onAfterRender: function() {
    }
});
