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
        cls:'quick-login',
        layout:{
            pack:'center',
            align:'center',
            type:'vbox'
        },
        items:[
        	{
        		xtype:'fieldset',
        		cls:'fieldset',
        		items:[
        			{
        				xtype:'textfield',
        				hidden:true,
        				name:'username',
        				itemId:'username',
                        clearIcon:false
        			},
                    {
                        xtype:'label',
                        html:'魔客会员商家登录',
                        style:'text-align:center;font-size:30px;',
                        margin:'0 0 40 0'
                    },
        			{
        				xtype:'label',
        				itemId:'nameLabel',
        				tpl:'您好，{username}',
                        style:'text-align:center'
        			},
                    {
                        xtype: 'passwordfield',
                        placeHolder: '请输入密码',
                        name: 'password',
                        required: true,
                        clearIcon:false
                    },
                    // {
                    //     xtype : 'img',
                    //     itemId : 'verifyImg',
                    //     width : 80,
                    //     border : false,
                    //     height : 30,
                    //     cls:'verify-code',
                    //     src : basePath + 'verify-code.jsp?date=' + new Date().getTime()
                    // },
                    {
                        xtype:'textfield',
                        placeHolder:'请输入验证码',
                        itemId:'verifyCode',
                        name:'verifycode',
                        cls:'textfield',
                        required:true,
                        clearIcon:false,
                        style:{
                            'text-align':'center',
                            'background':'url("'+ basePath + 'verify-code.jsp?date=' + new Date().getTime() +'") no-repeat',
                            'background-position':'right'
                        }
                    },
                    {
                        
                    },
                    {
                    	xtype:'textfield',
                    	itemId:'domain',
                    	name:'domain',
                    	hidden:true,
                        clearIcon:false
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