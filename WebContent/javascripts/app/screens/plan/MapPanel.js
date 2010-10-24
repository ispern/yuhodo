Yuhodo.Plan.MapPanel = Ext.extend(Ext.Panel, {

    // Google Mapのズームレベル
    ZOOM_LEVEL: 14,

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
                    search: me.onClickSearchButton,
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
                mapConfig: {

                    // マップタイプ
                    gmapTypeId: 'map',

                    // ズームレベル
                    zoom: me.ZOOM_LEVEL,

                    // 中心設定(デフォルトは東京駅)
                    lat: 35.681382,
                    lng: 139.766084
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
            me.onAroundSearch({
                radius: '2000',
                gnr: 'M06'
            });
        }
    },

    /**
     * 検索キーワードの周辺スポットを検索する。
     */
    onAroundSearch: function(params) {

        var me = this,
            store = me.spotlist.getStore();

        if (typeof me.center == 'string') {
            // キーワード検索の場合、Mapionワード検索APIを使う
            store.setUrl('wordsearch', 'landmark');
            Ext.apply(params, {
                q: me.center,
                geo: 1
            });
        } else {
            // 中心情報の座標が指定されている場合、Mapionローカル検索APIを使う
            store.setUrl('localsearch', 'landmark');
            store.setCenter(me.center.get('address'), me.center.get('lat'), me.center.get('lng'));

            Ext.apply(params, {
                lat: me.center.data.lat,
                lon: me.center.data.lng
            });
        }

        store.load({
            params: params,
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

        // 中心位置の情報をrecordsに追加
        var center = me.spotlist.getStore().getCenter();
        map.setCenter(1*center.get('lat'), 1*center.get('lng'), me.ZOOM_LEVEL);

        // マーカー追加
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
     * 検索エリアの中心情報を設定する。
     */
    setCenter: function(center) {
        this.center = center;
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
    },

    onClickSearchButton: function() {

        var me = this,
            form = me.searchform;

        me.onAroundSearch({
            p: form.getField('keyword'),
            radius: form.getField('radius')
        });
    }
});

Ext.reg('yuhodo-plan-mappanel', Yuhodo.Plan.MapPanel);
