Yuhodo.Plan.MainPanel = Ext.extend(Ext.Panel, {

    ZOOM_LEVEL: 16,

    center: undefined,

    initComponent: function() {

        var me = this;

        var infoWindowTpl = new Ext.XTemplate('<div class="info-window">',
                                               '    <h3>{title}</h3>',
                                               '    <span>住所:{address}</span>',
                                               '</div>');
    
        // 設定適用
        Ext.apply(me, {

            layout: 'border',

            border: false,

            items: [{
                region: 'west',
                title: 'サイドバー',
                collapsible: true,
                border: true,
                width: 200,
                split: true,
                html: 'サイド'
            },{
                region: 'center',
                border: false,
                id: 'map',
                ref: 'map',
                tpl: infoWindowTpl,
                xtype: 'gmapview',
                mapconfig: {
                    gmapTypeId: 'map',
                    zoomLevel: me.ZOOM_LEVEL,
                    setCenter: {
                        lat: 35.319031,
                        lng: 139.550703
                    }
                },
                store: new Ext.data.JsonStore({
                    fields: ['id', 'address', 'lat', 'lng']
                })
            }]
        });

        // スーパークラスメソッドコール
        Yuhodo.Plan.MainPanel.superclass.initComponent.call(me);
    },

    initEvents: function() {

        var me = this;

        me.addEvents('search', 'aroundsearch');

        me.on('aroundsearch', me.onAroundSearch, me);
    
        // スーパークラスメソッドコール
        Yuhodo.Plan.MainPanel.superclass.initEvents.call(me);
    
        // レンダリング後のイベント定義
        me.on('afterrender', me.onAfterRender, me);
    },

    onAfterRender: function() {

        var me = this;

        // Yahoo ローカルサーチAPIのストア生成
        // me.store = new Ext.data.JsonStore({
            // proxy: new Ext.data.ScriptTagProxy({
                // url: Yuhodo.app.url.YahooLocalSearch
            // }),
            // baseParams: {
                // category: 'landmark',
                // dist: 5,
                // n: 30,
                // o: 'json'
            // },
            // root: 'Item',
            // fields: [{
                // name: 'title',
                // mapping: 'Title'
            // },{
                // name: 'address',
                // mapping: 'Address'
            // },{
                // name: 'lat',
                // mapping: 'DatumWgs84.Lat'
            // },{
                // name: 'lng',
                // mapping: 'DatumWgs84.Lon'
            // },{
                // name: 'url',
                // mapping: 'Url'
            // }]
        // });


        me.store = new Ext.data.JsonStore({
            proxy: new Ext.data.ScriptTagProxy({
                url: Yuhodo.app.url.MapionLocalSearch + 'landmark/',
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
    },

    show: function() {

        var me = this,
            map = me.map;

        Yuhodo.Plan.MainPanel.superclass.show.call(me);

        // Mapsのリサイズイベント発火
        google.maps.event.trigger(me.map.getMap(), 'resize');

        if (me.center) {
            var center = me.center,
                data = center.data;
            map.setCenter(data.lat, data.lng, me.ZOOM_LEVEL);
            map.createMarker(center, map.getConfig(center.id));

            me.onAroundSearch();
        }
    },

    /*
     * 検索キーワードの周辺スポットを検索する。
     */
    onAroundSearch: function() {

        var me = this;

        me.store.load({
            params: {

                // ジャンル:観光・温泉
                gnr: 'M06',

                // 緯度
                lat: me.center.data.lat,

                // 経度
                lon: me.center.data.lng
            },
            callback: me.onAddMarker,
            scope: me
        });
    },

    onAddMarker: function(records, option, result) {

        var me = this,
            map = me.map;

        if (!result) {
            return false;
        }

        Ext.each(records, function(item) {
            var cfg = map.getConfig(item.id);
            cfg.icon = 'images/blue-pin.png';
            map.createMarker(item, cfg);
        }, me);
        return true;
    },

    setCenter: function(record) {
        this.center = record;
    }
});

Ext.reg('yuhodo-plan', Yuhodo.Plan.MainPanel);

