/**
 * @class Business.view.Withdraw
 * @extends Ext.Container
 * Description
 */
Ext.define('Business.view.Withdraw', {
    extend: 'Ext.Panel',
    alias:'widget.withdraw',
    requires: [
        
    ],

    config: {
        cls:'withdraw',
        title:'会员取款',
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
                                xtype:"container",
                                margin:'20 10 20 10',
                                items:[
                                    {
                                        xtype:'numberfield',
                                        itemId:'withdrawfield',
                                        name:'withdraw',
                                        label:'提现',
                                        clearIcon:false
                                    },
                                    {
                                        xtype:'label',
                                        style:'font-size:12px;text-align:right;',
                                        tpl:'账户余额:{deposit}',
                                        itemId:'depositlabel'
                                    },
                                    {
                                        xtype:'textfield',
                                        itemId:'notefield',
                                        name:'note',
                                        label:'备注',
                                        clearIcon:false
                                    }
                                ]
                            }

                        ]
                    }
        		]
        	},
            {
                xtype:'button',
                itemId:'withdrawBtn',
                text:'确认提现',
                margin:10,
                style:{
                    'background':'rgba(255,255,255,0.25)',
                    'border':'1px solid rgba(255,255,255,1)'
                }                
            }            
        ]
    }
});