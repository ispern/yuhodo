Yuhodo.data.MapionMasterDataStore = Ext.extend(Ext.data.JsonStore, {

    category: 'genre',

    constructor: function(cfg) {
        var me = this;

        cfg = cfg || {};
        me.category = (cfg.category || me.category) + '/';

        // 設定適用
        Ext.apply(cfg, {
            proxy: new Ext.data.ScriptTagProxy({
                url: 'http://searchapi-stg.mapion.co.jp/search/ver1/master/' + me.category,
                nocache: false
            }),
            baseParams: {
                key: 'MA6',
                ot: 'jsonp',
                rows: '1000',
                level: '1'
            },
            root: 'ResultList',
            fields: [{
                // コード
                name: 'code',
                mapping: 'code'
            },{
                // コード名
                name: 'name',
                mapping: 'name'
            }]       
        });
        
        // スーパークラスメソッドコール
        Yuhodo.data.MapionMasterDataStore.superclass.constructor.call(me, cfg);
    }
});
