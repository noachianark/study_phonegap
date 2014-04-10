/**
 * @class Business.view.Consume
 * @extends Ext.Container
 * Description
 */
Ext.define('Business.view.Consume', {
    extend: 'Ext.Panel',
    alias:'widget.consumepanel',
    requires:[
        'Ext.field.Number'
    ],
    config: {
    	autoDestroy:true,
        cls:'consume',
        title:'会员结账',
        layout:'vbox',
        items:[
        	{
        		xtype:'formpanel',
        		flex:1,
        		items:[
        			{
        				xtype:'container',
        				margin:10,
        				style:{
        					background:'rgba(235,235,235,1)'
        				},
        				items:[
				        	{
				        		xtype:'fieldset',
								margin:"0 15",			        		
				        		items:[
				        			{
				        				xtype:'numberfield',
				        				itemId:'consumefield',
				        				name:'consumes',
				        				label:'消费金额',
				        				clearIcon:false
				        			}
				        		]
				        	},
							{
								margin:"0 15",
								// xtype:'label',
								itemId:'discount',
								//tpl:'折扣比：{discount}%'
								xtype:'textfield',
								label:'折扣比例',
								name:'discount',
								disabled :true,
								disabledCls:null,
								clearIcon:false
							},
							{
								margin:"0 15",
								//xtype:'label',
								itemId:'payfor',
								cls:'payfor',
								//tpl:'应付金额：￥{payfor}元'
								xtype:'textfield',
								label:'应付金额',
								disabled:true,
								disabledCls:null,
								clearIcon:false
							},
							{
								margin:"0 15",
								xtype:'fieldset',
								items:[
									{
										xtype:'numberfield',
										itemId:'cardpayfield',
										name:'cardpay',
										label:'余额支付',
										clearIcon:false
									}
								]
							},
							{
								margin:"0 15",
								xtype:'fieldset',
								items:[
									{
										xtype:'numberfield',
										itemId:'cashpayfield',
										name:'cashpay',
										label:'现金支付',
										clearIcon:false
									}
								]
							},
							{
								margin:"0 15",
								//xtype:'label',
								xtype:'textfield',
								itemId:'changeAmount',
								// tpl:'找余金额{change}'
								clearIcon:false,
								disabledCls:null,
								disabled:true,
								label:'找余金额'
							},
							{
								margin:"15 15",
								xtype:'label',
								itemId:'credit',
								style:'color:#b1b1b1;font-size:12px;',
								tpl:'完成支付获得积分<span style="color:#00a8ff;">{credit}<span>分'
							},
							{
								margin:"15 15",
								xtype:'label',
								itemId:'balance',
								style:'color:#b1b1b1;font-size:12px;',
								tpl:'支付完毕后账户余额<span style="color:#f54949;">￥{balance}</span>'
							}
        				]
        			}
        		]
        	},
			{
				xtype:"button",
				itemId:'consume',
				text:"结账",
				margin:10,
				style:{
					'background':'rgba(255,255,255,0.25)',
					'border':'1px solid rgba(255,255,255,1)'
				}
			}
        ]
    }
});
















