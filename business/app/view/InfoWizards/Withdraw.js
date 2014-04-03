/**
 * @class Business.view.Withdraw
 * @extends Ext.Container
 * Description
 */
Ext.define('Business.view.Withdraw', {
    extend: 'Ext.Container',
    alias:'widget.withdraw',
    requires: [
        
    ],

    config: {
        cls:'withdraw',
        title:'会员取款',
        items:[
        	{
        		xtype:'container',
        		layout:'vbox',
        		flex:1,
        		items:[
        			{
        				xtype:'numberfield',
        				itemId:'withdrawfield',
        				name:'withdraw',
        				label:'提现'
        			},
        			{
        				xtype:'label',
        				tpl:'账户余额{deposit}',
        				itemId:'depositlabel'
        			},
        			{
        				xtype:'textfield',
        				itemId:'notefield',
        				name:'note',
        				label:'备注'
        			}
        		]
        	},
        	{
        		xtype:'button',
        		ui:'action',
        		itemId:'withdrawBtn',
        		text:'确认提现'
        	}
        ]
    }
});