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
	        	cardSwitchAnimation:'slide',
	        	items:[
	        		{
	        			xtype:'formpanel',
	        			itemId:'exchangemoney',
	        			flex:1,
	        			items:[
							{
					        	itemId:'pointInfo',
					        	xtype:'label',
					        	style:'text-align:center;',
					        	tpl:'当前积分：{point},最多可兑换{money}元'
					        },
					        {
					        	itemId:'pointField',
					        	xtype:'numberfield',
					        	name:'point',
					        	cls:'changefor',
					        	style:'text-align:center;font-size:10vw;',
					        	clearIcon:false
					        },
					        {
					        	xtype:'label',
					        	style:'text-align:center;',
					        	html:'可兑换'
					        },
					        {
					        	xtype:'label',
					        	itemId:'moneyLabel',
					        	style:'text-align:center;font-size:10vw;',
					        	tpl:'<span>￥</span>{money}<span>元</span>'
					        },
					        {
					        	itemId:'noteField',
					        	xtype:'textfield',
					        	name:'note',
					        	label:'备注',
					        	margin:20,
					        	cls:'notes',
					        	clearIcon:false
					        },
					        {
					        	xtype:'label',
					        	itemId:'afterLabel',
					        	style:'text-align:center;',
					        	tpl:'兑换后积分剩余:{after}'
					        }	        			
	        			]
	        		},
	        		{
	        			xtype:'formpanel',
	        			flex:1,
	        			items:[
							{
					        	itemId:'pointInfo2',
					        	xtype:'label',
					        	style:'text-align:center;',
					        	tpl:'当前积分：{point}'
					        },
					        {
					        	itemId:'pointField2',
					        	xtype:'numberfield',
					        	name:'point',
					        	cls:'changefor',
					        	style:'text-align:center;font-size:10vw;',
					        	clearIcon:false
					        },
					        {
					        	itemId:'noteField2',
					        	xtype:'textfield',
					        	name:'note',
					        	label:'兑换说明',
					        	margin:20,
					        	cls:'notes',
					        	clearIcon:false
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