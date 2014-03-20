Ext.define('VIP.Main', {
	extend : 'Ext.panel.Panel',
	alias : [ 'widget.vipmain' ],
	requires : [],
	id : 'main',
	region : 'center',
	layout : 'card',
	defaults : {
		border : false,
		closable : true
	},
	items : [{
		xtype : 'welcomesummary'		
	}],

	initComponent : function() {
		this.callParent(arguments);
	},
	
	setContent : function(component){
		this.removeAll();
		this.add(component);
	}
});