/**
 * @class Business.view.Profile
 * @extends Ext.Container
 * Description
 */
Ext.define('Business.view.Profile', {
    extend: 'Ext.Container',
    alias:'widget.profile',
    requires: [
        
    ],

    config: {
        cls:'business-profile',
        fullscreen:true,
        layout:'vbox',
        items:[
        	{
        		xtype:'container',
        		layout:'hbox',
        		cls:'profiles',
        		items:[
        			{
						cls:'business-logo-inner',
        				html:'<span class="business-logo"></span>'
        			},
        			{
        				xtype:'container',
        				layout:{
        					type:'vbox'
        				},
        				flex:1,
        				items:[
                            {
                                xtype:'label',
                                itemId:'shopName',
                                html:"<span class='business-shop-label'>您隶属于 : 总店</span>"
                            },    
                            {
                                flex:1,
                                xtype:'container',
                                cls:'business-profile-info',
                                layout:{
                                    type:'hbox',
                                    pack:'center',
                                    align:'center'
                                },
                                defaults:{
                                    xtype:"component"
                                },
                                items:[                            
                                    {
                                        itemId:'members',
                                        flex:1,
                                        xtype:'label',
                                        cls:'business-account-info',
                                        tpl:"<span class='user-account-number'>{members}</span><br><span class='user-account-info-label'>会员数</span>"
                                    },
                                    {
                                        itemId:'coupons',
                                        flex:1,
                                        xtype:'label',
                                        cls:'business-account-info',
                                        tpl:"<span class='user-account-number'>{coupons}</span><br><span class='user-account-info-label'>优惠</span>"
                                    },
                                    {
                                        itemId:'news',
                                        flex:1,
                                        xtype:'label',
                                        cls:'business-account-info',
                                        tpl:"<span class='user-account-number'>{news}</span><br><span class='user-account-info-label'>新闻</span>"
                                    },
                                    {
                                        itemId:'shops',
                                        flex:1,
                                        xtype:'label',
                                        cls:'business-account-info',
                                        tpl:"<span class='user-account-number'>{shops}</span><br><span class='user-account-info-label'>店铺</span>"
                                    }
                                ]
                            }
        				]
        			}
        		]
        	},
            {
                xtype:'tabpanel',
                tabBarPosition:'top',
                flex:1,
                cls:'business-tab-panel',
                items:[
                    {
                        xtype:'panel',
                        scrollable : {
                            direction     : 'vertical',
                            directionLock : true
                        },
                        title:'基本信息',
                        itemId:'description',
                        margin:10,
                        tpl:'<img src={img} style="width:100%;">'+
                            '<p style="text-indent:2em;">{desc}</p><br>'+
                            '<p>联系电话：{telephone}</p>'
                    },
                    {
                        xtype:'carousel',
                        title:'店铺图集',
                        itemId:'pictures',
                        margin:10
                    },
                    {
                        xtype:'panel',
                        scrollable : {
                            direction     : 'vertical',
                            directionLock : true
                        },                        
                        title:'会员说明',
                        itemId:'offer',
                        margin:10,
                        tpl:'<p style="text-indent:2em;">{offer}</p>'
                    }
                ]
            }            
        ]
    }
});