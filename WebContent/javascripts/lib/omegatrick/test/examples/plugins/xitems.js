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

        // Ext.form.FormPanel生成
        new Ext.form.FormPanel({
            title: 'Form Panel with Trick.plugins.xforms',
            padding: 20,
            width: 300,
            plugins: ['t.xitems'],
            xitems: [
                'UserName',
                'EMail'
            ],
            renderTo: Ext.get('renderarea')
        });

        new Ext.form.FormPanel({
            title: 'Form Panel deep layout with Trick.plugins.xforms',
            padding: 20,
            width: 700,
            plugins: ['t.xitems'],
            layout: 'column',
            defaultType: 'container',
            items: [{
                columnWidth: .5,
                layout: 'form',
                xitems: [
                    'UserName',
                    'EMail'
                ]
            },{
                width: 25,
                html: '&nbsp'
            },{
                columnWidth: .5,
                layout: 'form',
                xitems: [
                    'UserName',
                    'EMail'
                ]
            }],
            renderTo: Ext.get('renderarea2')
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
