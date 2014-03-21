/**
 * @class Business.view.Charge
 * @extends Ext.Container
 * Description
 */
Ext.define('Business.view.Charge', {
    extend: 'Ext.form.Panel',
    alias:"widget.chargepanel",
    requires:[
        'Ext.field.Number'
    ],
    config: {
        cls:'charge',
        title:'会员充值',
        items:[
        	{
        		xtype:"fieldset",
        		items:[
					{
					    xtype: 'numberfield',
                        itemId:'chargefield',
					    name: 'charges',
					    label: '充值金额'
					}      			
        		]
        	},
        	{
        		xtype:"container",
        		layout:{
        			type:"vbox",
        			pack:"center",
        			align:"center"
        		},
        		items:[
        			{
        				xtype:"container",
        				layout:{
        					type:"hbox",
        					pack:"center",
        					align:"center"
        				},
        				width:'100%',
        				items:[
		        			{
		        				cls:"fast-charge",
		        				action:"fast",
		        				flex:1,
		        				xtype:"button",
		        				text:"￥50",
		        				data:50
		        			},
		        			{
		        				cls:"fast-charge",
		        				action:"fast",
		        				flex:1,
		        				xtype:"button",
		        				text:"￥100",
		        				data:100
		        			},
		        			{
		        				cls:"fast-charge",
		        				action:"fast",
		        				flex:1,
		        				xtype:"button",
		        				text:"￥200",
		        				data:200
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
        				width:'100%',
        				items:[
							{
								cls:"fast-charge",
								action:"fast",
								flex:1,
		        				xtype:"button",
		        				text:"￥300",
		        				data:300
		        			},
		        			{
		        				cls:"fast-charge",
		        				action:"fast",
		        				flex:1,
		        				xtype:"button",
		        				text:"￥500",
		        				data:500
		        			},
		        			{
		        				cls:"fast-charge",
		        				action:"fast",
		        				flex:1,
		        				xtype:"button",
		        				text:"￥1000",
		        				data:1000
		        			}
        				]
        			}
        			
        		]
        	},
        	{
        		xtype:"fieldset",
        		items:[
					{
					    xtype: 'textfield',
					    name: 'notes',
					    label: '备注'
					}      			
        		]
        	},
        	{
                itemId:'balanceBefore',
        		xtype:"label",
        		tpl:"充值前卡内余额：￥{before}"
        	},
        	{
                itemId:'balanceAfter',
        		xtype:"label",
        		tpl:"充值后卡内余额：￥{after}"
        	},
        	{
        		xtype:"button",
        		text:"马上充值",
                itemId:"charge"
        	}
        ]
    }
});