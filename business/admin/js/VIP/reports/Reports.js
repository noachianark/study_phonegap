Ext.define('VIP.reports.Reports', {
	extend : 'Ext.panel.Panel',
	alias : [ 'widget.reports' ],
	requires : ['VIP.reports.OperationLogGrid','VIP.reports.AdminLogGrid','VIP.reports.DepositGrid','VIP.reports.ConsumeGrid'
	            ,'VIP.reports.WithdrawHistoryGrid','VIP.reports.MemberGrid','VIP.reports.PortionGrid'],
	title : '报表管理',
	layout : 'fit',
	createView : function() {
		var me = this;

		var items = [{
			xtype : 'tabpanel',
			items : [{
				title : '营业报表',
				xtype : 'tabpanel',
				tabPosition: 'top',
				items : [{
					title : '存款明细报表',
					xtype : 'depositgrid',
					listeners : {
						activate : {
							fn : function(grid){
								grid.refresh();
							},
							single : true
						}
					}
				},{
					title : '消费明细报表',
					xtype : 'consumegrid',
					listeners : {
						activate : {
							fn : function(grid){
								grid.refresh();
							},
							single : true
						}
					}
				},{
					title : '取款明细报表',
					xtype : 'withdrawhistorygrid',
					listeners : {
						activate : {
							fn : function(grid){
								grid.refresh();
							},
							single : true
						}
					}
				},{
					title : '积分明细报表',
					xtype : 'portiongrid',
					listeners : {
						activate : {
							fn : function(grid){
								grid.refresh();
							},
							single : true
						}
					}
				},{
					title : '会员明细报表',
					xtype : 'membergrid',
					listeners : {
						activate : {
							fn : function(grid){
								grid.refresh();
							},
							single : true
						}
					}
				}]
			}, {
				title : '系统日志',
				xtype : 'tabpanel',
				tabPosition: 'top',
				items : [{
					title : '管理员日志',
					xtype : 'adminloggrid',
					listeners : {
						activate : {
							fn : function(grid){
								grid.refresh();
							},
							single : true
						}
					}
				},{
					title : '操作员日志',
					xtype : 'operationloggrid',
					listeners : {
						activate : {
							fn : function(grid){
								grid.refresh();
							},
							single : true
						}
					}
				}]
			}]
		}];

		return items;
	},
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView()
		});

		this.callParent(arguments);		
	}
});