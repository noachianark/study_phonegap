Ext.define('VIP.reports.MemberGrid', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.reportmembergrid' ],
	requires : [ 'VIP.member.store.Member' ],
	icon : 'images/member_list.png',
	layout : 'fit',
	selType: 'checkboxmodel',
	columns : [ {
        xtype: 'rownumberer',
        text:'序列',
        align : 'center',
        width: 50,
        sortable: false
	}, {
		text : 'Email',
		dataIndex : 'userEmail',
		flex : 2
	},{
		text : '会员电话',
		dataIndex : 'userTelephone',
		flex : 2
	},{
		text : '会员昵称',
		dataIndex : 'userName',
		flex : 2
	}, {
		text : '级别',
		dataIndex : 'cardType',
		flex : 1
	} ,{
		text : '消费总额(元)',
		dataIndex : 'totalConsume',
		flex : 1
	},{
		text : '当前余额(元)',
		dataIndex : 'deposit',
		flex : 1
	}],
	createStore : function() {
		var store = Ext.create('VIP.member.store.Member');
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
				hidden : !!this.userId,
				defaults : {
					labelAlign : 'right'
				},
				items : [ {
					xtype : 'textfield',
					fieldLabel : '会员号',				
					emptyText : '请扫描会员身份二维码',
					labelWidth : 60,
					labeAlign : 'right',
					width : 250,			
					inputType : 'password',
					itemId : 'userQrString',
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
					xtype : 'textfield',
					fieldLabel : '会员昵称',
					emptyText : '会员昵称',				
					labelWidth : 60,
					width : 180,
					itemId : 'userName',
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
				}/*, {
					xtype : 'textfield',
					fieldLabel : '会员姓名',
					emptyText : '会员姓名',				
					labelWidth : 60,
					width : 180,
					itemId : 'userName',
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
				}*/ ]
			}, {
				xtype : 'toolbar',
				dock : 'top',	
				defaults : {
					hideTrigger : true,
					labelAlign : 'right'
				},
				items : [{
					xtype : 'label',
					text : '当前余额 ￥'
				},{
					xtype : 'numberfield',
					itemId : 'depositStart',
					vtype : 'numberrange',
					emptyText : '余额最小值',	
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
					text : '消费总额 ￥'
				},{
					xtype : 'numberfield',
					itemId : 'totalConsumeStart',
					minText:'不能小于0',
					minValue:0,
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
					labelWidth : 63,
					width : 183,
					itemId : 'cardTypeId',
					value : '',
					emptyText : '选择等级',	
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'CardTypeAction.getCardTypeOptions',
							reader : {
								type : 'json',
								root : 'records'
							},
							extraParams : {
								allowBlank: true,
								businessId : window.account.businessId,
								blankText : '全部'
							}
						};
					}
					/*listeners : {
						change : {
							fn : function(field, key, option) {
								
									me.doQueryReport();
								
							},
							delay : 200
						}
					}*/
				},  {
					xtype : 'button',
					icon : 'images/search-16.png',
					text : '搜索',
					handler : function() {
						me.doQueryReport();
					}
				}, '->', {
					xtype : 'button',
					text : '修改会员等级',
					disabled:true,
					itemId : 'change',
					icon : 'images/change_level-16.png',
					handler:function(){
						me.changeMemberType();
					}
				}/*,{
					xtype : 'button',
					icon : 'images/excel-16.png',
					text : '导出'
				}*/]
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
		this.on('selectionchange', this.resetButtonStatus, this);
	},
	
	changeMemberType: function(){
		var me = this;
		var records = me.getSelectionModel().getSelection();
		var userIds = [];
		var cardTypeId = 0;
		var changeWindow =null;
		for(var i=0; i<records.length; i++){
			var record = records[i];
			var userId = record.raw.id;
			userIds.push(userId);
			
		}
		if(userIds.length==1){
			cardTypeId = records[0].raw.cardTypeId;
			changeWindow = Ext.create('VIP.member.ChangeMemberType',{
				userIds : userIds,
				cardTypeId : cardTypeId,
				onSave : {
					fn : me.refresh,
					scope : me

				}
			});
		}else{
			changeWindow = Ext.create('VIP.member.ChangeMemberType',{
				userIds : userIds,
				onSave : {
					fn : me.refresh,
					scope : me

				}
			});
		}
		changeWindow.show();
			
	}
	,
	resetButtonStatus : function(grid, selected){
		var me = this;
		if(selected.length>0){
			
			me.down('#change').setDisabled(false);
		}else{
			me.down('#change').setDisabled(true);
		}
		
	},
	doQueryReport : function() {
		var me = this;
		var userQrString = this.down('#userQrString').getSubmitValue();
		/*var userName = this.down('#userName').getSubmitValue();*/
		var userName = this.down('#userName').getSubmitValue();
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
			if (userQrString != "") {
				params.userQrString = userQrString;
			} else {
				params.userQrString = undefined;
			}

			if (userName != "") {
				params.userName = userName;
			} else {
				params.userName = undefined;
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
			me.down('#userQrString').setValue();
			this.getStore().loadPage(1);
		}
		
	},
	refresh : function() {
		this.getStore().reload();
	}
});