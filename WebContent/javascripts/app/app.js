// ネームスペース
Ext.ns('Yuhodo', 'Yuhodo.Top', 'Yuhodo.Plan', 'Yuhodo.util');

Application.setup({
    
    useHistory: true,

    onReady: function() {

        var me = this;
        
        // スクリプトタグ消去
        Trick.removeScriptTags();

        var lm = Application.LoadingMask;

        // 画面描画
        var vp = new Trick.app.Viewport({

            layout: 'border',

            items: [{
                id: 'mainpanel',
                ref: 'mainpanel',
                xtype: 'yuhodo-mainpanel'
            },{
                id: 'toolbar',
                ref: 'toolbar',
                xtype: 'yuhodo-toolbar'
            }],

            onHistoryChange: function(token) {
                if (Ext.isString(token)) {
                    this.mainpanel.getLayout().setActiveItem(token);
                }
            }
        });

        Yuhodo.app.comp = vp.mainpanel;

        // Cookie Provider生成
        new Ext.state.CookieProvider({
            expires: new Date(new Date().getTime()+(1000*60*60*24*7))
        });

        Yuhodo.app.directLink();

        lm.remove();
    }
});

Yuhodo.app = {

    url: {

        /**
         * Yahoo ローカルサーチAPI
         */
        YahooLocalSearch: 'http://map.yahooapis.jp/LocalSearchService/V1/LocalSearch?appid=WHrlBmSxg65INUqUaY90kDYiX7l65uR_gchCYcpqp49UJdVxBcaTCfjzlaxLAQzqbUtyXg--',

        /**
         * Mapion ローカルサーチAPI
         */
        MapionLocalSearch: 'http://searchapi-stg.mapion.co.jp/search/ver1/localsearch/'
    
    
    },

    directLink: function() {

        var me = this,
            anchor = location.hash;

        if (Ext.isString(anchor) && anchor.indexOf('#', 0) != -1) {
            anchor = anchor.substr(1);
            me.comp.getLayout().setActiveItem(anchor);
        } else {
            me.screenTo('top');
        }
    },

    screenTo: function(name) {

        var me = this;

        if (Trick.app.App.setupConfig.useHistory) {
            Ext.History.add(name);
        } else {
            me.comp.getLayout().setActiveItem(name);
        }
    },

    getComponent: function() {
        return this.comp;
    }
};

