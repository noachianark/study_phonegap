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
                        xtype : 'img',
                        itemId : 'verifyImg',
                        width : 80,
                        border : false,
                        height : 30,
                        cls:'verify-code',
                        src : basePath + 'verify-code.jsp?date=' + new Date().getTime()
                    },
                    {
                        xtype:'label',
                        html:'看不清？点击图片刷新'
                    },
                    {
                        xtype:'textfield',
                        placeHolder:'验证码',
                        itemId:'verifyCode',
                        name:'verifycode',
                        cls:'textfield',
                        required:true
                    },
                    {
                        xtype: 'textfield',
                        placeHolder: '商家域名',
                        required:true,
                        itemId:'domain',
                        name:"mall"
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'logInButton',
                cls:"button",
                ui: 'action',
                text: '登 录'
            }
    	]
    }

});