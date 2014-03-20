Ext.define('VIP.west.Configuration', {
	extend : 'Ext.panel.Panel',
	alias : [ 'widget.vipwestconfiguration' ],
	requires : [ 'VIP.operator.OperatorGrid', 'VIP.shop.ShopGrid', 'VIP.sms.AutoSendTemplate', 'VIP.security.OperatorRuleGrid',
			'VIP.system.MembershipTypeGrid','VIP.system.SystemSettings' ],
	title : '系统设置',
	iconCls : 'west-configuration',
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
			text : '系统参数设置',
			icon : 'images/system_management.png',
			itemId : 'system',
			handler : handler
		}, {
			text : '连锁分店管理',
			icon : 'images/shop_management.png',
			itemId : 'shop',
			handler : handler
		}, {
			text : '操作员管理',
			icon : 'images/operator_management.png',
			itemId : 'operator',
			handler : handler
		}, {
			text : '管理员角色设置',
			itemId : 'manageRole',
			icon : 'images/manage_role.png',
			handler : handler
		}, {
			text : '会员等级维护',
			itemId : 'level',
			icon : 'images/level_management.png',
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
		var me =this;
		vip.viewport.main.removeAll();
		me.up().changeLink(itemId);
		if(action == '系统参数设置'){
			vip.viewport.main.setContent({
				xtype : 'systemsettings'
			});
		}else if (action == '操作员管理') {
			OperatorAction.canList(function(result){
				if(result.success){
					vip.viewport.main.setContent({
						xtype : 'operatorgrid'
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});
			
		} else if (action == '连锁分店管理') {
			ShopAction.canList(function(result){
				if(result.success){
					vip.viewport.main.setContent({
						xtype : 'shopgrid'
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});
			
		} else if (action == '管理员角色设置') {
			OperatorRuleAction.canList(function(result){
				if(result.success){
					vip.viewport.main.setContent({
						xtype : 'operatorrulegrid'
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});
			
		} else if (action == '会员等级维护') {
			MembershipTypeAction.canList(function(result){
				if(result.success){
					vip.viewport.main.setContent({
						xtype : 'membershiptypegrid'
					});
				}else {
					Ext.Msg.error(result.message);
				}
			});
			
		}
	}
});