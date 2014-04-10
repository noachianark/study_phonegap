/**
 * @class Business.view.Charge
 * @extends Ext.Container
 * Description
 */
Ext.define('Business.view.Charge', {
    extend: 'Ext.Panel',
    alias:"widget.chargepanel",
    requires:[
        'Ext.field.Number'
    ],
    config: {
        cls:'charge',
        title:'会员充值',
        layout:{
            type:'vbox'
        },
        items:[
            {
                xtype:'formpanel',
                flex:1,
                items:[
                    {
                        xtype:'container',
                        margin:10,
                        style:{
                            background:'rgba(255,255,255,0.6)'
                        },
                        items:[
                            {
                                xtype:"fieldset",
                                margin:'0 10',
                                items:[
                                    {
                                        xtype: 'numberfield',
                                        itemId:'chargefield',
                                        name: 'charges',
                                        label: '充值金额',
                                        cls:'charge-label',
                                        clearIcon:false
                                    }                                                
                                ]
                            },
                            {
                                itemId:'depositPayback',
                                xtype:'label',
                                tpl:'<span style="color:#449900;">赠送金额：￥{rebate}</span>',
                                style:'text-align:right;font-size:12px;',
                                margin:10
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
                                margin:'0 10',
                                items:[
                                    {
                                        xtype: 'textfield',
                                        name: 'notes',
                                        label: '备注',
                                        clearIcon:false
                                    }               
                                ]
                            },
                            {
                                itemId:'balanceBefore',
                                xtype:"label",
                                style:'font-size:12px;',
                                tpl:"充值前卡内余额：<span style='color:#ff0000;'>￥{before}</span>",
                                margin:10
                            },
                            {
                                itemId:'balanceAfter',
                                xtype:"label",
                                style:'font-size:12px;',
                                tpl:"充值后卡内余额：<span style='color:#ff0000;'>￥{after}</span>",
                                margin:10
                            }
                        ]
                    }
                ]
            },
            {
                xtype:"button",
                text:"马上充值",
                itemId:"charge",
                margin:10,
                style:{
                    'background':'rgba(255,255,255,0.25)',
                    'border':'1px solid rgba(255,255,255,1)'
                }
            }            
        ]
    }
});