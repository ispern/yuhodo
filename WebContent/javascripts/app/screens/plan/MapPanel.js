Yuhodo.Plan.MapPanel = Ext.extend(Ext.Panel, {

    // Google Mapのズームレベル
    ZOOM_LEVEL: 14,

    center: undefined,

    // デフォルトの検索対象ジャンル
    gnr_value: 'M06',

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
                    pressed: true,
                    toggleHandler: me.onShowSpotList,
                    scope: me
                }]
            }),
            items: [{

                // 詳細検索フォーム
                xtype: 'yuhodo-plan-formpanel',
                region: 'north',
                ref: 'searchform',
                height: 200,
                collapsed: true,
                split: true,
                collapseMode: 'mini',
                defaultValue: {
                    gnr: me.gnr_value
                },
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
                collapsed: false,
                collapseMode: 'mini',
                split: true,
                height: 200,
                selModel: new Ext.grid.RowSelectionModel({
                    singleSelect: true,
                    listeners: {
                        rowselect: me.onRowSelect,
                        scope: me
                    }
                }),
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

        // ローディングマスクの設定
        me.loadMask = new Ext.LoadMask(me.body, {
            msg: '情報取得中...'
        });
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
            me.loadMask.show();
            me.onAroundSearch({
                radius: '2000',
                gnr: me.gnr_value
            });
        }
    },

    /**
     * 検索キーワードの周辺スポットを検索する。
     */
    onAroundSearch: function(params) {

        var me = this,
            store = me.spotlist.getStore();

        // マーカーを全てクリア
        me.map.clearMarkers();

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
            map = me.map,
            store = me.spotlist.getStore();

        if (!result) {
            return false;
        }

        // 中心位置の情報をrecordsに追加
        var center = me.spotlist.getStore().getCenter();
        map.setCenter(1*center.get('lat'), 1*center.get('lng'), me.ZOOM_LEVEL);

        var data = Yuhodo.data.MapionMasterData.children;
        // マーカー追加
        Ext.each(records, function(item) {

            if (item.get('zip').trim() === '') {
                // 郵便番号が存在しない場合、Storeからレコードを削除
                store.remove(item);
                return;
            }

            var cfg = map.getConfig(item.id),
                gnrData = data[item.get('gnr1_code')].children[item.get('gnr2_code')];

            if (gnrData) {
                cfg.icon = 'images/gmap-pin/' + (gnrData.icon || data[item.get('gnr1_code')].defaultIcon);
            }
            map.createMarker(item, cfg);
        }, me);

        me.loadMask.hide();

        return true;
    },

    onRowSelect: function(selMode, rowIndex, colIndex) {
        var me = this,
            store = me.spotlist.getStore();

        this.onShowInfoWindow(store.getAt(rowIndex));
    },

    /**
     * 選択したノードのInfoWindowを表示する。
     */
    onShowInfoWindow: function(record) {
        var me = this,
            map = me.map;

        // google.maps.Markerオブジェクトを取得
        var marker = map.getMarkerById(record.id);

        if (marker) {
            // zindexを変更する
            map.closeInfoWindow();

            // InfoWindowを表示
            map.openInfoWindow(marker);

        }
    },

    onClickSearchButton: function() {

        var me = this,
            form = me.searchform;   

        if (!form.isValid()) {
            return false;
        }

        me.loadMask.show();

        var values = form.getValue();

        me.center = values.keyword;
        me.onAroundSearch({
            radius: values.radius,
            gnr: values.gnr
        });       
        return true;
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
    }
});

Ext.reg('yuhodo-plan-mappanel', Yuhodo.Plan.MapPanel);
