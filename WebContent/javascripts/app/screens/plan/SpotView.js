Yuhodo.Plan.SpotView = Ext.extend(Ext.DataView, {

    tpl: [
        '<tpl for=".">',
        '   <div class="item">',
        '       <div class="gnr">{gnr2_name}</div>',
        '       <div class="title">{title}</div>',
        '       <div class="address">〒{zip}<br/>{address}</div> ',
        '   </div>',
        '</tpl>'
    ],

    selectedClass: 'item-selected',
    
    initComponent: function() {
        var me = this;
    
        // 設定適用
        Ext.apply(me, {
            itemSelector: 'div.item',
            singleSelect: true,
            overClass: 'item-over',
            autoScroll: true
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

Ext.reg('yuhodo-plan-spotview', Yuhodo.Plan.SpotView);
