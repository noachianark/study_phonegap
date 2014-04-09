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
                margin:"0 0 40 0",
        		xtype:'fieldset',
        		cls:'fieldset',
                width:"70vw",
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
                        clearIcon:false,
                        margin:"20 0 0 0"
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
                        margin:'30 0 0 0',
                        xtype:'textfield',
                        placeHolder:'请输入验证码',
                        itemId:'verifyCode',
                        name:'verifycode',
                        cls:'textfield-veryficode',
                        required:true,
                        clearIcon:false,
                        style:{
                            'text-align':'center',
                            'background':'url("'+ basePath + 'verify-code.jsp?date=' + new Date().getTime() +'") no-repeat',
                            'background-position':'right'
                        }
                    },
                    {
                        itemId:'changeCode',
                        xtype:'label',
                        html:'看不清？换一换',
                        margin:'5 5 5 5',
                        style:'text-align:right;text-decoration:underline;font-size:14px;',
                        listeners:{
                            show:function(el){
                                console.log("cxcxc");
                                // el.on('tap',function(){
                                //     console.log("xxx");
                                // });
                            }
                        }
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
        		cls:'login-btn',
        		text:'登 录'
        	},
        	{
        		xtype:'button',
        		itemId:'switchLogin',
                cls:'login-btn',
        		text:'切换账号',
                margin:'30 0 0 0'
        	}
        ]
    }
});