Yuhodo.form.GeocodeSuggestion = Ext.extend(Ext.form.ComboBox, {

    initComponent: function() {
        var me = this;
    
        var defaultCfg = Ext.applyIf(me.initialConfig, {
            displayField: 'address',
            hiddenName: 'address-id',
            loadingText: '検索中...',
            selectOnFocus: false,
            enableKeyEvents: true,
            minChars: 2,
            store: new Ext.data.JsonStore({
                proxy: new Ext.ux.google.map.Proxy({}),
                root: 'data',
                idProperty: 'id',
                fields: ['id', 'address', 'lat', 'lng']
            }),
            triggerAction: 'all',
            mode: 'remote',
            tpl: new Ext.XTemplate('<tpl for="."><div class="search-item">', '{address}', '</div></tpl>'),
            itemSelector: 'div.search-item',
            hideTrigger: true
        });

        // 設定適用
        Ext.apply(me, defaultCfg);

        // スーパークラスメソッドコール
        Yuhodo.form.GeocodeSuggestion.superclass.initComponent.call(me);
    }
});

Ext.reg('yuhodo-form-geosuggestion', Yuhodo.form.GeocodeSuggestion);
