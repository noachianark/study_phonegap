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
            {
                xtype: 'fieldset',
                cls:"fieldSet",
                items: [
                    {
                        xtype:'label',
                        html:'魔客会员商家登录',
                        style:'text-align:center;font-size:7vw;',
                        margin:'0 0 40 0'
                    },                
                    {
                        xtype: 'textfield',
                        placeHolder: '用户名啊',
                        name: 'username',
                        itemId:"username",
                        cls:"textfield",
                        clearIcon:false
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: '密码',
                        name: 'password',
                        clearIcon:false
                    },
                    {
                        xtype: 'textfield',
                        cls:"textfield",
                        placeHolder: '商家域名',
                        itemId:'domain',
                        name:"mall",
                        clearIcon:false
                    },                    
                    {
                        xtype:'textfield',
                        placeHolder:'请输入验证码',
                        itemId:'verifyCode',
                        name:'verifycode',
                        cls:'textfield-veryficode',
                        clearIcon:false,
                        style:{
                            'text-align':'center',
                            'background':'url("'+ basePath + 'verify-code.jsp?date=' + new Date().getTime() +'") no-repeat',
                            'background-position':'right'
                        }
                    },
                    {
                        itemId:'changeCode2',
                        xtype:'label',
                        html:'看不清？换一换',
                        margin:'5 5 5 5',
                        style:'text-align:right;text-decoration:underline;font-size:14px;'
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'logInButton',
                cls:'login-btn',
                text: '登 录',
                margin:"20 0"
            },
            {
                xtype:'button',
                itemId:'backToQuick',
                cls:'login-btn',
                text:'返 回',
                margin:"20 0"
            }
    	]
    }

});