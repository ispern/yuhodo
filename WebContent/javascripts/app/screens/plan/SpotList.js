Yuhodo.Plan.SpotList = Ext.extend(Trick.grid.GridPanel, {

    initComponent: function() {
        var me = this;
    
        // 設定適用
        Ext.apply(me, {
            store: new Yuhodo.data.MapionSearchStore({}),
            colModel: new Ext.grid.ColumnModel({
                xcolumns: ['spotnamecolumn', 'addresscolumn', 'genrecolumn', 'addroutecolumn']
            }),
            view: new Ext.grid.GridView({
                forceFit: true
            })
        });
        
        // スーパークラスメソッドコール
        Yuhodo.Plan.SpotList.superclass.initComponent.call(me);
    },

    initEvents: function() {
        var me = this;

        me.addEvents('addrecord', 'addroute');

        me.on('addrecord', me.onAddRecord, me);
    
        // スーパークラスメソッドコール
        Yuhodo.Plan.SpotList.superclass.initEvents.call(me);
    
        // レンダリング後のイベント定義
        me.on('afterrender', me.onAfterRender, me);
    },

    onAfterRender: function() {
    },

    onAddRecord: function(obj) {

        var me = this,
            recordType = me.getRecord();

        var data;
        if (typeof obj === Ext.data.Record) {
            data = {
                gnrname: obj.get('gnr2_name'),
                spotname: obj.get('title'),
                address: ['〒', obj.get('zip'), '&nbsp;', obj.get('address')]
            };
        } else {
            data = obj;
        }

        var record = new recordType(data);
        this.getStore().add(record);
    },

    getRecord: function() {
        return this.getStore().recordType;
    }
});

Ext.reg('yuhodo-plan-spotlist', Yuhodo.Plan.SpotList);
