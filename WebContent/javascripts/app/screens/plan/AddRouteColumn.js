Yuhodo.Plan.AddRouteColumn = Ext.extend(Trick.grid.Column, {

    header: '',

    width: 50,

    xtype: 'actionculumn',

    items: [{
        handler: function(grid, rowIndex, colIndex) {
            console.log('action click');
            console.log(arguments);
        }
    }]

});

Ext.grid.Column.types['addroutecolumn'] = Yuhodo.Plan.AddRouteColumn;
