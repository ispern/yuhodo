Yuhodo.Plan.MainPanel = Ext.extend(Ext.Panel, {

    // Google Mapのズームレベル
    ZOOM_LEVEL: 16,

    center: undefined,

    // private
    initComponent: function() {

        var me = this;

        var infoWindowTpl = new Ext.XTemplate('<div class="info-window">',
                                               '    <div class="title">{title}</div>',
                                               '    <div class="address">〒{zip}<br/>{address}</div> ',
                                               '    <div class="route"><a id="add" href="#">ルートに追加</a></div>',
                                               '</div>');
    
        me.store = new Yuhodo.data.MapionLocalSearchStore({});

        // 設定適用
        Ext.apply(me, {

            layout: 'border',

            border: false,

            items: [{
                region: 'west',
                title: 'スポット情報',
                collapsible: true,
                width: 300,
                split: true,
                layout: 'fit',
                items: {
                    xtype: 'yuhodo-plan-spotview',
                    store : me.store,
                    id: 'spotview',
                    ref: 'spotview'
                },
                tbar: new Ext.Toolbar({
                    items: [{
                        ref: 'addroot',
                        xtype: 'button',
                        text: 'ルートに追加',
                        disabled: true
                    }]
                }),
                id: 'spotpanel',
                ref: 'spotpanel'
            },{
                region: 'center',
                id: 'map',
                ref: 'map',
                title: 'aaa',
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

    // private
    initEvents: function() {

        var me = this;

        me.addEvents('search', 'aroundsearch');

        me.on('aroundsearch', me.onAroundSearch, me);
        me.spotpanel.spotview.on('beforeselect', me.onShowInfoWindow, me);
    
        // スーパークラスメソッドコール
        Yuhodo.Plan.MainPanel.superclass.initEvents.call(me);
    
        // レンダリング後のイベント定義
        me.on('afterrender', me.onAfterRender, me);
    },

    // private
    onAfterRender: function() {
    },

    // private
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

    /**
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

    /**
     * Google Mapにマーカーを追加する。
     */
    onAddMarker: function(records, option, result) {

        var me = this,
            map = me.map;

        if (!result) {
            return false;
        }

        Ext.each(records, function(item) {
            var cfg = map.getConfig(item.id);
            cfg.icon = 'images/hiking.png';
            map.createMarker(item, cfg);
        }, me);
        return true;
    },

    /**
     * 選択したノードのInfoWindowを表示する。
     */
    onShowInfoWindow: function(spotview, node, selections) {
        var me = this,
            map = me.map;

        // Recordオブジェクトを取得
        var record = me.spotpanel.spotview.getRecord(node);

        // google.maps.Markerオブジェクトを取得
        var marker = map.getMarkerById(record.id);

        // InfoWindowを表示
        map.openInfoWindow(marker);

        me.spotpanel.getTopToolbar().addroot.setDisabled(false);
    },

    /**
     * Google Mapのcenterを設定する
     */
    setCenter: function(record) {
        this.center = record;
    }
});

Ext.reg('yuhodo-plan', Yuhodo.Plan.MainPanel);

