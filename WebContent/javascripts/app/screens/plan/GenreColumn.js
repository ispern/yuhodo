Yuhodo.Plan.GenreColumn = Ext.extend(Trick.grid.Column, {

    header: 'ジャンル',

    dataIndex: 'gnr2_name',

    width: 150,

    sortable: true
});

Ext.grid.Column.types['genrecolumn'] = Yuhodo.Plan.GenreColumn;
