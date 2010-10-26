Yuhodo.Plan.AddRouteColumn = Ext.extend(Ext.grid.ActionColumn, {

    constructor: function(cfg){

        var me = this;

        Ext.iterate(cfg, function(name) {
            if(me[name]) {
                cfg[name] = me[name];
            }
        });

        Ext.apply(cfg, {
            width: 18,
            items: [{
                iconCls: 'y-icon-add-route',
                handler: function(grid, rowIndex, colIndex) {
                    var obj = grid.getStore().getAt(rowIndex);
                    grid.fireEvent('addroute', obj);
                }
            }]
        });

        Yuhodo.Plan.AddRouteColumn.superclass.constructor.call(me, cfg);

    }
});

Ext.grid.Column.types['addroutecolumn'] = Yuhodo.Plan.AddRouteColumn;
