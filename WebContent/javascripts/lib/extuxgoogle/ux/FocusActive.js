/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

// {{{ Namespace

Ext.ns('Ext.ux', 'Ext.ux.plugins');

// }}}
// {{{ Ext.ux.plugins.FocusActive

/**
 * Ext.ux.plugins.FocusActive
 *
 * @author  Kazuhiro Kotsutsumi <kotsutsumi@xenophy.com>
 * @version 1.0
 */
Ext.ux.plugins.FocusActive = function() {

    var me = this;
    var overCls = 'x-btn-over';
    var active = false;

    // {{{ init

    me.init = function(btn) {

        btn.on('afterrender', function() {
            me.targetEl = btn.el;
            btn.btnEl.on('focus', me.onFocus, me);
            btn.btnEl.on('blur', me.onBlur, me);
        }, me);

        btn.on('mouseout', function() {
            if (active) {
                me.targetEl.addClass(overCls);
            }
        }, me);
        this.component = btn;
    };

    // }}}
    // {{{ onFocus

    me.onFocus =  function(e, t) {
        active = true;
        me.targetEl.addClass(overCls);
    };

    // }}}
    // {{{ onBlur

    me.onBlur =  function(e, t) {
        me.targetEl.removeClass(overCls);
        active = false;
    };

    // }}}

};

// {{{ Register ptype

Ext.preg('focusactive', Ext.ux.plugins.FocusActive);

// }}}

/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
