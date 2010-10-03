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

        // Trick.form.FormPanel生成
        var p = new Trick.form.FormPanel({
            title: 'Trick.form.FormPanel',
            padding: 20,
            height: 150,
            layout:'column',
            xdefault: {
                xtype: 'container',
                layout: 'form'
            },
            items: [{
                columnWidth: .5,
                xitems: [
                    'Field1',
                    'Field2',
                    'CompositeField1'
                ]
            },{
                width: 25,
                html: '&nbsp'
            },{
                columnWidth: .5,
                layout:'column',
                items: [{
                    columnWidth: .5,
                    xitems: [
                        'Field3'
                    ]
                },{
                    width: 25,
                    html: '&nbsp'
                },{
                    columnWidth: .5,
                    xitems: [
                        'Field4'
                    ]
                }]
            }],
            renderTo: Ext.get('renderarea')
        });

        p.xforms.field1.setValue('Text1');
        p.xforms.field2.setValue('Text2');
        p.xforms.field3.setValue('Text3');
        p.xforms.field4.setValue('Text4');
        p.xforms.title.setValue('title');
        p.xforms.firstName.setValue('firstName');
        p.xforms.lastName.setValue('lastName');

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
