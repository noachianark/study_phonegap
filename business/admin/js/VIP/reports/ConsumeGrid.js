Ext.define('VIP.reports.ConsumeGrid', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.consumegrid' ],
	requires : [ 'VIP.reports.store.ConsumeHistory' ],

	createStore : function() {
		var store = Ext.create('VIP.reports.store.ConsumeHistory');
		var params = store.getProxy().extraParams;
		if (!params) {
			params = {};
			store.getProxy().extraParams = params;
		}

		if (window.account.businessId != null) {
			params.businessId = window.account.businessId;
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
				items : [{
					xtype : 'datefield',
					itemId : 'start_date',
					vtype : 'daterange',
					fieldLabel : '消费时间',
					emptyText : '开始时间',
					margin : '0 0 0 20',
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
					xtype : 'vcombo',
					fieldLabel : '店铺',
					labelWidth : 30,
					width: 200,
					margin : '0 5 0 10',
					emptyText : '选择店铺',
					itemId : 'shopId',
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'ShopAction.listAsOption',												
							extraParams : {
								allowBlank : true,
								blankText : '全部',
								businessId : window.account.businessId
							}
						};
					}
					
				},{
					xtype : 'button',
					icon : 'images/search-16.png',
					text : '搜索',
					handler : function() {
						me.doSearch();
					}
				}]	
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
			flex : 1
		},{
			text : '会员昵称',
			dataIndex : 'userName',
			flex : 1
		},{
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
		return columns;
		
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
		this.callParent(arguments);
	},
	refresh : function() {
		this.getStore().reload();
	},
	doSearch : function() {
		var me = this;
		var startDate = this.down('#start_date').getSubmitValue();
		var endDate = this.down('#end_date').getSubmitValue();
		var shopId = this.down('#shopId').getSubmitValue();
		var form = this.down('vipform').getForm();
		var params = this.getStore().getProxy().extraParams;
		
		if (form.isValid()) {
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
			if (shopId != ""){
				params.shopId = shopId;
			}else{
				params.shopId = undefined;
			}
			this.getStore().loadPage(1);
		}
		
	}
});