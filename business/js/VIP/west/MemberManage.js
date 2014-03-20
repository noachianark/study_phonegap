Ext.define('VIP.west.MemberManage', {
	extend : 'Ext.panel.Panel',
	alias : [ 'widget.vipwestmembermanage' ],
	requires : [ 'VIP.member.MemberInfo','VIP.member.MemberDeposit',
			'VIP.member.MemberWithdraw','VIP.shopping.QuickConsume','VIP.member.PortionExchange'],
	title : '会员管理',
	iconCls : 'west-membermanage',
	defaults : {
		xtype : 'link'
/*		icon : 'images/member_management.png'*/
	},
	layout : {
		type : 'vbox',
		align : 'stretch'
	},

	createItems : function() {
		var me = this;
		var handler = function(link) {
			me.handleAction.call(me, link.text,link.itemId);
		};
		var items = [{
			text : '会员档案',
			icon : 'images/member_info-16.png',
			itemId : 'member',
			handler : handler
		}, {
			text : '充值',
			icon : 'images/deposit-16.png',
			itemId : 'deposit',
			handler : handler
		},{
			text : '取款',
			icon : 'images/withdraw.png',
			itemId : 'withdraw',
			handler : handler
		}, {
			text : '消费',
			icon : 'images/consume-16.png',
			itemId : 'consume',
			handler : handler
		},{
			text : '积分兑换',
			icon : 'images/Coin256.png',
			itemId : 'integral',
			handler : handler
			
		} ];
		return items;
	},

	initComponent : function() {
		Ext.apply(this, {
			items : this.createItems()
		});
		this.callParent(arguments);
	},

	handleAction : function(action,itemId) {
		var me = this;
		vip.viewport.main.removeAll();
		me.up().changeLink(itemId);
		if (action == '会员档案') {
			for(var i = 0 ; i<window.account.actionCodes.length;i++){
				if(window.account.actionCodes[i]=="Member_View"){
					vip.viewport.main.add({
						xtype : 'vipmembermemberinfo',
						title : action
					});
				}
			}
		} else if (action == '充值') {
			
			for(var i = 0 ; i<window.account.actionCodes.length;i++){
				if(window.account.actionCodes[i]=="Deposit_Edit"){
					vip.viewport.main.add({
						xtype : 'memberdeposit',
						title : action
					});
				}
			}
		} else if (action == '取款') {
			
			for(var i = 0 ; i<window.account.actionCodes.length;i++){
				if(window.account.actionCodes[i]=="Withdraw_Edit"){
					vip.viewport.main.add({
						xtype : 'memberwithdraw',
						title : action
					});
				}
			}		
		}else if(action == '消费'){
			
			for(var i = 0 ; i<window.account.actionCodes.length;i++){
				if(window.account.actionCodes[i]=="Consume_Edit"){
					vip.viewport.main.add({
						xtype : 'quickconsume',
						title : action
					});
				}
			}
		}else if(action == '积分兑换'){
			vip.viewport.main.add({
				xtype : 'portionexchange',
				title : action
			});
		}
	}
});