/**
 * @class Business.view.UserProfile
 * @extends Ext.Container
 * Description
 */
Ext.define('Business.view.UserProfile', {
    extend: 'Ext.Panel',
    alias:'widget.userprofile',
    config: {
    	cls:"user-profile",
        fullscreen:true,
        layout:'vbox',
        title:'',
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
                                        itemId:'consumed',
                                        flex:1,
                                        xtype:'label',
        								cls:"user-account-info",
        								tpl:"￥{consumed}<br><span class='user-account-info-label'>已消费</span>"
        							},
        							{
                                        itemId:'balance',
                                        flex:1,
                                        xtype:'label',
        								cls:"user-account-info",
        								tpl:"￥{balance}<br><span class='user-account-info-label'>余额</span>"
        							},
        							{
                                        itemId:'credit',
                                        flex:1,
                                        xtype:'label',
        								cls:"user-account-info",
        								tpl:"{credit}<br><span class='user-account-info-label'>积分</span>"
        							}
        						]
        					},

                            {
                                flex:1,
                                xtype:"container",
                                cls:'user-card-type',
                                layout:{
                                    type:'hbox',
                                    pack:'center',
                                    align:'center'
                                },
                                defaults: {
                                    xtype: 'component',
                                    margin: '5 5 5 5'
                                }, 
                                items:[
                                    {
                                        xtype:'label',
                                        itemId:'cardType',
                                        flex:1,
                                        tpl:"<span class='user-card-type-label'>{type}</span>"
                                    }
                                ]
                            }

        				]
        			}
        		]
        	},



            //benifit panel
        	{
        		xtype:'container',
        		cls:'credits',
                defaults: {
                    xtype: 'label',
                    margin: '5 5 5 5'
                },
                layout:{
                    type:"hbox",
                    pack:"center"
                },
                items:[
                    {
                        itemId:'discount',
                        flex:1,
                        tpl:"{discount}%<br><span class='user-account-info-label'>折扣比</span>"
                    },
                    {
                        itemId:'rebate',
                        flex:1,
                        tpl:"{rebate}%<br><span class='user-account-info-label'>返现比</span>"
                    },
                    {
                        itemId:'rate',
                        flex:1,
                        tpl:"{rate}%<br><span class='user-account-info-label'>积分比</span>"
                    },
                    {
                        itemId:'left_credit',
                        flex:1,
                        tpl:"{left_credit}<br><span class='user-account-info-label'>剩余积分</span>"
                    }                                 
                ]
        	},




            //4 buttons layout
        	{
        		xtype:'container',
        		layout:{
                    type:"vbox",
                    pack:"center"
                },
                flex:1,
        		cls:'buttons',
                items:[
                    {
                        xtype:"container",
                        layout:{
                            type:"hbox",
                            pack:"center",
                            align:"center"
                        },
                        width:"100%",
                        items:[
                            {
                                itemId:"charge",
                                cls:"user-action-top-left",
                                flex:1,
                                xtype:"button",
                                text:"会员充值"
                            },
                            {
                                itemId:"exchange",
                                cls:"user-action-top-right",
                                flex:1,
                                xtype:"button",
                                text:"积分兑换"
                            }
                        ]
                    },
                    {
                        xtype:"container",
                        layout:{
                            type:"hbox",
                            pack:"center",
                            align:"center"
                        },
                        width:"100%",
                        items:[
                            {
                                itemId:"consume",
                                cls:"user-action-bottom-left",
                                flex:1,
                                xtype:"button",
                                text:"会员结账"
                            },
                            {
                                itemId:"withdraw",
                                cls:"user-action-bottom-right",
                                flex:1,
                                xtype:"button",
                                text:"提取现金"
                            }
                        ]
                    }
                ]
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