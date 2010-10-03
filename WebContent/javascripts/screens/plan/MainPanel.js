Yuhodo.Plan.MainPanel = Ext.extend(Ext.Panel, {

    // 検索キーワード
    searchText: '',

    initComponent: function() {

        var me = this;
    
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
                ref: 'map',
                xtype: 'gmappanel',
                gmapType: 'map',
                zoomLevel: 16,
                setCenter: {
                    lat: 35.319031,
                    lng: 139.550703
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

        var me = this;

        Yuhodo.Plan.MainPanel.superclass.show.call(me);

        me.onSearch();
    },

    /*
     * 検索キーワードから座標を検索する。
     */
    onSearch: function() {

        var me = this,
            gm = google.maps;

        var geocoder = new gm.Geocoder();
        geocoder.geocode({'address': me.searchText, region: 'jp'}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var option = {
                    infoWindow: {
                        content: results[0].address_components[0].long_name,
                        size: new gm.Size(100, 50)
                    }
                },
                location = results[0].geometry.location;
                me.map.addMarker(location, option, true, true);
                Yuhodo.directionsService.setOrigin(location);
            } else {
                Ext.Msg.alert('Info', 'no data');
            }
        });
        me.onAroundSearch();
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

    setSearchText: function(searchText) {
        this.searchText = searchText;
    }
});

Ext.reg('yuhodo-plan', Yuhodo.Plan.MainPanel);

