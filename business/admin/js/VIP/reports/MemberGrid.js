Ext.define('VIP.reports.MemberGrid', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.membergrid' ],
	requires : [ 'VIP.reports.store.Member' ],
	layout : 'fit',
	columns : [ {
        xtype: 'rownumberer',
        text:'序列',
        align : 'center',
        width: 50,
        sortable: false
	}, {
		text : 'Email',
		dataIndex : 'userEmail',
		flex : 1
	}, {
		text : '会员手机',
		dataIndex : 'userTelephone',
		flex : 1
	},{
		text : '会员昵称',
		dataIndex : 'userName',
		flex : 1
	}, {
		text : '级别',
		dataIndex : 'cardType',
		flex : 1
	} ,{
		text : '当前余额(元)',
		dataIndex : 'deposit',
		flex : 1
	},{
		text : '消费总额(元)',
		dataIndex : 'totalConsume',
		flex : 1
	}, {
		text : '积分总额(分)',
		dataIndex : 'point',
		flex : 1
	}],
	createStore : function() {
		var store = Ext.create('VIP.reports.store.Member');
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
				defaults : {
					hideTrigger : true,
					labelAlign : 'right'
				},
				items : [{
					xtype : 'label',
					margin : '0 0 0 20',
					text : '当前余额 ￥'
				},{
					xtype : 'numberfield',
					itemId : 'depositStart',
					vtype : 'numberrange',
					emptyText : '余额最小值',
					vtypeText : '最大值必须大于最小值且不能为负数',
					maxNumber : 'depositEnd',
					decimalPrecision:2, 
					width : 80,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doQueryReport();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'label',
					text : '至'
				}, {
					xtype : 'numberfield',
					vtype :'numberrange',
					itemId : 'depositEnd',
					emptyText : '余额最大值',	
					vtypeText : '最大值必须大于最小值且不能为负数',
					minNumber : 'depositStart',
					decimalPrecision:2,
					width : 80,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doQueryReport();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype:'label',
					text:'元'
				},{
					xtype : 'label',
					margin : '0 0 0 20',
					text : '消费总额 ￥'
				},{
					xtype : 'numberfield',
					itemId : 'totalConsumeStart',
					minText:'不能小于0',
					minValue:0,
					vtypeText : '最大值必须大于最小值且不能为负数',
					emptyText : '消费最小值',	
					vtype : 'numberrange',
					decimalPrecision:2,
					maxNumber : 'totalConsumeEnd',
					width : 80,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doQueryReport();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'label',
					text : '至'
				}, {
					xtype : 'numberfield',
					itemId : 'totalConsumeEnd',
					decimalPrecision:2,
					emptyText : '消费最大值',	
					minText:'不能小于0',
					minValue:0,
					vtypeText : '最大值必须大于最小值且不能为负数',
					vtype : 'numberrange',
					minNumber : 'totalConsumeStart',
					width : 80,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.doQueryReport();
								}
							},
							delay : 200
						}
					}
				}, {
					xtype:'label',
					text:'元'
				},{
					xtype : 'vcombo',
					fieldLabel : '会员等级',
					margin : '0 0 0 5',
					labelWidth : 63,
					hideTrigger : false,
					itemId : 'cardTypeId',
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'CardTypeAction.getCardTypeOptions',
							extraParams : {
								allowBlank: true,
								blankText : '全部',
								businessId : window.account.businessId
							}
						};
					}
				},  {
					xtype : 'button',
					icon : 'images/search-16.png',
					text : '搜索',
					handler : function() {
						me.doQueryReport();
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
	doQueryReport : function() {
		var me = this;
		var depositStart = this.down('#depositStart').getSubmitValue();
		var depositEnd = this.down('#depositEnd').getSubmitValue();
		var totalConsumeStart = this.down('#totalConsumeStart').getSubmitValue();
		var totalConsumeEnd = this.down('#totalConsumeEnd').getSubmitValue();
		var cardTypeId = this.down('#cardTypeId').getSubmitValue();
		var params = this.getStore().getProxy().extraParams;
		var form = this.down('vipform').getForm();

		if (form.isValid()) {
			if (!params) {
				params = {};
				this.getStore().getProxy().extraParams = params;
			}
			if(depositStart<0 || depositEnd<0 || totalConsumeStart<0 ||totalConsumeEnd<0){
				return false;
			}
			if (depositStart != "") {
				params.depositStart = depositStart;
			} else {
				params.depositStart = undefined;
			}
			if (depositEnd != "" /*&& depositEnd !=0*/) {
				params.depositEnd = depositEnd;
			} else {
				params.depositEnd = undefined;
			}
			
			if (totalConsumeStart != "") {
				params.totalConsumeStart = totalConsumeStart;
			} else {
				params.totalConsumeStart = undefined;
			}
			if (totalConsumeEnd != ""/* && totalConsumeEnd !=0*/) {
				params.totalConsumeEnd = totalConsumeEnd;
			} else {
				params.totalConsumeEnd = undefined;
			}
			if (cardTypeId != "") {
				params.cardTypeId = cardTypeId;
			} else {
				params.cardTypeId = undefined;
			}
			this.getStore().loadPage(1);
		}
		
	},
	refresh : function() {
		this.getStore().reload();
	}
});