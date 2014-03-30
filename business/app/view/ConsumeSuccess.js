/**
 * @class Business.view.ConsumeSuccess
 * @extends extendsClass
 * Description
 */
Ext.define('Business.view.ConsumeSuccess', {
    extend: 'Ext.Container',
    alias:'widget.consumesuccess',

    config: {
    	cls:'consumesuccess',
    	fullscreen:true,
        title:'会员结账',
        layout:{
        	type:'vbox'
        },
        items:[
        	{
        		xtype:'label',
        		cls:'consume-label-success'
        	},
        	{
        		xtype:'label',
        		cls:'consume-label-username',
        		itemId:'consume-username',
        		tpl:'消费会员：{username}'
        	},
        	{
        		xtype:'label',
        		itemId:'consume-balance',
        		cls:'consume-label-balance',
        		tpl:'账户余额：{balance}'
        	},
        	{
        		xtype:'label',
        		itemId:'consume-consume',
        		cls:'consume-label-consume',
        		tpl:'消费金额：{consume}'
        	},
        	{
        		xtype:'button',
        		text:'返回',
        		itemId:'returnBtn'
        	}
        ]
    }
});