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

        me.forms.searchtext.focus();
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

        // 検索テキスト生成
        me.forms.searchtext = new Ext.form.TextField({
            tabIndex: 1,
            allowBlank: true,
            width: 500,
            height: 40,
            scope: me,
            listeners: {
                specialkey: me.onEnterPress,
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
        Yuhodo.app.screenTo('plan');
    },

    getSearchText: function() {
        return this.forms.searchtext.getValue();
    },

    onEnterPress: function(field, event) {

        var me = this;

        if (event.getKey() === Ext.EventObject.ENTER) {
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
