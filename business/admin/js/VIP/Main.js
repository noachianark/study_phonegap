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
	items : [/*{
		xtype:'panel',
		title:'魔客会员',
		closable :false,
		html:'<iframe src="http://www.vipmonk.com" width="100%" height="100%"></iframe>'
	}*/],

	initComponent : function() {
		this.callParent(arguments);
	},
	
	setContent : function(component){
		this.removeAll();
		this.add(component);
	}
});