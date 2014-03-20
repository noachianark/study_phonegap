Ext.define('VIP.west.Message', {
	extend : 'Ext.panel.Panel',
	alias : [ 'widget.vipwestmessage' ],
	title : '信息提醒',
	requires : [ 'VIP.message.CouponGrid','VIP.message.NewsGrid' ],
	iconCls : 'west-message',
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
			me.handleAction.call(me, link.text,link.itemId);
		};
		var items = [ {
			text : '促销信息',
			icon : 'images/promotion.png',
			itemId : 'message',
			hidden : window.localStorage.getItem('allowPublishCoupons')=="false",
			handler : handler
		},{
			text : '新闻动态',
			icon : 'images/promotion.png',
			itemId : 'news',
			hidden : window.localStorage.getItem('allowPublishMessages')=="false",
			handler : handler
		} ];
		return items;
	},

	initComponent : function() {
		Ext.apply(this, {
			items : this.createItems()
		});
		this.callParent(arguments);
	},

	handleAction : function(action,itemId) {
		var me =this;
		vip.viewport.main.removeAll();
		me.up().changeLink(itemId);
		if (action == '促销信息') {
			
			for(var i = 0 ; i<window.account.actionCodes.length;i++){
				if(window.account.actionCodes[i]=="Offer_View"){
					vip.viewport.main.setContent({
						xtype : 'coupongrid',
						title : action
					});
				}
			}
			
		} else if (action == '新闻动态') {

			for(var i = 0 ; i<window.account.actionCodes.length;i++){
				if(window.account.actionCodes[i]=="News_View"){
					vip.viewport.main.setContent({
						xtype : 'newsgrid',
						title : action
					});
				}
			}
			
		}
	}
});