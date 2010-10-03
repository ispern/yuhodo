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

        // Form Panel生成
        var p = new Ext.Panel({
            title: 'Panel with Trick.plugins.xbuttons',
            padding: 20,
            width: 300,
            height: 150,
            plugins: ['t.xbuttons'],
            xbuttons: [
                'ok',
                'cancel'
            ],
            renderTo: Ext.get('renderarea')
        });

        p.xbuttons.ok.setText('[' + p.xbuttons.ok.getText() + ']');
        p.xbuttons.cancel.setText('[' + p.xbuttons.cancel.getText() + ']');
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
