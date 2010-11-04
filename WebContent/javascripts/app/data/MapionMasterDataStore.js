Yuhodo.data.MapionMasterDataStore = Ext.extend(Ext.data.JsonStore, {

    category: 'genre',

    constructor: function(cfg) {
        var me = this;

        cfg = cfg || {};
        me.category = (cfg.category || me.category) + '/';

        // 設定適用
        Ext.apply(cfg, {
            proxy: new Ext.data.MemoryProxy(Yuhodo.data.MapionMasterData),
            root: 'parent',
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
