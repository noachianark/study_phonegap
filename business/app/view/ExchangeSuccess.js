/**
 * @class Business.view.ExchangeSuccess
 * @extends Ext.Container
 * Description
 */
Ext.define('Business.view.ExchangeSuccess', {
    extend: 'Ext.Panel',
    alias:'widget.exchangesuccess',
    requires: [
        
    ],

    config: {
    	cls:'exchangesuccess',
    	fullscreen:true,
        title:'积分兑换',
        layout:{
        	type:'vbox'
        },
        items:[
            {
                xtype:'formpanel',
                flex:1,
                items:[
                    {
                        xtype:'label',
                        cls:'exchange-label-success'
                    },
                    {
                        xtype:'label',
                        itemId:'exchange-gain',
                        cls:'exchange-label-gain',
                        style:'text-align:center;',
                        tpl:'兑换获得{gain}'
                    },
                    {
                        xtype:'label',
                        itemId:'exchange-point',
                        cls:'exchange-label-point',
                        style:'text-align:center;',
                        tpl:'剩余积分{point}'
                    }
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