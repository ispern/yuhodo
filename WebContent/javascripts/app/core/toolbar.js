Yuhodo.Toolbar = Ext.extend(Ext.Panel, {
    
    initComponent: function() {

        var me = this;

        Ext.apply(me, {
            itemLinkCls: me.baseCls + '-item-link'
        });

        // 設定適用
        Ext.apply(me, {

            xtype: 'container',

            region: 'north',

            border: false,

            bodyBorder: false,

            height: 30,

            html: {
                cls: me.itemLinkCls,
                children: [{
                    tag: 'a',
                    href: '#',
                    html: 'サインイン'
                }]
            }
        });

        // スーパークラスメソッドコール
        Yuhodo.Toolbar.superclass.initComponent.call(me);
    },

    onRender: function(ct, position) {

        var me = this;

        Yuhodo.Toolbar.superclass.onRender.call(me, ct, position);
    }
});

Ext.reg('yuhodo-toolbar', Yuhodo.Toolbar);
