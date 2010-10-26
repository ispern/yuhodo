Yuhodo.form.GeocodeSuggestion = Ext.extend(Ext.form.ComboBox, {

    initComponent: function() {
        var me = this;
    
        // 設定適用
        Ext.apply(me, {
            store: new Ext.data.JsonStore({
                proxy: new Ext.ux.google.map.Proxy({}),
                root: 'data',
                idProperty: 'id',
                fields: ['id', 'address', 'lat', 'lng']
            }),
            triggerAction: 'all',
            mode: 'remote',
            displayField: 'address',
            valueField: 'address-id',
            loadingText: '検索中...',
            selectOnFocus: false,
            hiddenName: 'address-id',
            enableKeyEvents: true,
            hideTrigger: true,
            tpl: new Ext.XTemplate('<tpl for="."><div class="search-item">', '{address}', '</div></tpl>'),
            itemSelector: 'div.search-item',
            minChars: 2
        });
        
        // スーパークラスメソッドコール
        Yuhodo.form.GeocodeSuggestion.superclass.initComponent.call(me);
    }
});

Ext.reg('yuhodo-form-geosuggestion', Yuhodo.form.GeocodeSuggestion);
