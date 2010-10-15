Yuhodo.Plan.SpotNameColumn = Ext.extend(Trick.grid.Column, {
    
    header: '名前',
    
    dataIndex: 'title',

    width: 150,
    
    sortable: true
});

Ext.grid.Column.types['spotnamecolumn'] = Yuhodo.Plan.SpotNameColumn;
