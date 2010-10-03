/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.grid.BranchesColumn

/**
 * Trick.grid.BranchesColumn Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.grid.BranchesColumn = Ext.extend(Trick.grid.Column, {

    // ヘッダー設定
    header: 'Branches Count',

    // サイズ設定
    width: 100,

    // ソート設定
    sortable: true,

    // データインデックス
    dataIndex: 'branches'

});

// }}}
// {{{ Register column type

Ext.grid.Column.types['branchescolumn'] = Trick.grid.BranchesColumn;

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
