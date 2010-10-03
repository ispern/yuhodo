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

        // Ext.Panel生成
        var p = new Ext.Panel({
            title: 'Form Panel with Trick.plugins.xforms',
            padding: 20,
            width: 560,
            height: 150,
            plugins: ['t.xforms', 't.CompositeFieldFix'],
            layout:'column',
            defaultType: 'container',
            items: [{
                columnWidth: .5,
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    xname: 'field1',
                    anchor: '100%',
                    fieldLabel: 'Field1'
                },{
                    xtype: 'textfield',
                    xname: 'field2',
                    anchor: '100%',
                    fieldLabel: 'Field11'
                },{
                    xtype: 'compositefield',
                    fieldLabel: 'Full Name',
                    anchor: '100%',
                    items: [{
                        xtype: 'textfield',
                        name: 'title',
                        xname: 'title',
                        width: 40
                    },{
                        xtype: 'textfield',
                        name: 'firstName',
                        xname: 'firstName',
                        flex : 1
                    },{
                        xtype: 'textfield',
                        name: 'lastName',
                        xname: 'lastName',
                        flex : 2
                    }]
                }]
            },{
                width: 25,
                html: '&nbsp'
            },{
                columnWidth: .5,
                layout: 'form',
                items: [{
                    xtype: 'textfield',
                    xname: 'field3',
                    fieldLabel: 'Field2'
                },{
                    xtype: 'textfield',
                    xname: 'field4',
                    fieldLabel: 'Field21'
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
