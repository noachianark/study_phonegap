Ext.define('VIP.reports.DepositGrid', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.depositgrid' ],
	requires : [ 'VIP.reports.model.DepositHistory' ],
	
	createStore : function() {
		var store = Ext.create('VIP.reports.store.DepositHistory');
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
		var topBars = [{
			xtype : 'vipform',	
			defaults : {
				border : false
			},
			items : [{
				xtype : 'toolbar',
				dock : 'top',
				items : [ {
					xtype : 'datefield',
					itemId : 'start_date',
					vtype : 'daterange',
					fieldLabel : '充值时间',
					margin : '0 0 0 20',
					emptyText : '开始时间',
					labelWidth : 60,
					maxValue : new Date(),
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
					maxValue : new Date(),
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
				},  {
					xtype : 'vcombo',
					fieldLabel : '店铺',
					labelWidth : 30,
					emptyText : '选择店铺',
					margin : '0 5 0 10',
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
					},
					
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
		var columns = [{
	        xtype: 'rownumberer',
	        text:'序列',
	        align : 'center',
	        width: 50,
	        sortable: false
		},  {
			dataIndex : 'transactionNumber',
			text : '充值单号',
			flex : 1
		},{
			dataIndex : 'userName',
			text : '会员昵称',
			flex : 1
		},{
			dataIndex : 'realAmount',
			text : '充值金额(元)',
			flex : 1
		}, {
			dataIndex : 'rewardAmount',
			text : '赠送金额(元)',
			flex : 1
		}, {
			dataIndex : 'currentDeposit',
			text : '会员余额(元)',
			flex : 1
		}, {
			dataIndex : 'time',
			text : '充值时间',
			flex : 1
		}, {
			dataIndex : 'shopName',
			text : '充值店铺',
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
			dataIndex : 'operatorName',
			text : '操作人员',
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
	doSearch : function() {
		var me =this;
		var startDate = this.down('#start_date').getSubmitValue();
		var endDate = this.down('#end_date').getSubmitValue();
		var shopId = this.down('#shopId').getSubmitValue();
		var params = this.getStore().getProxy().extraParams;
		var form = this.down('vipform').getForm();
		
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
	},
	refresh : function() {
		this.getStore().reload();
	}
});