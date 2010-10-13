Yuhodo.Plan.MapPanel = Ext.extend(Ext.Panel, {

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

        // 設定適用
        Ext.apply(me, {
            title: 'Map',
            xtype: 'container',
            layout: 'border',
            items: [{
                region: 'north',
                html: 'Form Panel'
            },{
                xtype: 'gmapview',

                region: 'center',

                ref: 'map',

                id: 'map',

                // InfoWindowのテンプレート
                tpl: infoWindowTpl,

                // データストア
                store: new Ext.data.JsonStore({
                    fields: ['id', 'address', 'lat', 'lng']
                }),

                // Google Mapの初期設定
                mapconfig: {

                    // マップタイプ
                    gmapTypeId: 'map',

                    // ズームレベル
                    zoomLevel: me.ZOOM_LEVEL,

                    // 中心設定
                    setCenter: {
                        lat: 35.319031,
                        lng: 139.550703
                    }
                }
            }]
        });
        
        // スーパークラスメソッドコール
        Yuhodo.Plan.MapPanel.superclass.initComponent.call(me);
    },

    // private
    initEvents: function() {
        var me = this;
    
        // スーパークラスメソッドコール
        Yuhodo.Plan.MapPanel.superclass.initEvents.call(me);
    
        // レンダリング後のイベント定義
        me.on('afterrender', me.onAfterRender, me);
        me.on('show', me.show, me);
    },

    // private
    onAfterRender: function() {
    },

    /**
     * google.maps.Mapにcenterをセットする。 
     */
    show: function() {

        var me = this,
            map = me.map;

        // Mapsのリサイズイベント発火
        google.maps.event.trigger(map.getMap(), 'resize');

        if (me.center) {
            var center = me.center,
                data = center.data;
            map.setCenter(data.lat, data.lng, me.ZOOM_LEVEL);
            map.createMarker(center, map.getConfig(center.id));

            // me.onAroundSearch();
        }
    },

    /**
     * google.maps.Mapオブジェクトを返す。
     */
    getMap: function() {
        return this.map;
    },

    /**
     * Google Mapのcenterを設定する
     */
    setCenter: function(record) {
        this.center = record;
    }
});

Ext.reg('yuhodo-plan-mappanel', Yuhodo.Plan.MapPanel);
