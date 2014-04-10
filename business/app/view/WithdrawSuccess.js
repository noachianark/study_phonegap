/**
 * @class Business.view.WithdrawSuccess
 * @extends Ext.Container
 * Description
 */
Ext.define('Business.view.WithdrawSuccess', {
    extend: 'Ext.Container',
    alias:'widget.withdrawsuccess',
    requires: [
        
    ],

    config: {
        cls:'withdrawsuccess',
        fullscreen:true,
        title:'会员提现',
        layout:'vbox',
        items:[
            {
                xtype:'container',
                flex:1,
                items:[
                    xtype:'container',
                    style:{
                        background:'rgba(255,255,255,0.6)'
                    },
                    items:[
                        {
                            xtype:'container',
                            padding:'10vw 0 10vw 0',
                            items:[
                                {
                                    xtype:'container',
                                    layout:{
                                        type:'hbox',
                                        pack:'center',
                                        align:'center'
                                    },
                                    items:[
                                        {
                                            xtype:'label',
                                            cls:'success-tag'
                                        },
                                        {
                                            xtype:'label',
                                            html:'提现成功',
                                            margin:'0 0 0 10',
                                            cls:'withdraw-label-success'
                                        }
                                    ]
                                },
                                {
                                    xtype:'label',
                                    cls:'withdraw-label-success'
                                },
                                {
                                    xtype:'label',
                                    itemId:'withdraw-money',
                                    tpl:'提现金额：{money}'
                                },
                                {
                                    xtype:'label',
                                    cls:'withdraw-label-deposit',
                                    itemId:'withdraw-deposit',
                                    tpl:'账户余额{deposit}'
                                }
                            ]
                        }
                    ]
                ]
            },
        	{
        		xtype:'button',
        		text:'返回',
        		itemId:'returnBtn',
                margin:10,
                style:{
                    'background':'rgba(255,255,255,0.25)',
                    'border':'1px solid rgba(255,255,255,1)'
                }                     
        	}
        ]
    }
});