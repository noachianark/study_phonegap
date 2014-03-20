Ext.define('VIP.west.Reports', {
	extend : 'Ext.panel.Panel',
	alias : [ 'widget.vipwestreports' ],
	requires : [ 'VIP.reports.DepositGrid',
	             'VIP.reports.ConsumeGrid',
	             'VIP.reports.WithdrawHistoryGrid',
	             'VIP.reports.OperationLogGrid',
	             'VIP.reports.MemberGrid',
	             'VIP.reports.PortionGrid'
	             ],
	title : '统计报表',
	collapsible : false,
	iconCls : 'west-statistics',
	defaults : {
		xtype : 'link'
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
		var items = [ {
			text : '充值明细报表',
			icon : 'images/deposit_list.png',
			itemId : 'depositReports',
			handler : handler
		}, {
			text : '消费明细报表',
			icon : 'images/consume_list.png',
			itemId : 'consumeReports',
			handler : handler
		}, {
			text : '取款明细报表',
			icon : 'images/withdraw_list.png',
			itemId : 'withdrawReports',
			handler : handler
		}, {
			text : '会员信息报表',
			icon : 'images/member_list.png',
			itemId : 'memberReports',
			handler : handler
		}, {
			text : '积分明细报表',
			icon : 'images/Coin256.png',
			itemId : 'portiongrid',
			handler : handler
		}, {
			text : '操作日志报表',
			icon : 'images/log_list.png',
			itemId : 'logReports',
			handler : handler
		}];
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
		
		/*var items = ['depositReports','consumeReports','withdrawReports','memberReports','logReports'];
		for(var i = 0;i<items.length;i++){
			me.down('#'+items[i]).removeCls('link-visited');
		}*/
		me.up().changeLink(itemId);
		if (action == '充值明细报表') {
			for(var i = 0 ; i<window.account.actionCodes.length;i++){
				if(window.account.actionCodes[i]=="Deposit_View"){
					vip.viewport.main.setContent({
						xtype : 'depositgrid',
						title : action
					});
				}
			}
			
		} else if (action == '消费明细报表') {
			for(var i = 0 ; i<window.account.actionCodes.length;i++){
				if(window.account.actionCodes[i]=="Consume_View"){
					vip.viewport.main.setContent({
						xtype : 'consumegrid',
						title : action
					});
				}
			}
			
		}else if (action == '取款明细报表') {
			for(var i = 0 ; i<window.account.actionCodes.length;i++){
				if(window.account.actionCodes[i]=="Withdraw_View"){
					vip.viewport.main.setContent({
						xtype : 'withdrawhistorygrid',
						title : action
					});
				}
			}
			
		} else if (action == '操作日志报表') {	
			
			for(var i = 0 ; i<window.account.actionCodes.length;i++){
				if(window.account.actionCodes[i]=="OperationLog_View"){
					vip.viewport.main.setContent({
						xtype : 'operationloggrid',
						title : action
					});
				}
			}
			
		} else if (action == '会员信息报表') {
			for(var i = 0 ; i<window.account.actionCodes.length;i++){
				if(window.account.actionCodes[i]=="Member_View"){
					vip.viewport.main.setContent({
						xtype : 'reportmembergrid',
						title : action
					});
				}
			}
			
		} else if (action == '积分明细报表'){
			vip.viewport.main.setContent({
				xtype : 'portiongrid',
				title : action
			});
		}
	}
});