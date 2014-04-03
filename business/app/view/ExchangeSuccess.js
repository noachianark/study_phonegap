/**
 * @class Business.view.ExchangeSuccess
 * @extends Ext.Container
 * Description
 */
Ext.define('Business.view.ExchangeSuccess', {
    extend: 'Ext.Container',
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
        		xtype:'label',
        		cls:'exchange-label-success'
        	},
        	{
        		xtype:'label',
        		itemId:'exchange-gain',
        		cls:'exchange-label-gain',
        		tpl:'兑换获得{gain}'
        	},
        	{
        		xtype:'label',
        		itemId:'exchange-point',
        		cls:'exchange-label-point',
        		tpl:'剩余积分{point}'
        	},
        	{
        		xtype:'button',
        		text:'返回',
        		itemId:'returnBtn'
        	}
        ]
    }
});