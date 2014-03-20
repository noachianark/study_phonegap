Ext.define('VIP.west.SMSManage', {
	extend : 'Ext.panel.Panel',
	alias : [ 'widget.vipwestsmsmanage' ],
	requires : [ 'VIP.sms.StaticSmsContent', 'VIP.sms.AutoSendTemplate' ],
	title : '短信管理',
	iconCls : 'west-smsmanage',
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
			me.handleAction.call(me, link.text);
		};
		var items = [];
		return items;
	},

	initComponent : function() {
		Ext.apply(this, {
			items : this.createItems()
		});
		this.callParent(arguments);
	},

	handleAction : function(action) {

	}
});