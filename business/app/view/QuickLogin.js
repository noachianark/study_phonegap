/**
 * @class Business.view.QuickLogin
 * @extends extendsClass
 * Description
 */
Ext.define('Business.view.QuickLogin', {
    extend: 'Ext.form.Panel',
    alias:"widget.quicklogin",
    requires: [
        
    ],

    config: {
        cls:'quic-login',
        items:[
        	{
        		xtype:'fieldset',
        		cls:'fieldset',
        		items:[
        			{
        				xtype:'textfield',
        				hidden:true,
        				name:'username',
        				itemId:'username'
        			},
        			{
        				xtype:'label',
        				itemId:'nameLabel',
        				tpl:'您好，{username}'
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
                    	xtype:'textfield',
                    	itemId:'domain',
                    	name:'domain',
                    	hidden:true
                    }
        		]
        	},
        	{
        		xtype:'button',
        		itemId:'quickLoginBtn',
        		cls:'button',
        		ui:'action',
        		text:'登 录'
        	},
        	{
        		xtype:'button',
        		itemId:'switchLogin',
        		text:'切换账号'
        	}
        ]
    }
});