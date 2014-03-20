Ext.define('VIP.Center', {
	extend : 'Ext.panel.Panel',
	alias : [ 'widget.vipcenter' ],
	requires : ['VIP.west.Main', 'VIP.Main'],
	id : 'main_center',
	region : 'center',
	layout : 'border',
	border : false,
	defaults : {
		
	},
	items : [{
		xtype : 'vipwestmain'
	}, {
		xtype : 'vipmain'
	}],

	initComponent : function() {
		this.callParent(arguments);
	}
});