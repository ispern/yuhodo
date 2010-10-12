Yuhodo.Plan.SpotView = Ext.extend(Ext.DataView, {

    // スポット情報のテンプレートHTML
    tpl: [
        '<tpl for=".">',
        '   <div class="item">',
        '       <div class="gnr">{gnr2_name}</div>',
        '       <div class="title">{title}</div>',
        '       <div class="address">〒{zip}<br/>{address}</div> ',
        '   </div>',
        '</tpl>'
    ],

    // レコード選択時のclass名
    selectedClass: 'item-selected',

    // private
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

    // private
    initEvents: function() {
        var me = this;
    
        // スーパークラスメソッドコール
        Yuhodo.Plan.SpotView.superclass.initEvents.call(me);
    
        // レンダリング後のイベント定義
        me.on('afterrender', me.onAfterRender, me);
    },

    // private
    onAfterRender: function() {
    }
});

Ext.reg('yuhodo-plan-spotview', Yuhodo.Plan.SpotView);
