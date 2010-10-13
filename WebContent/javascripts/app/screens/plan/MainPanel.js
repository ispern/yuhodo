Yuhodo.Plan.MainPanel = Ext.extend(Ext.Panel, {

    // private
    initComponent: function() {

        var me = this;

        me.store = new Yuhodo.data.MapionLocalSearchStore({});

        // 設定適用
        Ext.apply(me, {
            layout: 'border',
            border: false,
            items: [{
                region: 'west',
                id: 'spotpanel',
                ref: 'spotpanel',
                title: 'ルート情報',
                collapsible: true,
                width: 300,
                split: true,
                layout: 'fit',
                items: {

                    // スポット情報
                    xtype: 'yuhodo-plan-spotview',
                    id: 'spotview',
                    ref: 'spotview',
                    store : me.store
                },

                // ツールバー
                tbar: new Ext.Toolbar({
                    items: [{
                        ref: 'addroot',
                        xtype: 'button',
                        text: 'ルートに追加',
                        disabled: true
                    }]
                })
            },{
                region: 'center',
                id: 'mappanel',
                ref: 'mappanel',
                xtype: 'yuhodo-plan-mappanel'
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

        var me = this;

        // スーパークラスメソッドコール
        Yuhodo.Plan.MainPanel.superclass.show.call(me);

        // MapPanelのshowイベント発火
        me.mappanel.fireEvent('show');

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
    }
});

Ext.reg('yuhodo-plan', Yuhodo.Plan.MainPanel);

