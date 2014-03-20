Ext.define('VIP.member.DetailMain', {
	extend : 'Ext.tab.Panel',
	alias : [ 'widget.detailmain' ],
	requires : [ 'VIP.member.Detail', 'VIP.reports.ConsumeGrid', 'VIP.reports.DepositGrid', 'VIP.reports.WithdrawHistoryGrid' ],
	tabPosition : 'bottom',
	icon : 'images/basic_info.png',
	userId : null,
	marking : null,
	
	createView : function() {
		var me = this;

		var items = [ {
			xtype : 'detail',
			userId : this.userId,
			icon : 'images/basic_info.png',
			marking : me.marking,
			onSave : me.onSave,
			onLoad : me.onLoad,
			listeners : {
				activate : {
					fn : function(detail){
						detail.load(me.userId);
					},
					single : true
				}
			}
		}, {
			xtype : 'depositgrid',
			title : '充值记录',			
			userId : this.userId,
			autoLoad : false,
			listeners : {
				activate : {
					fn : function(grid){
						grid.refresh();
					},
					single : true
				}
			}
		}, {
			xtype : 'withdrawhistorygrid',
			title : '取款记录',			
			userId : this.userId,
			autoLoad : false,
			listeners : {
				activate : {
					fn : function(grid){
						grid.refresh();
					},
					single : true
				}
			}
		}, {
			xtype : 'consumegrid',
			title : '消费记录',			
			userId : this.userId,
			autoLoad : false,
			listeners : {
				activate : {
					fn : function(grid){
						grid.refresh();
					},
					single : true
				}
			}
		} ];

		return items;
	},
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView()
		});

		this.callParent(arguments);		
	}
});