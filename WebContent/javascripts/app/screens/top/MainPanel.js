Yuhodo.Top.MainPanel = Ext.extend(Ext.Panel, {

    // private
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

    // private
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

    // private
    onAfterRender: function() {

        var me = this;

        me.forms.combobox.focus();
    },

    // private
    onRender: function(ct, position) {

        var me = this;

        // 画面生成
        me.el = ct.createChild({
            cls: me.baseCls,
            children: [
                {
                    // body部
                    cls: me.bodyCls,
                    children: [{

                        // item部
                        cls: me.itemsCls,
                        children: [{

                            // ロゴ
                            cls: me.itemCls,
                            children: [{
                                tag: 'img',
                                src: 'images/logo2.png',
                                cls: me.itemLogoCls
                            }]
                        },{

                            // 説明
                            cls: me.itemCls,
                            children: [{
                                cls: me.itemDescription,
                                html: '説明をここに記載'
                            }]
                        },{

                            // form部
                            cls: me.formCls,
                            children: [{

                                // コンボボックス
                                tag: 'span',
                                cls: me.searchtext
                            },{

                                // 検索ボタン
                                tag: 'span',
                                cls: me.searchbutton
                            }]
                        }]
                    }]
                }
            ]
        });

        // スーパークラスメソッドコール
        Yuhodo.Top.MainPanel.superclass.onRender.call(me, ct, position);

        // DOMのキャッシュ
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

    /**
     * 検索ボタンクリック時のイベント
     */
    onSearch: function() {

        var me = this;

        me.forms.combobox.view.setVisible(false);
        Yuhodo.app.screenTo('plan');
    },

    /**
     * 選択した住所または検索キーワードを取得する。
     */
    getAddress: function() {

        var me = this,
            combobox = me.forms.combobox;

        return combobox.getStore().getById(Ext.get(combobox.getName()).dom.value);
    },

    /**
     * コンボボックスでのkeydownイベント
     */
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
