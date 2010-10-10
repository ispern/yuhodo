Yuhodo.Top.MainPanel = Ext.extend(Ext.Panel, {

    initComponent: function() {
        var me = this;

        // 設定適用
        Ext.apply(me, {

            region: 'center',

            xtype: 'container',

            forms: [],

            bodyCls: me.baseCls + '-body',

            itemsCls: me.baseCls + '-items',

            itemCls: me.baseCls + '-item',

            itemLogoCls: me.baseCls + '-item-logo',

            itemDescription: me.baseCls + '-item-description',

            formCls: me.baseCls + '-form',

            searchtext: me.baseCls + '-form-searchtext',

            searchbutton: me.baseCls + '-form-searchbutton'

        });

        // スーパークラスメソッドコール
        Yuhodo.Top.MainPanel.superclass.initComponent.call(me);
    },

    initEvents: function() {
        var me = this;

        // イベント定義
        me.addEvents('search');

        me.on('search', me.onSearch, me);

        // スーパークラスメソッドコール
        Yuhodo.Top.MainPanel.superclass.initEvents.call(me);
    
        // レンダリング後のイベント定義
        me.on('afterrender', me.onAfterRender, me);
    },

    onAfterRender: function() {

        var me = this;

        me.forms.combobox.focus();
    },

    onRender: function(ct, position) {

        var me = this;

        me.el = ct.createChild({
            cls: me.baseCls,
            children: [
                {
                    cls: me.bodyCls,
                    children: [{
                        cls: me.itemsCls,
                        children: [{
                            cls: me.itemCls,
                            children: [{
                                tag: 'img',
                                src: 'images/logo2.png',
                                cls: me.itemLogoCls
                            }]
                        },{
                            cls: me.itemCls,
                            children: [{
                                cls: me.itemDescription,
                                html: '説明をここに記載'
                            }]
                        },{
                            cls: me.formCls,
                            children: [{
                                tag: 'span',
                                cls: me.searchtext
                            },{
                                tag: 'span',
                                cls: me.searchbutton
                            }]
                        }]
                    }]
                }
            ]
        });

        Yuhodo.Top.MainPanel.superclass.onRender.call(me, ct, position);

        me.itemDescription = Ext.get(me.el.child('.' + me.itemDescription));
        me.form = Ext.get(me.el.child('.' + me.formCls));

        // Formオブジェクト生成
        me.renderForm();
    },

    // private
    renderForm: function() {

        var me = this,
            form = me.form,
            searchtextContainer = Ext.get(form.child('.' + me.searchtext)),
            searchbuttonContainer = Ext.get(form.child('.' + me.searchbutton));

        // 検索コンボボックス生成
        me.forms.combobox = new Ext.form.ComboBox({
            tabIndex: 1,
            allowBlank: true,
            width: 500,
            height: 40,
            store: new Ext.data.JsonStore({
                proxy: new Ext.ux.google.map.Proxy({}),
                root: 'data',
                idProperty: 'id',
                fields: ['id', 'address', 'lat', 'lng']
            }),
            triggerAction: 'all',
            mode: 'remote',
            displayField: 'address',
            valueField: 'id',
            loadingText: '検索中...',
            selectOnFocus: true,
            hiddenName: 'id',
            enableKeyEvents: true,
            hideTrigger: true,
            tpl: new Ext.XTemplate('<tpl for="."><div class="search-item">', '住所:{address}', '</div></tpl>'),
            itemSelector: 'div.search-item',
            minChars: 2,
            scope: me,
            listeners: {
                keydown: me.onKeyDown,
                scope: me
            },
            renderTo: searchtextContainer
        });

        // 検索ボタン生成
        me.forms.searchbutton = new Ext.Button({
            type: 'submit',
            text: Yuhodo.Top.msg.labels.searchbutton,
            tabIndex: 2,
            width: 100,
            height: 40,
            listeners: {
                click: me.onSearch,
                scope: me
            },
            renderTo: searchbuttonContainer
        });
    },

    onSearch: function() {

        var me = this;

        me.forms.combobox.view.setVisible(false);
        Yuhodo.app.screenTo('plan');
    },

    getAddress: function() {

        var me = this,
            combobox = me.forms.combobox;

        return combobox.getStore().getById(Ext.get(combobox.getName()).dom.value);
    },

    onKeyDown: function(field, event) {

        var me = this;

        if (event.getKey() === event.ENTER && !field.isExpanded()) {
            me.onSearch();
        }
    }
});

Yuhodo.Top.msg = {
    labels: {
        searchbutton: '検&nbsp;索'
    },
    text: {
    }
};

Ext.reg('yuhodo-top', Yuhodo.Top.MainPanel);
