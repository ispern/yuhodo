Yuhodo.Plan.MainPanel = Ext.extend(Ext.Panel, {

    ZOOM_LEVEL: 16,

    center: undefined,

    initComponent: function() {

        var me = this;

        var infoWindowTpl = new Ext.XTemplate('<div class="info-window">',
                                           '    <h3>{address}</h3>',
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
                }
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
        me.store = new Ext.data.JsonStore({
            proxy: new Ext.data.ScriptTagProxy({
                url: Yuhodo.app.url.YahooLocalSearch
            }),
            baseParams: {
                category: 'landmark',
                dist: 5,
                n: 100,
                o: 'json'
            },
            root: 'Item',
            fields: ['Category', 'Title', 'DatumWgs84', 'Url']
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
        }
    },

    /*
     * 検索キーワードの周辺スポットを検索する。
     */
    onAroundSearch: function() {

        var me = this;

        me.store.load({
            params: {
                p: me.searchText,
                n: 20
            },
            callback: me.onAddMarker,
            scope: me
        });
    },

    onAddMarker: function(records, option, result) {

        var me = this,
            gm = google.maps;

        if (!result) {
            return false;
        }

        var markers = [];
        Ext.each(records, function(item) {
            markers.push({
                lat: 1*item.data.DatumWgs84.Lat,
                lng: 1*item.data.DatumWgs84.Lon,
                marker: {
                    title: item.Title,
                    icon: 'images/red-marker.png'
                },
                listeners: {
                    click: function() {
                        var location = this.getPosition(),
                            ds = Yuhodo.directionsService;

                        ds.addWayPoint(location);
                        ds.route();
                    }
                }
            });
        }, me);
        me.map.addMarkers(markers);
        return true;
    },

    setCenter: function(record) {
        this.center = record;
    }
});

Ext.reg('yuhodo-plan', Yuhodo.Plan.MainPanel);

