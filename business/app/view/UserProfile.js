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
        				cls:'user-avatar-inner',
        				html:"<span class='user-avatar'></span>"
        			},
        			{
        				xtype:"container",
        				layout:{
                            type:'vbox'
                        },
                        flex:1,
        				items:[
        					{
                                flex:1,
        						xtype:"container",
                                cls:'user-profile-info',
        						layout:{
                                    type:'hbox',
                                    pack: 'center',
                                    align: 'center'
                                },
                                defaults: {
                                    xtype: 'component',
                                    margin: '5 5 5 5'
                                },                                 
                                items:[
        							{
                                        flex:1,
        								cls:"user-account-info",
        								html:"0"
        							},
        							{
                                        flex:1,
        								cls:"user-account-info",
        								html:"1"
        							},
        							{
                                        flex:1,
        								cls:"user-account-info",
        								html:"2"
        							}
        						]
        					},
                            {
                                cls:'user-card-type',
                                flex:1,
                                html:"普卡"
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