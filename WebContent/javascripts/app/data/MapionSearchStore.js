Yuhodo.data.MapionSearchStore = Ext.extend(Ext.data.JsonStore, {

    url: 'http://searchapi-stg.mapion.co.jp/search/ver1/',

    category: 'landmark',

    constructor: function(cfg) {
        var me = this;

        cfg = cfg || {};
        me.category = (cfg.category || me.category) + '/';

        // 設定適用
        Ext.apply(cfg, {
            proxy: new Ext.data.ScriptTagProxy({
                url: '',
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
        Yuhodo.data.MapionSearchStore.superclass.constructor.call(me, cfg);
    },

    setUrl: function(kind, category) {

        var me = this;

        me.kind = kind;
        me.category = '/' + (category || me.category) + '/';

        me.proxy.setApi(Ext.data.Api.actions.read, me.url + kind + me.category);
    },

    setCenter: function(name, lat, lng) {
        this.center = new this.recordType({
            title: name,
            lat: lat,
            lng: lng
        });
    },

    getCenter: function() {
        return this.center;
    },

    loadRecords: function(o, options, success) {
        if (this.isDestroyed === true) {
            return;
        }

        if (o && success === true) {
            var data = this.reader.jsonData.Result.Geocode;
            if (data) {
                this.setCenter(data.geocodeStr, data.lat, data.lon);
            }
        }

        Yuhodo.data.MapionSearchStore.superclass.loadRecords.call(this, o, options, success);
    }
});
