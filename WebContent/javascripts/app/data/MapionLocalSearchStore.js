Yuhodo.data.MapionLocalSearchStore = Ext.extend(Ext.data.JsonStore, {

    category: 'landmark',

    constructor: function(cfg) {
        var me = this;

        cfg = cfg || {};
        me.category = (cfg.category || me.category) + '/';

        // 設定適用
        Ext.apply(cfg, {
            proxy: new Ext.data.ScriptTagProxy({
                url: 'http://searchapi-stg.mapion.co.jp/search/ver1/localsearch/' + me.category,
                nocache: false
            }),
            baseParams: {
                key: 'MA6',
                ot: 'jsonp',
                rows: '50'
            },
            root: 'Result.ResultList',
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
        });

        // スーパークラスメソッドコール
        Yuhodo.data.MapionLocalSearchStore.superclass.constructor.call(me, cfg);
    }
});
