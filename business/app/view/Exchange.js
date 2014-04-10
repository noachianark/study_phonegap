/**
 * @class Business.view.Exchange
 * @extends extendsClass
 * Description
 */
Ext.define('Business.view.Exchange', {
    extend: 'Ext.Container',
    alias:'widget.exchange',
    config: {
    	cls:'exchange',
    	title:'积分兑换',
    	fullscreen:true,
    	layout:'vbox',
        items:[
	        {
	        	xtype:'toolbar',
	        	docked:'top',
	        	centered:true,
	        	items:[
	        		{
	        			xtype:'segmentedbutton',
	        			itemId:'segment',
	        			cls:'segmentedbutton',
	        			width:'100%',
	        			allowMultiple: false,
	        			allowDepress: false,
	        			layout:{
	        				pack:'center'
	        			},
	        			items:[
							{
							    text: '兑换现金',
							    itemId:'cash',
							    pressed: true
							},
							{
							    text: '兑换礼品'
							},
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
	        	cardSwitchAnimation:'slide',
	        	items:[
	        		{
	        			xtype:'container',
	        			itemId:'exchangemoney',
	        			flex:1,
	        			items:[
					        {
					        	itemId:'pointInfo',
					        	xtype:'label',
					        	tpl:'当前积分：{point},最多可兑换{money}元'
					        },
					        {
					        	itemId:'pointField',
					        	xtype:'numberfield',
					        	name:'point'
					        },
					        {
					        	xtype:'label',
					        	html:'可兑换'
					        },
					        {
					        	xtype:'label',
					        	itemId:'moneyLabel',
					        	tpl:'<span>￥</span>{money}<span>元</span>'
					        },
					        {
					        	itemId:'noteField',
					        	xtype:'textfield',
					        	name:'note'
					        },
					        {
					        	itemId:'afterLabel',
					        	tpl:'兑换后积分剩余:{after}'
					        }
	        			]
	        		},
	        		{
	        			xtype:'container',
	        			flex:1,
	        			items:[
	        				{
	        					html:'sadasdasd'
	        				}
	        			]
	        		}
	        	]
	        },
	        {
	        	xtype:'button',
	        	text:'兑换',
	        	itemId:'exchange',
                margin:10,
                style:{
                    'background':'rgba(255,255,255,0.25)',
                    'border':'1px solid rgba(255,255,255,1)'
                }
	        }

        ]
    }
});