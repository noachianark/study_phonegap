Ext.define('VIP.west.ShoppingManage', {
	extend : 'Ext.panel.Panel',
	alias : [ 'widget.vipwestshoppingmanage' ],
	requires:['VIP.shopping.QuickConsume'],
	title : '消费管理',
	iconCls: 'west-shoppingmanage',
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
			me.handleAction.call(me, link.text);
		};
		var items = [{
			text : '消费',
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
	
	handleAction : function(action){
		if (action == '消费') {
			vip.viewport.main.setContent({
				xtype : 'quickconsume'
			});
		}
	}
});