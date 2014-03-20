Ext.define('VIP.Viewport', {
	extend : 'Ext.Viewport',
	alias : [ 'widget.vipviewport' ],
	requires : ['VIP.west.Main', 'VIP.Main','VIP.widget.form.Panel'],
	layout : 'border',
	
	items : [{
		xtype : 'vipwestmain'
	}, {
		xtype : 'vipmain'
	}],
	
	initComponent : function() {
		var me =this;
		
		this.callParent(arguments);
	}

});
