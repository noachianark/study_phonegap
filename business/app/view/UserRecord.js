/**
 * @class Business.controller.UserRecord
 * @extends Ext.Panel
 * Description
 */
Ext.define('Business.controller.UserRecord', {
    extend: 'Ext.Panel',
    requires: [
        
    ],

    config: {
        cls:'user-records',
        title:'历史记录',
        fullscreen:true,
        layout:'vbox',
        items:[
        	{
        		xtype:'toolbar',
        		docked:'top',
        		centerd:true,
	        	items:[
	        		{
	        			xtype:'segmentedbutton',
	        			itemId:'segment',
	        			width:'100%',
	        			allowMultiple: false,
	        			allowDepress: false,
	        			layout:{
	        				pack:'center'
	        			},
	        			items:[
							{
							    text: '消费记录',
							    itemId:'consume',
							    pressed: true
							},
							{
							    text: '充值记录',
							    itemId:'deposit'
							},
							{
								text:'提现记录',
								itemId:'withdraw'
							}
	        			]
	        		}
	        	]
        	},
        	{
        		xtype:'panel',
        		layout:{
        			type:'card'
        		},
        		flex:1,
        		items:[
        			{
        				xtype:'container',
        				itemId:'consumelist'
        				items:[
        					{
        						html:'消费记录'
        					}
        				]
        			},
        			{
        				xtype:'container',
        				itemId:'depositlist'
        				items:[
        					{
        						html:'存款记录'
        					}
        				]        				
        			},
        			{
        				itemId:'withdrawlist',
        				xtype:'container',
        				items:[
        					{
        						html:'取款记录'
        					}
        				]        				
        			}
        		]
        	}
        ]
    }
});