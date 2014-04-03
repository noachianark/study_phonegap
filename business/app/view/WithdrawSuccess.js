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
        	},
        	{
        		xtype:'button',
        		text:'返回',
        		itemId:'returnBtn'
        	}
        ]
    }
});