Ext.onReady(function () {
    var tpl = new Ext.XTemplate('<h3 class="selector">{title}</h3>');

    // 住所検索のデータストア
    var store = new Ext.data.Store({
        proxy: new Ext.ux.google.map.Proxy({}),
        reader: new Ext.data.JsonReader({
            root: 'data',
            idProperty: 'id'
        }, [{
            name: 'id',
            mapping: 'id'
        },{
            name: 'address',
            mapping: 'address'
        },{
            name: 'lat',
            mapping: 'lat'
        },{
            name: 'lng',
            mapping: 'lng'
        }])
    });

    // GridPanelのデータストア
    var gridstore = new Ext.data.JsonStore({
        fields: ['address', 'lat', 'lng']
    });

    // サジェストのリストテンプレート
    var resultTpl = new Ext.XTemplate('<tpl for="."><div class="search-item">', '<h3>住所:{address}</h3>', '経度:{lng} 緯度:{lat}', '</div></tpl>');

    // Google MapのInfoWindowテンプレート
    var infoWinTpl = new Ext.XTemplate('<div class="info-window">',
                                       '    <h3>{address}</h3>',
                                       '    <a id="start" href="#">スタート地点にする</a>&nbsp;<a id="end" href="#">ゴール地点にする</a>&nbsp;<a id="root" href="#">ルートに追加</a>&nbsp;',
                                       '</div>');

    // マーカーの描画
    var createMarker = function (record) {
        var gmapview = Ext.getCmp('mpnl');
        gmapview.createMarker(record, gmapview.getConfig(record.id));
        Ext.getCmp('routegrid').getStore().add(record);
    };

    var createRoute = function() {
        var grid = Ext.getCmp('routegrid'),
            gmapview = Ext.getCmp('mpnl'),
            store = grid.getStore();

        if (store.getCount() > 1) {
            store.each(function(record, index, length) {
                var latlng = new google.maps.LatLng(1*record.get('lat'), 1*record.get('lng'));
                if (index === 0) {
                    gmapview.setOrigin(latlng);
                } else if (index+1 === length) {
                    gmapview.setDestination(latlng);
                } else {
                    gmapview.addWayPoint({
                        location: latlng
                    });
                }
            });
            gmapview.calcRoute();
        }
        // if (store.getCount() > 1) {

            // for (var i=0, len=store.getCount(); i<len; i++) {
                // var record = store.getAt(i);
                // var latlng = new google.maps.LatLng({
                    // lat: record.get('lat'),
                    // lng: record.get('lng')
                // });
                // if (i === 0) {
                    // gmapview.setOrigin(latlng);
                // } else if (i === length) {
                    // gmapview.setDestination(latlng);
                // } else {
                    // gmapview.addWayPoint(latlng);
                // }
            // }
        // }
    };

    new Ext.Viewport({
        layout: 'border',
        items: [{
            region: 'north',
            height: 40,
            split: true,
            layout: 'table',
            layoutConfig: {
                columns: 2,
                tableAttrs: {
                    style: {
                        margin: '5px 0 0 5px'
                    }
                }
            },
            items: [{
                xtype: 'combo',
                id: 'addressCombo',
                store: store,
                triggerAction: 'all',
                mode: 'remote',
                displayField: 'address',
                valueField: 'id',
                loadingText: '検索中...',
                selectOnFocus: true,
                hiddenName: 'id',
                enableKeyEvents: true,
                emptyText: '住所を入力してください',
                width: 300,
                hideTrigger: true,
                tpl: resultTpl,
                itemSelector: 'div.search-item',
                minChars: 2,
                listeners: {
                    keydown: function (field, e) {
                        if (e.getKey() === e.ENTER && !this.isExpanded()) {
                            createMarker(this.getStore().getById(Ext.get(field.getName()).dom.value));
                            this.clearValue();
                        }
                    }
                }
            },{
                xtype: 'button',
                text: 'マーカーを追加',
                plugins: [{
                    ptype: 'focusactive'
                }],
                handler: function() {
                    var combo = Ext.getCmp('addressCombo');
                    var value = combo.getStore().getById(Ext.get(combo.getName()).dom.value);
                    if (value) {
                        createMarker(value);
                        combo.clearValue();
                    }
                }
            }]
        },{
            region: 'center',
            layout: 'border',
            items: [{
                region: 'center',
                items: {
                    xtype: 'gmapview',
                    id: 'mpnl',
                    tpl: infoWinTpl,
                    mapConfig: {
                        lat: 35.3162461234567,
                        lng: 139.4199371234567,
                        zoom: 14,
                        geoip: true,
                        googlebar: true
                    },
                    itemSelector: 'div.info-window'
                }
            },{
                region: 'west',
                width: 400,
                split: true,
                xtype: 'grid',
                id: 'routegrid',
                viewConfig: {
                    forceFit: true
                },
                store: gridstore,
                columns: [{
                    header: 'Title',
                    dataIndex: 'address'
                },{
                    header: 'Latitude',
                    dataIndex: 'lat'
                },{
                    header: 'Longitude',
                    dataIndex: 'lng'
                }],
                sm: new Ext.grid.RowSelectionModel({
                    singleSelect: true,
                    listeners: {
                        'rowselect': {
                            fn: function (t, i, r) {
                                var map = Ext.getCmp('mpnl');
                                var mrk = map.getMarkerById(r.id);
                                map.openInfoWindow(mrk);
                            }
                        }
                    }
                }),
                tbar: new Ext.Toolbar({
                    items: [{
                        xtype: 'button',
                        text: 'ルートを表示',
                        handler: createRoute
                    }]
                }),
                bbar: new Ext.PagingToolbar({
                    store: store,
                    id: 'ptbar',
                    pageSize: 20
                })
            }]
        }]
    });
});

