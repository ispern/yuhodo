/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.grid.Column

/**
 * Trick.grid.Column Class
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.grid.Column = Ext.extend(Ext.grid.Column, {

    // {{{ constructor

    /**
     * コンストラクタ
     */
    constructor: function(cfg){

        var me = this;

        Ext.iterate(cfg, function(name) {
            if(me[name]) {
                cfg[name] = me[name];
            }
        });

        Trick.grid.Column.superclass.constructor.call(me, cfg);

    }

    // }}}

});

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
