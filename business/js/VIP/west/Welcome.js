Ext.define('VIP.west.Welcome', {
	extend : 'Ext.panel.Panel',
	alias : [ 'widget.vipwestwelcome' ],
	requires : ['VIP.widget.Link', 'VIP.welcome.Summary'],
	title : '欢迎',
	collapsible : false,
	iconCls : 'west-welcome',
	defaults : {
		xtype : 'link'
	},
	layout : {
		type : 'vbox',
		align: 'stretch'
	},
	
	createItems : function(){
		var me = this;
		var handler = function(link){
			me.handleAction.call(me, link.text,link.itemId);
		};
		var items = [{
			text : '信息汇总',
			icon : 'images/star.png',
			itemId : 'welcome',
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
	
	handleAction : function(action,itemId){
		var me = this;
		vip.viewport.main.removeAll();
		me.up().changeLink(itemId);
		if (action == '信息汇总') {
			
			vip.viewport.main.add({
				xtype : 'welcomesummary'
			});
		} 
	}
});