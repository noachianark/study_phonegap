/**
 * @class Business.view.ChargeSuccess
 * @extends extendsClass
 * Description
 */
Ext.define('Business.view.ChargeSuccess', {
	extend:'Ext.Container',
	alias:'widget.chargesuccess',
    config: {
        cls:'chargesuccess',
        fullscreen:true,
        title:'会员充值',
        layout:{
        	type:'vbox'
        },
        items:[
        	{
        		xtype:'label',
        		cls:'charge-label-success'
        	},
        	{
        		xtype:'label',
        		cls:'charge-label-username',
        		itemId:'charge-username',
        		tpl:'充值会员{username}'
        	},
        	{
        		xtype:'label',
        		itemId:'charge-balance',
        		cls:'charge-label-balance',
        		tpl:'账户余额{balance}'
        	},
        	{
        		xtype:'button',
        		text:'返回',
        		itemId:'returnBtn'
        	}
        ]
    }
});