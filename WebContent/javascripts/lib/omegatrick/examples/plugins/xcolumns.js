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

        // Ext.grid.GridPanel生成
        new Ext.grid.GridPanel({
            title: 'Grid Panel with Trick.plugins.xcolumns',
            width: 560,
            height: 150,
            plugins: ['t.xcolumns'],
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
                xcolumns: [
                    'companycolumn',
                    'branchescolumn'
                ]
            }),
            renderTo: 'renderarea'
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
