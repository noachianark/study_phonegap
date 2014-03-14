/**
 * @class Business.view.UserProfile
 * @extends Ext.Container
 * Description
 */
Ext.define('Business.view.UserProfile', {
    extend: 'Ext.Container',
    alias:'widget.userprofile',
    config: {
    	cls:"user-profile",
        fullscreen:true,
        title:"您好，X会员",
        layout:'vbox',
        items:[
        	{
        		xtype:"container",
        		layout:'hbox',
        		cls:"profiles",
        		items:[
        			{
        				cls:"user-avatar",
        				xtype:"img"
        			},
        			{
        				xtype:"container",
        				layout:'vbox',
        				items:[
        					{
        						xtype:"container",
        						layout:'hbox',items:[
        							{
        								cls:"user-account-info",
        								html:"0"
        							},
        							{
        								cls:"user-account-info",
        								html:"1元剩余"
        							},
        							{
        								cls:"user-account-info",
        								html:"100积分"
        							}
        						]
        					}
        				]
        			}
        		]
        	},
        	{
        		xtype:'container',
        		html:'lala',
        		cls:'credits'
        	},
        	{
        		xtype:'container',
        		html:'xxxx',
        		cls:'buttons'
        	}
        ]
    },
	destroy:function(){
		this.callParent();
	},
	setNavBar:function(navi){
		//根据需要进行修改。
	}
});