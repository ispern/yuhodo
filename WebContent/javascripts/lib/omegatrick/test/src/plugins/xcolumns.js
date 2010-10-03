/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

// {{{ Trick.plugins.xcolumns

/**
 * Trick.plugins.forms Plugin
 *
 * 多階層に配置されたコンポーネントをプロパティxcolumnsから
 * 参照可能にします。
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 0.5.0
 */
Trick.plugins.xcolumns = function() {

    // {{{ vars

    var me = this;

    // }}}
    // {{{ init

    /**
     * 初期化メソッド
     *
     * @return void
     */
    me.init = function(cmp) {

        var model = cmp.colModel;
        var config = model.config;

        if(Ext.isObject(config)) {

            Ext.each(config.xcolumns, function(name, cnt) {
                config.xcolumns[cnt] = {
                    xtype: name
                };
            });

            model.setConfig(config.xcolumns, true);
        }

    };

    // }}}

};

// }}}
// {{{ Register ptype

Ext.preg('t.xcolumns', Trick.plugins.xcolumns);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
