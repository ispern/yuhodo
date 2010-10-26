Yuhodo.Plan.MainPanel = Ext.extend(Ext.Panel, {

    // private
    initComponent: function() {

        var me = this;

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
                    ref: 'spotview'
                },

                // ツールバー
                tbar: new Ext.Toolbar({
                    items: [{
                        ref: 'addroot',
                        xtype: 'button',
                        text: 'ルート計算',
                        handler: me.calcRoute,
                        scope: me
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

        me.spotpanel.spotview.relayEvents(me.mappanel.spotlist, ['addroute']);

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

    calcRoute: function() {

        var me = this,
            store = me.spotpanel.spotview.getStore(),
            map = me.mappanel.map;

        if (store.getCount() > 1) {
            store.each(function(record, index, length) {
                var latlng = new google.maps.LatLng(1*record.get('lat'), 1*record.get('lng'));
                if (index === 0) {
                    map.setOrigin(latlng);
                } else if (index+1 === length) {
                    map.setDestination(latlng);
                } else {
                    map.addWayPoint({
                        location: latlng
                    });
                }
            });
            map.calcRoute();
        }
    }
});

Ext.reg('yuhodo-plan', Yuhodo.Plan.MainPanel);

