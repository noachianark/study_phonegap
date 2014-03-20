Ext.define('VIP.Viewport', {
	extend : 'Ext.Viewport',
	alias : [ 'widget.vipviewport' ],
	requires : ['VIP.TopBar', 'VIP.Center'],
	layout : 'border',
	
	initComponent : function() {
		this.callParent(arguments);		
	},

	items : [ {
		xtype : 'viptopbar'
	}, {
		xtype : 'vipcenter'
	}]
});
