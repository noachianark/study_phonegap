/**
 * @class Business.view.Login
 * @extends Ext.form.Panel
 * Description
 */
Ext.define('Business.view.Login', {
    extend: 'Ext.form.Panel',
    alias:"widget.loginview",
    requires: [
    'Ext.form.FieldSet', 
    'Ext.form.Password', 
    'Ext.Label', 
    'Ext.field.Select'],
    config: {
        cls:"loginPanel",
    	items: [
            // {
            //     xtype: 'label',
            //     html: '登录失败，请使用正确的密码和用户名.',
            //     itemId: 'signInFailedLabel',
            //     hidden: true,
            //     hideAnimation: 'fadeOut',
            //     showAnimation: 'fadeIn',
            //     style: 'color:#990000;margin:5px 0px;'
            // },
            {
                xtype: 'fieldset',
                cls:"fieldSet",
                items: [
                    {
                        xtype: 'textfield',
                        placeHolder: '用户名',
                        name: 'username',
                        itemId:"username",
                        cls:"textfield",
                        required: true
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: '密码',
                        name: 'password',
                        required: true
                    },
                    {
                        xtype: 'selectfield',
                        placeHolder: '请选择商家',
                        name:"mall",
                        options: [
                            {},
                            {text: 'First Option',  value: 'first'},
                            {text: 'Second Option', value: 'second'},
                            {text: 'Third Option',  value: 'third'}
                        ]
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'logInButton',
                cls:"button",
                ui: 'action',
                text: '登 陆'
            }
    	]
    }

});