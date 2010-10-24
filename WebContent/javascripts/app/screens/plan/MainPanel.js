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

    }
});

Ext.reg('yuhodo-plan', Yuhodo.Plan.MainPanel);

