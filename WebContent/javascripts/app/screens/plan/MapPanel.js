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

            // ツールバー
            tbar: new Ext.Toolbar({
                items: [{
                    text: '詳細検索',
                    ref: 'detailsearchbtn',
                    iconCls: 'y-icon-search',
                    enableToggle: true,
                    toggleHandler: me.onShowSearchForm,
                    scope: me
                },'-',{
                    text: 'スポット情報',
                    ref: 'spotlistbtn',
                    iconCls: 'y-icon-search',
                    enableToggle: true,
                    toggleHandler: me.onShowSpotList,
                    scope: me
                }]
            }),
            items: [{

                // 詳細検索フォーム
                xtype: 'yuhodo-plan-formpanel',
                region: 'north',
                ref: 'searchform',
                height: 150,
                collapsed: true,
                split: true,
                collapseMode: 'mini',
                listeners: {
                    collapse: me.onChangeSearchToggle,
                    expand: me.onChangeSearchToggle,
                    scope: me
                }
            },{

                // Google Map
                xtype: 'gmapview',
                region: 'center',
                ref: 'map',

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
            },{
            
                // スポット情報一覧
                xtype: 'yuhodo-plan-spotlist',
                region: 'south',
                ref: 'spotlist',
                collapsed: true,
                collapseMode: 'mini',
                split: true,
                height: 200,
                listeners: {
                    collapse: me.onChangeSpotListToggle,
                    expand: me.onChangeSpotListToggle,
                    scope: me
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

        var me = this;

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

            me.onAroundSearch();
        }

        // スポット情報にcenterのデータを追加
        // me.spotlist.fireEvent('addrecord', me.center);
    },

    /**
     * 検索キーワードの周辺スポットを検索する。
     */
    onAroundSearch: function() {

        var me = this,
            store = me.spotlist.getStore();

        store.load({
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
     * google.maps.Mapオブジェクトを返す。
     */
    getMap: function() {
        return this.map;
    },

    /**
     * Google Mapのcenterを設定する。
     */
    setCenter: function(record) {
        this.center = record;
    },

    /**
     * 詳細検索フォームを表示する。
     */
    onShowSearchForm: function(btn, state) {

        var me = this;

        if (state) {
            me.searchform.expand();
        } else {
            me.searchform.collapse();
        }

    },

    /**
     * 詳細検索ボタンのトグルの状態を変更する。
     */
    onChangeSearchToggle: function(panel) {
        this.getTopToolbar().detailsearchbtn.toggle(panel.isVisible());
    },

    /**
     * スポット一覧を表示する。
     */
    onShowSpotList: function(btn, state) {
        
        var me = this;

        if (state) {
            me.spotlist.expand();
        } else {
            me.spotlist.collapse();
        }
    },

    /**
     * スポット一覧ボタンのトグルの状態を変更する。
     */
    onChangeSpotListToggle: function(panel) {
        this.getTopToolbar().spotlistbtn.toggle(panel.isVisible());
    }
});

Ext.reg('yuhodo-plan-mappanel', Yuhodo.Plan.MapPanel);
