/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */

/*!
 * Omega Trick Library 0.5.0
 * Copyright(c) 2006-2010 Xenophy.CO.,LTD All rights Reserved.
 * http://omegatrick.com
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

Application.setup({

    // Ext.Direct Provider
    directProvider: Ext.app.REMOTING_API,

    // {{{ onReady

    onReady : function() {

        // スクリプトタグ消去
        Trick.removeScriptTags();

        // Trick.form.FormPanel生成
        var p = new Trick.form.FormPanel({
            title: 'Trick.form.FormPanel',
            api: {
                load: FormPanel.load,
                submit: FormPanel.fh_submit
            },
            width: 700,
            padding: 20,
            tbar: [{
                text: '値設定',
                handler: function() {

                    var f = p.getForm();

                    f.setValues({
                        textfield: 'TextField',
                        textarea: 'TextArea',
                        numberfield: 'NumberField',
                        timefield: 'TimeField',
                        datefield: 'DateField',
                        sliderfield: 15,
                        triggerfield: 'TriggerField',
                        hidden: 'Hidden',
                        htmleditor: '<h1>HtmlEditor</h1>',
                        combobox: 1,
                        color: 'red',
                        title: 'Title',
                        firstName: 'FirstName',
                        lastName: 'LastName'
                    });
                }
            },{
                text: '値取得',
                handler: function() {

                    var f = p.getForm();
                    var values = f.getValues();
                    var text = '';

                    Ext.iterate(values, function(name, val) {
                        text += name + ':' + val + '<br />';
                    });

                    var win = new Ext.Window({
                        title: 'データ取得',
                        padding: 20,
                        modal: true,
                        html: text
                    });
                    win.show();

                }
            },'-',{
                text: 'データロード',
                handler : function() {

                    var f = p.getForm();
                    f.load({});

                }
            }],
            buttons: [{
                text: '保存',
                handler : function() {

                    var f = p.getForm();
                    f.submit({
                        success:function(form, action){
                        }
                    });

                }
            },{
                text: 'リセット',
                handler: function() {

                    var f = p.getForm();
                    f.reset();

                }
            }],
            items: [{
                xtype: 'app-textfield',
                anchor: '100%'
            },{
                xtype: 'app-compositefield',
                anchor: '100%'
            },{
                xtype: 'app-textarea',
                anchor: '100%'
            },{
                xtype: 'app-numberfield',
                width: 150
            },{
                xtype: 'app-timefield',
                width: 150
            },{
                xtype: 'app-datefield',
                width: 150
            },{
                xtype: 'app-sliderfield',
            },{
                xtype: 'app-triggerfield',
                width: 150
            },{
                xtype: 'app-hidden'
            },{
                xtype: 'app-htmleditor',
                anchor: '100%'
            },{
                xtype: 'app-combobox',
                width: 150
            },{
                xtype: 'app-checkbox'
            },{
                xtype: 'radiogroup',
                fieldLabel: 'Favorite Color',
                columns: [80, 80, 80],
                vertical: true,
                items: [{
                    xtype: 'app-radio',
                    checked: true,
                    boxLabel: 'Red',
                    inputValue: 'red'
                },{
                    xtype: 'app-radio',
                    checked: false,
                    boxLabel: 'Blue',
                    inputValue: 'blue'
                },{
                    xtype: 'app-radio',
                    checked: false,
                    boxLabel: 'Green',
                    inputValue: 'green'
                }]
            }],
            renderTo: Ext.get('renderarea')
        });

        p.on('dirty', function() {
            p.setTitle('* Trick.form.FormPanel');
        });
        p.on('undirty', function() {
            p.setTitle('Trick.form.FormPanel');
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
