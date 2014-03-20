Ext.define('VIP.reports.ConsumeGrid', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.consumegrid' ],
	requires : [ 'VIP.reports.store.ConsumeHistory' ],
	icon : 'images/consume_list.png',

	userId : null,
	createStore : function() {
		var store = Ext.create('VIP.reports.store.ConsumeHistory', {
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
		var topBars = [ {
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
			},
			{
				xtype : 'toolbar',
				dock : 'top',
				items : [{
					xtype : 'datefield',
					itemId : 'start_date',
					vtype : 'daterange',
					fieldLabel : '消费时间',
					emptyText : '开始时间',
					labelWidth : 60,
					maxValue:new Date(),
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
					vtype : 'daterange',
					emptyText : '结束时间',
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
					emptyText : '请扫描或输入消费单号二维码',
					itemId : 'transactionNumber',
					width : 220,
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
				}, '->','-', {
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
		var columns = [ {
	        xtype: 'rownumberer',
	        width: 50,
	        align : 'center',
	        text:'序列',
	        sortable: false
		}, {
			text : '订单号',
			dataIndex : 'transactionNumber',
			flex : 1
		}, {
			text : '内容',
			dataIndex : 'consumeSubject',
			flex : 1,
			sortable : false
		}];
		var names = [{
			text : '会员昵称',
			dataIndex : 'userName',
			flex : 1
		}];
		var column = [{
			text : '消费金额(元)',
			dataIndex : 'consumptionAmount',
			flex : 1
		},{
			text : '应付金额(元)',
			dataIndex : 'accountPayable',
			flex : 1
		}, {
			text : '折扣金额(元)',
			dataIndex : 'discount',
			flex : 1
		},{
			text : '卡支付(元)',
			dataIndex : 'cardPayment',
			flex : 1
		}, {
			text : '现金支付(元)',
			dataIndex : 'cashPayment',
			flex : 1
		}, {
			text : '找零(元)',
			dataIndex : 'changeAmount',
			flex : 1
		}, {
			text : '卡内余额(元)',
			dataIndex : 'currentDeposit',
			flex : 1
		}, {
			text : '消费时间',
			dataIndex : 'time',
			flex : 2
		}, {
			text : '消费店铺',
			dataIndex : 'shopName',
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
			text : '操作员',
			dataIndex : 'operatorName',
			flex : 1
		}];
		if(me.userId==null){
			return columns.concat(names).concat(column);
		}else{
			return columns.concat(column);
		}
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
			url : 'print/consume.jsp?id=' + id
		}).show();

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
	refresh : function() {
		this.getStore().reload();
	},
	reportInfo : function(){
		var me = this;
		var record = me.getSelectionModel().getSelection()[0].raw;
		var reportInfo = Ext.create('VIP.reports.ConsumeInfo', {
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
	doSearch : function() {
		var me = this;
		var transactionNumber = this.down('#transactionNumber').getSubmitValue();
		var startDate = this.down('#start_date').getSubmitValue();
		var endDate = this.down('#end_date').getSubmitValue();
		var userName = this.down('#userName').getSubmitValue();
		var userQrString = this.down('#userQrString').getSubmitValue();
		var form = this.down('vipform').getForm();
		var params = this.getStore().getProxy().extraParams;
		
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
			me.down('#userQrString').setValue();
			this.getStore().loadPage(1);
		}
		
	}
});