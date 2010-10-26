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
            overClass: 'item-over',
            autoScroll: true,
            store: new Ext.data.Store({
                fields: [{
                    // 緯度
                    name: 'lat',
                    mapping: 'lat'
                },{
                    // 経度
                    name: 'lng',
                    mapping: 'lon'
                },{
                    // ジャンル2の名前
                    name: 'gnr2_name',
                    mapping: 'gnr2_name'
                },{
                    // 地名
                    name: 'title',
                    mapping: 'poi_name'
                },{
                    // 郵便番号
                    name: 'zip',
                    mapping: 'zip'
                },{
                    // 住所
                    name: 'address',
                    mapping: 'address'
                }]
            })
        });

        // スーパークラスメソッドコール
        Yuhodo.Plan.SpotView.superclass.initComponent.call(me);
    },   

    // private
    initEvents: function() {
        var me = this;

        // イベント定義
        me.addEvents('addroute');
    
        // イベントリスナー登録
        me.on('addroute', me.onAddRoute, me);
    
    },

    // private
    afterRender: function() {

        var me = this;

        Yuhodo.Plan.SpotView.superclass.afterRender.call(me);

        me.initEvents();
    },

    onAddRoute: function(record) {

        var me = this;

        me.store.add(record);
    }
});

Ext.reg('yuhodo-plan-spotview', Yuhodo.Plan.SpotView);
