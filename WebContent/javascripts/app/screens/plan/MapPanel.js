Yuhodo.Plan.MapPanel = Ext.extend(Ext.Panel, {

    // Google Mapのズームレベル
    ZOOM_LEVEL: 16,

    center: undefined,

    // private
    initComponent: function() {

        var me = this;

        // InfoWindowのテンプレートHTML
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
            tbar: new Ext.Toolbar({
                items: [{
                    text: '詳細検索',
                    ref: 'detailsearchbtn',
                    iconCls: 'y-icon-search',
                    enableToggle: true,
                    toggleHandler: me.onShowSearchForm,
                    scope: me
                }]
            }),
            items: [{
                xtype: 'yuhodo-plan-formpanel',
                region: 'north',
                ref: 'searchform',
                id: 'searchform',
                height: 150,
                collapsed: true,
                split: true,
                collapseMode: 'mini',
                listeners: {
                    collapse: me.onChangeToggle,
                    expand: me.onChangeToggle,
                    scope: me
                }
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
        me.on('show', me.onShowMap, me);
    },

    // private
    onAfterRender: function() {
    },

    /**
     * google.maps.Mapにcenterをセットする。 
     */
    onShowMap: function() {

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
    },

    onShowSearchForm: function(btn, state) {

        var me = this;

        if (state) {
            me.searchform.expand();
        } else {
            me.searchform.collapse();
        }

    },

    onChangeToggle: function(panel) {
        this.getTopToolbar().detailsearchbtn.toggle(panel.isVisible());
    }
});

Ext.reg('yuhodo-plan-mappanel', Yuhodo.Plan.MapPanel);
