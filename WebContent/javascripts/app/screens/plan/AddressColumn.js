Yuhodo.Plan.AddressColumn = Ext.extend(Trick.grid.Column, {
    
    header: '住所',
    
    dataIndex: 'address',

    width: 500,
    
    sortable: true
});

Ext.grid.Column.types['addresscolumn'] = Yuhodo.Plan.AddressColumn;
