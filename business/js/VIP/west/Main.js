Ext.define('VIP.west.Main', {
	extend : 'Ext.panel.Panel',
	alias : [ 'widget.vipwestmain' ],
	requires : ['VIP.west.Welcome', 'VIP.west.MemberManage', 'VIP.west.ShoppingManage', 'VIP.west.Reports', 'VIP.west.SMSManage', 'VIP.west.Message', 'VIP.west.Configuration'],
	id : 'west',
	region : 'west',
	split : true,
	width : 210,
	title : '功能列表',
	item : null,
	titleCollapse : true,
	collapsible : true,
	collapsed : false,
	layout: {
        type: 'accordion',
        hideCollapseTool : true,
        titleCollapse: true,
        animate: true,
        multi: false
    },
	defaults : {
		autoScroll : true
	},
	items : [{
		xtype : 'vipwestwelcome'
	}, {
		xtype : 'vipwestmembermanage'
	}, {
		xtype : 'vipwestreports'
	}, {
		xtype : 'vipwestmessage',
		hidden : window.localStorage.getItem('allowPublishCoupons')=="false" && window.localStorage.getItem('allowPublishMessages')=="false"
	}],
	
	listeners : {
		render : function(panel){
			
		}
	},

	initComponent : function() {
		this.callParent(arguments);
	},
	
	changeLink : function(itemId){
		var me = this;
		if(me.item!=null){
			me.down('#'+me.item).removeCls('link-visited');
		}
		
		me.down('#'+itemId).addCls('link-visited');
		me.item = itemId;
		
		/*var items = ['welcome','deposit','consume','member','withdraw','depositReports','consumeReports','withdrawReports','memberReports','logReports'];
		for(var i = 0;i<items.length;i++){
			me.down('#'+items[i]).removeCls('link-visited');
		}*/
	}
});