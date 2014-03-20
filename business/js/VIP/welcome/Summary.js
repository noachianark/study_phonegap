Ext.define('VIP.welcome.Summary', {
	extend : 'Ext.panel.Panel',
	alias : [ 'widget.welcomesummary' ],
	requires : [],
	title : '信息汇总',
	iconCls : 'icon-member-welcome',
	layout : {
		type : 'table',
		columns : 2
	},
	defaults : {
		margin : 10
	},
	items : [],
	createDockedItems : function(store) {
		var me = this;
		var topBars = [];

		return topBars;
	},
	initComponent : function() {
		this.callParent(arguments);
	}
});