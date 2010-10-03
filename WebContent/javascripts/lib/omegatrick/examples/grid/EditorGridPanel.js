/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

Application.setup({

    // {{{ onReady

    onReady : function() {

        // スクリプトタグ消去
        Trick.removeScriptTags();

        // Trick.grid.GridPanel生成
        var p = new Trick.grid.EditorGridPanel({
            title: 'Trick.grid.EditorGridPanel',
            width: 560,
            height: 150,
            store: {
                xtype: 'arraystore',
                fields: [
                    'company',
                    'branches'
                ],
                data: [
                    ['Alcoa Inc', 1],
                    ['Boeing Co.', 5],
                    ['Hewlett-Packard Co.', 2],
                    ['Wal-Mart Stores, Inc.', 9]
                ]
            },
            colModel: new Ext.grid.ColumnModel({
                columns: [{
                    xtype: 'companycolumn',
                    editor: {
                        xtype: 'textfield'
                    }
                },{
                    xtype: 'branchescolumn',
                    editor: {
                        xtype: 'textfield'
                    }
                }]
            }),
            renderTo: 'renderarea'
        });

        p.on('dirty', function() {
            p.setTitle('* Trick.grid.EditorGridPanel');
        });
        p.on('undirty', function() {
            p.setTitle('Trick.grid.EditorGridPanel');
        });
    }

    // }}}

});

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
