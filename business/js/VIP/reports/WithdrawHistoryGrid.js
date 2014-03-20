Ext.define('VIP.reports.WithdrawHistoryGrid', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.withdrawhistorygrid' ],
	requires : [ 'VIP.reports.model.WithdrawHistory' ],
	layout : 'fit',
	iconCls : 'icon-member-withdraw',
	icon : 'images/withdraw_list.png',
	userId : null,
	createStore : function() {
		var store = Ext.create('VIP.reports.store.WithdrawHistory', {
			autoLoad : this.autoLoad != false
		});
		var params = store.getProxy().extraParams;
		if (!params) {
			params = {};
			store.getProxy().extraParams = params;
		}
		if (window.account.businessId != null) {
			params.businessId = window.account.businessId;
		}
		if (this.userId != null) {
			params.userId = this.userId;
		}
		if (window.account.shopId != null) {
			params.shopId = window.account.shopId;
		}
		return store;
	},
	createDockedItems : function(store) {
		var me = this;
		var topBars = [{
			xtype : 'vipform',	
			defaults : {
				border : false
			},
			items : [{
				xtype : 'toolbar',
				dock : 'top',
				hidden : !!this.userId,
				items : [ {
					xtype : 'textfield',
					fieldLabel : '会员号',
					emptyText : '请扫描会员身份二维码',
					labelWidth : 40,
					width : 250,
					margin : '0 5 0 5',
					inputType : 'password',
					itemId : 'userQrString',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '会员昵称',
					emptyText : '会员昵称',
					labelWidth : 60,
					width : 180,
					margin : '0 5 0 5',
					itemId : 'userName',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}]
			}, {
				xtype : 'toolbar',
				dock : 'top',
				items : [ {
					xtype : 'datefield',
					itemId : 'start_date',
					fieldLabel : '取款时间',
					emptyText : '开始时间',
					labelWidth : 60,
					vtype : 'daterange',
					maxValue: new Date(),
					endDateField : 'end_date',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'label',
					text : '至'
				}, {
					xtype : 'datefield',
					itemId : 'end_date',
					emptyText : '结束时间',
					vtype : 'daterange',
					maxValue: new Date(),
					startDateField : 'start_date',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '单号',
					labelWidth : 30,
					width : 220,
					emptyText : '请扫描或输入取款单号二维码',
					itemId : 'transactionNumber',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doSearch();
								}
							},
							delay : 200
						}
					}
				},{

					xtype : 'button',
					icon : 'images/search-16.png',
					text : '搜索',
					handler : function() {
						me.doSearch();
					}
				}, '->'/*, {
					xtype : 'button',
					icon : 'images/excel-16.png',
					text : '导出'
				}*/, '-', {
					xtype : 'button',
					icon : 'images/print.png',
					text : '打印',
					itemId : 'print',
					disabled : true,
					handler : function() {
						var data = me.getSelectionModel().selected.getAt(0).data;
						me.doPrint(data.id);
					}
				} ]
			}]
		}];

		var bottomBar = {
			dock : 'bottom',
			xtype : 'pagingtoolbar',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"
		};

		return topBars.concat(bottomBar);
	},

	createColumns : function() {
		var me = this;
		var columns = [{
	        xtype: 'rownumberer',
	        width: 50,
	        align : 'center',
	        text:'序列',
	        sortable: false
		},  {
			dataIndex : 'transactionNumber',
			text : '取款单号',
			flex : 1
		}];
		var names = [{
			dataIndex : 'userName',
			text : '会员昵称',
			flex : 1
		}];
		var column = [{
			dataIndex : 'amount',
			text : '取款金额(元)',
			flex : 1
		},{
			text : '卡内余额(元)',
			dataIndex : 'currentDeposit',
			flex : 1	
		}, {
			dataIndex : 'time',
			text : '取款时间',
			flex : 1
		}, {
			dataIndex : 'shopName',
			text : '取款店铺',
			flex : 1,
			renderer : function(value, metaData,record ) {
				var state = record.raw.shopState;
				if(state=='1'){
	/*				metaData.style = 'color:#0F0';*/
					return value;
				}else if(state=='0'){
					metaData.style = 'color:#00F';
					return value+"　【已冻结】";
				}else if(state=='-2'){
					metaData.style = 'color:#F00';
					return value+"　【已注销】";
				}else {
					return value;
				}
			}
		}, {
			dataIndex : 'operatorName',
			text : '操作员',
			flex : 1
		}];
		if(me.userId==null){
			return columns.concat(names).concat(column);
		}else{
			return columns.concat(column);
		}
	},

	initComponent : function() {
		var store = this.createStore();
		Ext.apply(this, {
			store : store,
			dockedItems : this.createDockedItems(store),
			columns : this.createColumns()
		});
		store.on('load', function(){
			var result = this.getStore().getProxy().getReader().rawData;
			
			if(!result.success){
				Ext.Msg.error(result.message);
			}
		},this);
		this.on('selectionchange', this.onSelectChange, this.onSelectChange.scope);
		this.on('itemdblclick', this.reportInfo, this);
		this.callParent(arguments);
	},
	reportInfo : function(){
		var me = this;
		var record = me.getSelectionModel().getSelection()[0].raw;
		var reportInfo = Ext.create('VIP.reports.WithdrawInfo', {
			params : {
				record : record
			},
			onSave : {
				fn : me.refresh,
				scope : me
			}
		});
		
		reportInfo.show();
	},
	onSelectChange : function(grid, selected, eOpts) {
		if (selected.length != 0) {
			this.down("#print").enable();
		} else {
			this.down("#print").setDisabled(true);
		}
	},
	doPrint : function(id) {
		Ext.create('VIP.common.PrintWindow', {
			title : '打印预览',
			modal : true,
			frame : true,
			url : 'print/withdraw.jsp?id=' + id
		}).show();

	},
	doSearch : function() {
		var me = this;
		var transactionNumber = this.down('#transactionNumber').getSubmitValue();
		var startDate = this.down('#start_date').getSubmitValue();
		var endDate = this.down('#end_date').getSubmitValue();
		/*var userName = this.down('#userName').getSubmitValue();*/
		var userName = this.down('#userName').getSubmitValue();
		var userQrString = this.down('#userQrString').getSubmitValue();
		var params = this.getStore().getProxy().extraParams;
		var form = this.down('vipform').getForm();
		
		if (form.isValid()) {
			if (transactionNumber) {
				params.transactionNumber = transactionNumber;
			} else {
				params.transactionNumber = undefined;
			}
			if (startDate) {
				params.startDate = startDate;
			} else {
				params.startDate = undefined;
			}

			if (endDate) {
				params.endDate = endDate;
			} else {
				params.endDate = undefined;
			}

			/*if (userName != "") {
				params.userName = userName;
			} else {
				params.userName = undefined;
			}*/
			
			if (userName != "") {
				params.userName = userName;
			} else {
				params.userName = undefined;
			}
			if (userQrString != "") {
				params.userQrString = userQrString;
			} else {
				params.userQrString = undefined;
			}
			me.down('#transactionNumber').setValue();
			/*me.down('#start_date').setValue();
			me.down('#end_date').setValue();
			me.down('#userName').setValue();
			me.down('#userName').setValue();*/
			me.down('#userQrString').setValue();
			this.getStore().loadPage(1);
		}
		
	},
	refresh : function() {
		this.getStore().reload();
	}
});