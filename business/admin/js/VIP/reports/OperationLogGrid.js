Ext.define('VIP.reports.OperationLogGrid', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.operationloggrid' ],
	requires : [ 'VIP.reports.store.OperationLog' ],
	columns : [ {
        xtype: 'rownumberer',
        width: 50,
        text:'序列',
        align : 'center',
        sortable: false
	}, {
		text : '时间',
		dataIndex : 'time',
		flex : 2
		
	}, {
		text : '操作员',
		dataIndex : 'operatorName',
		flex : 1
	}, {
		text : '店铺名称',
		dataIndex : 'shopName',
		flex : 1
	}, {
		text : '操作内容',
		dataIndex : 'description',
		flex : 5
	} ],
	createStore : function() {
		var store = Ext.create('VIP.reports.store.OperationLog');
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
		var topBar = [{
			xtype : 'vipform',	
			defaults : {
				border : false
			},
			items : [ {
				xtype : 'toolbar',
				dock : 'top',
				items : [ {
					xtype : 'datefield',
					fieldLabel : '操作时间',
					emptyText : '开始时间',
					margin : '0 0 0 20',
					labelWidth : 60,
					itemId : 'start_date',
					vtype : 'daterange',
					maxValue:new Date(),
					endDateField : 'end_date'
				},{
					xtype : 'label',
					margin : '0 5 0 5',
					text : '至'
				}, {
					xtype : 'datefield',
					itemId : 'end_date',
					emptyText : '结束时间',
					vtype : 'daterange',
					maxValue: new Date(),
					startDateField : 'start_date'
				}, {
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

					listeners : {
						change : {
							fn : function(field, key, option) {	
								var shopId = field.getValue();
								me.down('#operatorId').clearValue();
								me.updateCbo(shopId);
							},
							delay : 200
						}
					}
				
				},{
					xtype : 'vcombo',
					fieldLabel : '操作员',
					labelWidth : 50,
					emptyText : '选择操作员',
					margin : '0 5 0 10',
					itemId : 'operatorId',
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'OperatorAction.getOperatorOptions',
							extraParams : {
								allowBlank : true,
								blankText : '全部',
								businessId : window.account.businessId
							}
						};
					}
				},{
					icon : 'images/search-16.png',
					text : '搜索',
					handler : function(btn) {
						btn.up('operationloggrid').doSearch();
					}
				} ]
			}]
		}];

		var bottomBar = {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"
		};

		return topBar.concat(bottomBar);
	},
	initComponent : function() {
		var store = this.createStore();
		
		Ext.apply(this, {
			store : store,			
			dockedItems : this.createDockedItems(store)
		});
		store.on('load', function(){
			var result = this.getStore().getProxy().getReader().rawData;
			
			if(!result.success){
				Ext.Msg.error(result.message);
			}
		},this);
		this.callParent(arguments);
	},
	updateCbo : function(shopId){
		var me = this;
		var param;
		if(shopId!=""&&shopId!=null){
			param = {"shopId":shopId, "page":1.0, "start":0.0, "limit":25.0};
		}else{
			param = {"allowBlank" : true,"blankText" : '全部', "page":1.0, "start":0.0, "limit":25.0};
		}
		OperatorAction.getOperatorOptions(param,function(value){
			me.down("#operatorId").setOptions(value);
		});
	},
	refresh : function() {
		this.getStore().reload();
	},
	doSearch : function() {
		var startDate = this.down('#start_date').getSubmitValue();
		var endDate = this.down('#end_date').getSubmitValue();
		var shopId = this.down('#shopId').getSubmitValue();
		var operatorId = this.down('#operatorId').getSubmitValue();
		var params = this.getStore().getProxy().extraParams;
		var form = this.down('vipform').getForm();
		
		if (form.isValid()) {
			if(!params){
				params = {};
				this.getStore().getProxy().extraParams = params;
			}
			
			if(startDate){
				params.startDate = startDate;
			} else {
				params.startDate = undefined;
			}
			
			if(endDate){
				params.endDate = endDate;
			} else {
				params.endDate = undefined;
			}
			if(shopId){
				params.shopId = shopId;
			} else {
				params.shopId = undefined;
			}
			if(operatorId){
				params.operatorId = operatorId;
			} else {
				params.operatorId = undefined;
			}
			this.getStore().loadPage(1);
		}
		
	}
});