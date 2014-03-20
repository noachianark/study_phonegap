Ext.define('VIP.Main', {
	extend :  Ext.panel.Panel ,
	alias : [ 'widget.vipmain' ],
	requires : [],
	id : 'main',
	region : 'center',
	layout : 'card',
	defaults : {
		border : false,
		closable : true
	},
	items : [/*{
		xtype:'panel',
		title:'魔客会员',
		closable :false,
		html:'<iframe src="http://www.vipmonk.com" width="100%" height="100%"></iframe>'
	}*/],

	initComponent : function() {
		this.callParent(arguments);
	},
	
	setContent : function(component){
		this.removeAll();
		this.add(component);
	}
});
Ext.define('VIP.store.BaseStore',{
	extend:  Ext.data.Store ,
	                            	
	
	constructor: function(config) {
		this.callParent([config]);
		
		this.on('load', function(){
			var rawData = this.getProxy().getReader().rawData;
			if(rawData.message){
				Ext.MessageBox.show({
					title : rawData.success? '信息' : '错误',
					msg : rawData.message,
					buttons : Ext.MessageBox.OK,
					icon : rawData.success? Ext.MessageBox.INFO : Ext.MessageBox.ERROR,
					fn : function(id,msg){
						if(rawData.errorType==0){
							document.location.href="http://localhost:8080/vipmonk/business/index.html";
						}
					}
				});
			}
		}, this);
	}
});
Ext.define('VIP.shop.model.Shop', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'id',
		type : 'string'
	},{
		name : 'name',
		type : 'string'
	},{
		name : 'discountDescription',
		type : 'string'
	},{
		name : 'chargeWays',
		type : 'string'
	},{
		name : 'contactName',
		type : 'string'
	},{
		name : 'telephone',
		type : 'string'
	},{
		name : 'smsLimit',
		type : 'string'
	},{
		name : 'state',
		type : 'string'
	},{
		name : 'address',
		type : 'string'
	}]
});

Ext.define('VIP.shop.store.Shop',{
	extend:  VIP.store.BaseStore ,
	                                                        
	model : 'VIP.shop.model.Shop',
	sorters: [],
	remoteSort: true,
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'ShopAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.shop.ShopGrid', {
	extend :  Ext.grid.Panel ,
	xtype : 'shopgrid',
	                                   
	layout : 'fit',
	title : '店铺管理',
	columns : [  {
		        xtype: 'rownumberer',
		        width: 50,
		        align : 'center',
		        text:'序列',
		        sortable: false
	},{
		text : '店铺名称',
		dataIndex : 'name',
		flex : 1
	}, {
		text : '联系人',
		dataIndex : 'contactName',
		flex : 1
	}, {
		text : '联系电话',
		dataIndex : 'telephone',
		flex : 2
	}, {
		text : '分店地址',
		dataIndex : 'address',
		flex : 1
	}, {
		text : '状态',
		dataIndex : 'state',
		flex : 1,
		renderer : function(value, metaData) {
			if (value == 1) {
				metaData.style = 'color:#0f0';
				return '正常';
			} else if (value == 0) {
				metaData.style = 'color:#00f';
				return '冻结';
			} else if (value == -2) {
				metaData.style = 'color:#f00';
				return '注销';
			} else {
				return value;
			}
		}
	} ],

	createDockedItems : function(store) {
		var me = this;
		var topBar = {
			xtype : 'toolbar',
			dock : 'top',
			items : ['->', {
				xtype : 'button',
				icon : 'images/add.png',
				width : 80,
				text : '添加',
				handler : function(btn) {
					btn.up('shopgrid').addShop();
				}
			}, '-', {
				xtype : 'button',
				icon : 'images/edit.png',
				width : 80,
				itemId : 'edit',
				text : '修改',
				disabled : true,
				handler : function(btn) {
					btn.up('shopgrid').editShop();
				}
			}, '-', {
				xtype : 'button',
				icon : 'images/delete.png',
				width : 80,
				itemId : 'delete',
				text : '删除',
				disabled : true,
				handler : function(btn) {
					btn.up('shopgrid').deleteShop();
				}
			}]
		};
		var bottomBar = {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"
		};

		return [ topBar, bottomBar ];
	},
	createStore : function() {
		var store = Ext.create('VIP.shop.store.Shop');
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
	initComponent : function() {
		var store = this.createStore();

		Ext.apply(this, {
			store : store,
			dockedItems : this.createDockedItems(store)
		});

		this.callParent(arguments);
		
		this.on('selectionchange', this.resetButtonStatus, this);
		this.on('itemdblclick', this.editShop, this);
	},
	refresh : function() {
		this.getStore().reload();
	},
	resetButtonStatus : function(grid, selected) {
		if (selected.length == 1) {
			this.down('#edit').setDisabled(false);
			this.down('#delete').setDisabled(false);
		}else{
			this.down('#edit').setDisabled(true);
			this.down('#delete').setDisabled(true);
		}
	},

	addShop : function() {
		var me = this;
		var shopWindow = Ext.create('VIP.shop.ShopWindow', {
			params : {
				
			},
			onSave : {
				fn : me.refresh,
				scope : me
			}
		});
		shopWindow.show();
		
	},

	editShop : function() {
		var me = this;
		var record = me.getSelectionModel().getSelection()[0];
		var shopId = record.raw.id;
		var shopWindow = Ext.create('VIP.shop.ShopWindow', {
			params : {
				shopId : shopId
			},
			onSave : {
				fn : me.refresh,
				scope : me
			}
		});
		shopWindow.show();
		
	},
	deleteShop : function() {
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var name = record.raw.name;

		Ext.Msg.confirm('确认', '确认要删除店铺[' + name + '] 吗？', function(r) {
			if (r == 'yes') {

				var shopId = record.raw.id;

				ShopAction.deleteShop(shopId, function(actionResult) {
					if (actionResult.success) {
						me.refresh();
					} else {
						Ext.Msg.error(actionResult.message);
					}
				});
			}
		}, this);
	}

});
Ext.define('VIP.security.model.OperatorRule', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'actions',
		type : 'string'
	}, {
		name : 'actionsStr',
		type : 'string'
	}, {
		name : 'description',
		type : 'string'
	}]
});
Ext.define('VIP.security.store.OperatorRule',{
	extend:  VIP.store.BaseStore ,
	                                                                    
	model : 'VIP.security.model.OperatorRule',
	sorters: [],
	remoteSort: true,
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'OperatorRuleAction.findOperatorRules',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.security.OperatorRuleGrid', {
	extend :  Ext.grid.Panel ,
	alias : [ 'widget.operatorrulegrid' ],
	                                                 
	title : '',
	layout : 'fit',
	title : '权限管理',
	columns : [ {
        xtype: 'rownumberer',
        width: 50,
        align : 'center',
        text:'序列',
        sortable: false
	},{
		text : '名称',
		dataIndex : 'name',
		flex : 1
	}, {
		text : '描述',
		dataIndex : 'description',
		flex : 3
	} ],
	createStore : function() {
		var store = Ext.create('VIP.security.store.OperatorRule');
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
		var topBar = {
			xtype : 'toolbar',
			dock : 'top',			
			items : [ '->', {
				xtype : 'button',
				text : '添加',
				icon : 'images/add.png',
				width : 80,
				handler : function(btn) {
					btn.up('operatorrulegrid').addRule();
				}
			}, '-', {
				xtype : 'button',
				text : '修改',
				icon : 'images/edit.png',
				width : 80,
				itemId : 'edit',
				disabled : true,
				handler : function(btn) {
					btn.up('operatorrulegrid').editRule();
				}
			}, '-', {
				xtype : 'button',
				text : '删除',
				icon : 'images/delete.png',
				width : 80,
				itemId : 'delete',
				disabled : true,
				handler : function(btn) {
					btn.up('operatorrulegrid').deleteRule();
				}
			} ]
		};

		var bottomBar = {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"			
		};

		return [ topBar, bottomBar ];
	},

	initComponent : function() {
		var store = this.createStore();

		Ext.apply(this, {
			store : store,
			dockedItems : this.createDockedItems(store)
		});

		this.callParent(arguments);
		
		store.on('load', function(){
			var result = this.getStore().getProxy().getReader().rawData;
			if(!result.success){
				Ext.Msg.error(result.message);
			}
		},this);
		
		this.on('selectionchange', this.resetButtonStatus, this);
		this.on('itemdblclick', this.editRule, this);
	},
	
	refresh : function() {
		this.getStore().reload();
	},
	
	resetButtonStatus : function(grid, selected){
		if(selected.length == 1){
			var record = this.getSelectionModel().getSelection()[0];
			var ruleId = record.raw.id;
			this.down('#edit').setDisabled(ruleId == 1);
			this.down('#delete').setDisabled(ruleId == 1);
		} else {
			this.down('#edit').setDisabled(false);
			this.down('#delete').setDisabled(false);
		}
	},
	
	addRule : function(){
		var me = this;
		var ruleWindow = Ext.create('VIP.security.OperatorRuleWindow', {
			onSave : {
				fn : me.refresh,
				scope : me
			}
		});
		ruleWindow.show();
		
	},

	editRule : function(){
		var me = this;
		
		var record = me.getSelectionModel().getSelection()[0];
		var ruleId = record.raw.id;
		
		var ruleWindow = Ext.create('VIP.security.OperatorRuleWindow', {
			params : {
				ruleId : ruleId
			},
			onSave : {
				fn : me.refresh,
				scope : me
			}
		});
		ruleWindow.show();
				
		
	},
	
	deleteRule : function(){
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var name = record.raw.name;
		Ext.Msg.confirm('确认', '确认要删除权限组 [' + name + '] 吗？', function(r) {
			if (r == 'yes') {
				var ruleId = record.raw.id;
				OperatorRuleAction.deleteOperatorRule(ruleId, function(actionResult) {
					if (actionResult.success) {
						me.refresh();
					} else {
						Ext.Msg.error(actionResult.message);
					}
				});
			}
		}, this);
		
	}
});
Ext.define('VIP.operator.model.Operator', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'operatorNumber',
		type : 'string'
	}, {
		name : 'accountName',
		type : 'string'
	}, {
		name : 'password',
		type : 'string'
	}, {
		name : 'idCardNumber',
		type : 'string'
	}, {
		name : 'sex',
		type : 'string'
	}, {
		name : 'birthday',
		type : 'string'
	}, {
		name : 'education',
		type : 'string'
	}, {
		name : 'address',
		type : 'string'
	}, {
		name : 'mobile',
		type : 'string'
	}, {
		name : 'shopId',
		type : 'string'
	}, {
		name : 'shopName',
		type : 'string'
	}, {
		name : 'lastSigninTime',
		type : 'string'
	}, {
		name : 'operatorRuleId',
		type : 'string'
	}, {
		name : 'operatorRuleName',
		type : 'string'
	}, {
		name : 'state',
		type : 'string'
	}, {
		name : 'notes',
		type : 'string'
	}]
});
Ext.define('VIP.operator.store.Operator',{
	extend:  VIP.store.BaseStore ,
	                                                                
	model : 'VIP.operator.model.Operator',
	sorters: [],
	remoteSort: true,
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'OperatorAction.findOperators',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.operator.OperatorGrid', {
	extend :  Ext.grid.Panel ,
	alias : [ 'widget.operatorgrid' ],
	                                             
	title : '',
	layout : 'fit',
	title : '操作员管理',
	columns : [ {
        xtype: 'rownumberer',
        width: 50,
        align : 'center',
        text:'序列',
        sortable: false
	},{
		text : '姓名',
		dataIndex : 'name',
		flex : 1
	},{
		text : '用户名',
		dataIndex : 'accountName',
		flex : 1
	}, {
		text : '所属店铺',
		dataIndex : 'shopName',
		flex : 2,
		renderer : function(value, metaData,record ) {
			var state = record.raw.shopState;
			if(state=='1'){
				return value;
			}else if(state=='0'){
				metaData.style = 'color:#00F';
				return value+"　【已冻结】";
			}else{
				metaData.style = 'color:#F00';
				return value+"　【已注销】";
			}
		}
	}, {
		text : '性别',
		dataIndex : 'sex',
		renderer : function(value) {
			if (value == 'M') {
				return '男';
			} else if (value == 'F') {
				return '女';
			} else if (value == 'U') {
				return '未知';
			} else {
				return value;
			}
		}
	}, {
		text : '角色',
		dataIndex : 'operatorRuleName'
	}, {
		text : '最后登录时间',
		dataIndex : 'lastSigninTime',
		flex : 2
	}, {
		text : '状态',
		dataIndex : 'state',
		renderer : function(value, metaData) {
			if (value == '1') {
				metaData.style = 'color:#0f0';
				return '正常';
			} else if (value == 0) {
				metaData.style = 'color:#00f';
				return '冻结';
			} else if (value == '-1') {
				metaData.style = 'color:#C9C9C9';
				return '已过期';
			} else if (value == '-2') {
				metaData.style = 'color:#C9C9C9';
				return '已注销';
			} else {
				return value;
			}
		}
	} ],
	createStore : function() {
		var store = Ext.create('VIP.operator.store.Operator');
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
		var topBar = {
			xtype : 'toolbar',
			dock : 'top',			
			items : [ {
				xtype : 'textfield',
				fieldLabel : '姓名',
				labelWidth : 30,
				margin : '0 5 0 10',
				emptyText : '姓名',
				width: 100,
				itemId : 'name',
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
				xtype : 'textfield',
				fieldLabel : '用户名',
				labelWidth : 50,
				margin : '0 5 0 10',
				emptyText : '用户名',
				width: 150,
				itemId : 'accountName',
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
							blankText : '全部'
						}
					};
				}
			}, {
				xtype : 'vcombo',
				fieldLabel : '状态',
				labelWidth : 30,
				emptyText : '选择状态',
				width : 125,
				margin : '0 5 0 10',
				itemId : 'state',
				options : [{
					text : '全部',
					value : ''
				}, {
					text : '正常',
					value : '1'
				}, {
					text : '冻结',
					value : '0'
				}]
			}, {
				xtype : 'button',
				icon : 'images/search-16.png',
				text : '搜索',
				width : 70,
				handler : function(btn) {
					btn.up('operatorgrid').doSearch();
				}
			}, '->', '-', {
				xtype : 'button',
				text : '添加',
				icon : 'images/add.png',
				width : 80,
				handler : function(btn) {
					btn.up('operatorgrid').addOperator();
				}
			}, '-', {
				xtype : 'button',
				text : '修改',
				icon : 'images/edit.png',
				width : 80,
				itemId : 'edit',
				disabled : true,
				handler : function(btn) {
					btn.up('operatorgrid').editOperator();
				}
			}, '-', {
				xtype : 'button',
				text : '注销',
				icon : 'images/delete.png',
				width : 80,
				itemId : 'delete',
				disabled : true,
				handler : function(btn) {
					btn.up('operatorgrid').deleteOperator();
				}
			} ,'-', {
				xtype : 'button',
				text : '重置密码',
				icon : 'images/reset_password.png',
				width : 100,
				itemId : 'restore',
				disabled : true,
				handler : function(btn) {
					btn.up('operatorgrid').restorePassword();
				}
			}]
		};

		var bottomBar = {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"			
		};

		return [ topBar, bottomBar ];
	},

	initComponent : function() {
		var store = this.createStore();

		Ext.apply(this, {
			store : store,
			dockedItems : this.createDockedItems(store)
		});

		this.callParent(arguments);
		
		this.on('selectionchange', this.resetButtonStatus, this);
		this.on('itemdblclick', this.editOperator, this);
	},

	doSearch : function() {
		var name = this.down('#name').getValue();
		var shopId = this.down('#shopId').getValue();
		var accountName = this.down('#accountName').getValue();
		var state = this.down('#state').getValue();

		var params = this.getStore().getProxy().extraParams;

		if (!params) {
			params = {};
			this.getStore().getProxy().extraParams = params;
		}
		
		params.start = 0;

		if (name != "") {
			params.name = name;
		} else {
			delete params.name;
		}
		if (accountName !=""){
			params.accountName = accountName;
		} else {
			delete params.accountName;
		}
		if (shopId != "") {
			params.shopId = shopId;
		} else {
			delete params.shopId;
		}
		
		if (state != "") {
			params.state = state;
		} else {
			delete params.state;
		}

		this.getStore().loadPage(1);
	},
	refresh : function() {
		this.getStore().reload();
	},
	
	resetButtonStatus : function(grid, selected){
		if(selected.length == 1){
			var record = this.getSelectionModel().getSelection()[0];
			var operatorId = record.raw.id;
			this.down('#restore').setDisabled(operatorId == 1);
			this.down('#edit').setDisabled(operatorId == 1);
			this.down('#delete').setDisabled(operatorId == 1);
		} else {
			this.down('#restore').setDisabled(true);
			this.down('#edit').setDisabled(true);
			this.down('#delete').setDisabled(true);
		}
	},
	
	addOperator : function(){
		var me = this;
		OperatorAction.canAddOperator(function(result){
			if(result.success){
				var shopWindow = Ext.create('VIP.operator.OperatorWindow', {
					params : {
						
					},
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});
				shopWindow.show();
			}else{
				Ext.Msg.error(result.message);
			}
		});	
	},

	editOperator : function(){
		var me = this;
		OperatorAction.canEditOperator(function(result){
			if(result.success){
				var record = me.getSelectionModel().getSelection()[0];
				var operatorId = record.raw.id;
				var shopWindow = Ext.create('VIP.operator.OperatorWindow', {
					params : {
						operatorId : operatorId
					},
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});
				shopWindow.show();
			
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},
	restorePassword: function(){
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var name = record.raw.name;
		OperatorAction.canRestorePassword(function(result){
			if(result.success){
				Ext.Msg.confirm('确认', '确认要重置操作员 [' + name + ']的密码吗？', function(r) {
					if (r == 'yes') {
						
						var operatorId = record.raw.id;
						
						OperatorAction.restorePassword(
							operatorId
						, function(actionResult) {
							if (actionResult.success) {
								Ext.Msg.info("重置成功");
								me.refresh();
							} else {
								Ext.Msg.error(actionResult.message);
							}
						});
					}
				}, this);
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},
	deleteOperator : function(){
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var name = record.raw.name;
		OperatorAction.canRestorePassword(function(result){
			if(result.success){
				Ext.Msg.confirm('确认', '注销无可逆性,请慎重操作！确认要注销吗？', function(r) {
					if (r == 'yes') {
						
						var operatorId = record.raw.id;
						OperatorAction.deleteOperator(operatorId, function(actionResult) {
							if (actionResult.success) {
								me.refresh();
							} else {
								Ext.Msg.error(actionResult.message);
							}
						});
					}
				}, this);
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	}
});
Ext.define('VIP.admin.model.Admin', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'id',
		type : 'string'
	},{
		name : 'accountName',
		type : 'string'
	},{
		name : 'email',
		type : 'string'
	},{
		name : 'description',
		type : 'string'
	},{
		name : 'name',
		type : 'string'
	}]
});
Ext.define('VIP.admin.store.Admin',{
	extend:  VIP.store.BaseStore ,
	                                                          
	model : 'VIP.admin.model.Admin',
	sorters: [],
	remoteSort: true,
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'BusinessAdminAction.findBusinessAdmin',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});
Ext.define('VIP.admin.AdminGrid', {
	extend :  Ext.grid.Panel ,
	alias : [ 'widget.admingrid' ],
	                                       
	title : '',
	layout : 'fit',
	title : 'Admin管理',
	columns : [ {
        xtype: 'rownumberer',
        width: 50,
        align : 'center',
        text:'序列',
        sortable: false
	},{
		text : '账号名',
		dataIndex : 'accountName',
		flex : 1
	},{
		text : '姓名',
		dataIndex : 'name',
		flex : 1
	},{
		text : '电子邮箱',
		dataIndex : 'email',
		flex : 1
	},{
		text : '描述',
		dataIndex : 'description',
		flex : 1
		
	}],
	createStore : function() {
		var store = Ext.create('VIP.admin.store.Admin');
		return store;
	},
	createDockedItems : function(store) {
		var me = this;
		var topBar = {
			xtype : 'toolbar',
			dock : 'top',			
			items : [  '->', {
				xtype : 'button',
				text : '添加',
				icon : 'images/add.png',
				width : 80,
				handler : function(btn) {
					btn.up('admingrid').addAdmin();
				}
			}, '-', {
				xtype : 'button',
				text : '修改',
				icon : 'images/edit.png',
				width : 80,
				itemId : 'edit',
				disabled : true,
				handler : function(btn) {
					btn.up('admingrid').editAdmin();
				}
			}, '-', {
				xtype : 'button',
				text : '注销',
				icon : 'images/delete.png',
				width : 80,
				itemId : 'delete',
				disabled : true,
				handler : function(btn) {
					btn.up('admingrid').deleteAdmin();
				}
			} ]
		};

		var bottomBar = {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"			
		};

		return [ topBar, bottomBar ];
	},

	initComponent : function() {
		var store = this.createStore();

		Ext.apply(this, {
			store : store,
			dockedItems : this.createDockedItems(store)
		});

		this.callParent(arguments);
		
		this.on('selectionchange', this.resetButtonStatus, this);
		this.on('itemdblclick', this.editAdmin, this);
	},

	refresh : function() {
		this.getStore().reload();
	},
	
	resetButtonStatus : function(grid, selected){
		if(selected.length == 1){
			this.down('#edit').setDisabled(false);
			this.down('#delete').setDisabled(false);
		} else {
			this.down('#edit').setDisabled(true);
			this.down('#delete').setDisabled(true);
		}
	},
	
	addAdmin : function(){
		var me = this;
		var adminWin = Ext.create('VIP.admin.AdminWindow',{
			params : {
				adminId : null
			},
			onSave : {
				fn : me.refresh,
				scope : me
			}
		});
		adminWin.show();
	},

	editAdmin : function(){
		var me = this;
		var record = me.getSelectionModel().getSelection()[0];
		var adminId = record.raw.id;
		var adminWin = Ext.create('VIP.admin.AdminWindow',{
			params : {
				adminId : adminId
			},
			onSave : {
				fn : me.refresh,
				scope : me
			}
		});
		adminWin.show();
		
	},
	deleteAdmin : function(){
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var accountName = record.raw.accountName;
		Ext.Msg.confirm('确认', '确认要Admin账号:[' + accountName + '] 吗？', function(r) {
			if (r == 'yes') {
				BusinessAdminAction.removeBusinessAdmin(record.raw.id,function(actionResult){
					if(actionResult.success){
						me.refresh();
					}else{
						Ext.Msg.error(actionResult.message);
					}
				});
			}
		});
	}
});
Ext.define('VIP.west.Main', {
	extend:  Ext.panel.Panel ,
	alias: [ 'widget.vipwestmain' ],
	                                                                                                                  
	region: 'west',
	id: 'west',
	split: true,
	width: 250,
	minWidth: 250,
	maxWidth: 250,
	collapsible : true,
	titleCollapse : true,
	bodyStyle: 'background:#222',
	
	items : [{
		xtype: 'box',
		html:'<div class="west-div" id="west-admin"><div class="west-font"><img class="west-img" src="images/admin.png" />Admin管理</div></div>'
	},{
		xtype: 'box',
		html:'<div class="west-div" id="west-shop"><div class="west-font"><img class="west-img" src="images/shop.png" />店铺管理</div></div>'
	},{
		xtype: 'box',
		html:'<div class="west-div" id="west-operatorRule"><div class="west-font"><img class="west-img" src="images/key.png" />权限管理</div></div>'
	},{
		xtype: 'box',
		html:'<div class="west-div" id="west-operator"><div class="west-font"><img class="west-img" src="images/user.png" />操作员管理</div></div>'
	},{
		xtype: 'box',
		html:'<div class="west-div" id="west-exit"><div class="west-font"><img class="west-img" src="images/exit.png" /> 退　出 </div></div>'

	}],

	listeners : {
		beforeexpand : function(){
			this.setTitle(null);
		},
		collapse : function(){
			this.setTitle('功能菜单');
		}
	},

	initComponent : function() {
		var me =this;
		
		this.callParent(arguments);
		
		setTimeout(function(){
			me.attachEvents();
		},50);
		
	},
	
	attachEvents : function() {
		var admin = Ext.get('west-admin');
		var operator = Ext.get('west-operator');
		var operatorRule = Ext.get('west-operatorRule');
		var shop = Ext.get('west-shop');
		var exit = Ext.get('west-exit');
		//var west = Ext.get('west');
		admin.on('click', function(){
			vip.viewport.main.setContent({
				xtype : 'admingrid',
				closable :false
			});
		},this);
		operator.on('click', function(){
			vip.viewport.main.setContent({
				xtype : 'operatorgrid',
				closable :false
			});
		},this);
		operatorRule.on('click', function(){
			vip.viewport.main.setContent({
				xtype : 'operatorrulegrid',
				closable :false
			});
		},this);
		shop.on('click', function(){
			vip.viewport.main.setContent({
				xtype : 'shopgrid',
				closable :false
			});
		},this);
		exit.on('click', function(){
			Ext.MessageBox.confirm('警告', '你确定你要退出吗？', function(btn) {
				if (btn == 'yes') {
					SignAction.signOut(function(actionResult){
						if(actionResult.success){
							window.location.reload(true);
						} else {
							
						}
					});
				}
			});
		},this);
	}
});
Ext.define('Option', {
	extend :  Ext.data.Model ,
	fields : [ {
		name : 'text',
		type : 'string'
	}, {
		name : 'value',
		type : 'string'
	} ]
});

Ext.define('VIP.widget.field.ComboBox', {
	extend :  Ext.form.field.ComboBox ,
	alias : [ 'widget.vcombo' ],
	forceSelection : true,
	editable : false,
	queryMode : 'local',
	displayField : 'text',
	valueField : 'value',
	triggerAction : 'all',
	
	initComponent : function() {
		var me = this;
		
		this.addEvents(	          
			'optionsready'
		);
		if (me.options) {
			me.store = Ext.create('Ext.data.Store', {
				fields : [ 'text', 'value' ],
				data : me.options
			});
			
			me.fireEvent('optionsready', me);
		} else {
			me.store = Ext.create('Ext.data.Store', {
				model : 'Option',
				proxy : me.getProxy(),
				autoLoad : true
			});
			
			me.store.on('load', function(){
				if(me.originalValue != undefined && me.originalValue != ''){
					me.setValue(me.originalValue);
				} else if (me.allowBlank === false && me.store.getTotalCount() > 0){
//					me.setValue(me.store.first());
				}
				me.fireEvent('optionsready', me);
			}, me, {
				delay: 200
			});
			
			if(!me.isDisabled()){
				me.store.on('beforeload', function(){
					this.setDisabled(true);
				}, me);
				
				me.store.on('load', function(){
					this.setDisabled(false);
				}, me);
			}
		}		
		
		this.callParent();
	},	

	refresh : function() {
		if (!this.store.isLoading()) {
			this.store.setProxy(this.getProxy());
			this.store.load();
		}
	},
		
	setOptions : function(options){
		this.store.loadData(options, false);
	},
	
	getText : function(){
		var index = this.store.findExact('value', this.getValue()); 
        if (index != -1){
            var record = this.store.getAt(index).data; 
            return record.text; 
        }
	}
});
Ext.define('VIP.widget.form.Panel', {
	extend :  Ext.form.Panel ,
	alias : [ 'widget.vipform' ],
	                                           

	initComponent : function() {
		this.callParent(arguments);
	},

	bindEnterKeyEvent : function() {
		var specialKeyListener = function(field, key) {
			var fields = this.getForm().getFields().items;
			var index = fields.indexOf(field);
			if (key.keyCode == 13) {
				index++;
				var next = fields[index];

				while (next.readOnly || next.isDisabled() || !next.focus) {
					index++;
					next = fields[index];
				}

				next.focus(true, 100);
			}
		};

		var fields = this.getForm().getFields().items;

		for ( var i = 0; i < fields.length; i++) {
			var f = fields[i];
			if (f.readOnly || f.isDisabled() || f.xtype == 'radio' || f.xtype == 'textarea') {
				continue;
			} else {
				f.on('specialKey', specialKeyListener, this);
			}
		}
	}
});
Ext.define('VIP.Viewport', {
	extend :  Ext.Viewport ,
	alias : [ 'widget.vipviewport' ],
	                                                                 
	layout : 'border',
	
	items : [{
		xtype : 'vipwestmain'
	}, {
		xtype : 'vipmain'
	}],
	
	initComponent : function() {
		var me =this;
		
		this.callParent(arguments);
	}

});

Ext.define('VIP.admin.AdminWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.adminwindow' ],
	                                       
	layout : 'fit',
	id : 'adminwindow',
	width : 640,
	height : 300,
	resizable:false,
	closable :false,
	border : false,
	createButtons : function() {
		var me = this;

		var buttons = [ {
			text : '保存',
			icon : 'images/update.png',
			handler : function(btn) {
				me.saveAdmin();
			}
		}, {
			text : '取消',
			icon : 'images/cancel.png',
			handler : function(btn) {
				me.destroy();
			}
		} ];

		return buttons;
	},

	createView : function() {
		var me = this;

		var items = [ {
			xtype : 'vipform',
			defaults : {
				margin : 5
			},
			items : [ {
				xtype : 'fieldset',
				title : '基本信息',
				margin : 5,
				height : 155,
				defaults : {
					width : 275,
					labelAlign : 'right'
				},
				layout : {
					type : 'table',
					columns : 2
				},
				items : [ {
					xtype : 'textfield',
					fieldLabel : '账号名',
					itemId : 'accountName',
					allowBlank : false,
					name : 'accountName'
				}, {
					xtype : 'textfield',
					fieldLabel : '姓名',
					allowBlank : false,
					name : 'name'
				},{
					xtype : 'textfield',
					fieldLabel : '电子邮箱',
					allowBlank : false,
					regex:/^[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/,
					regexText:'无效的电子邮箱',
					name : 'email',
					colspan : 2
				},{
					xtype : 'textareafield',
					fieldLabel : '描述',
					name : 'description',
					colspan : 2,
					width : 550
				} ]

			}, {
				xtype : 'fieldset',
				title : '密码',
				margin : 5,
				height : 65,
				defaults : {
					width : 275,
					labelAlign : 'right'
				},
				layout : {
					type : 'table',
					columns : 2
				},
				items : [{
					xtype : 'textfield',
					fieldLabel : '密码',
					inputType : 'password',
					itemId : 'password',
					name : 'password',
					allowBlank : false,
					vtype : 'password',
					labelStyle : 'color:red',
					initialPassField : 'passwordAg',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#passwordAg').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '确认密码',
					itemId : 'passwordAg',
					name : 'passwordAg',
					inputType : 'password',
					allowBlank : false,
					vtype : 'password',
					initialPassField : 'password',
					labelStyle : 'color:red',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.updatePassword();
								}
							},
							delay : 200
						}
					}
				} ]
			} ]
		} ];

		return items;
	},

	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			title : this.params.adminId? '修改Admin' : '添加Admin',
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		if(this.params.adminId){
			this.load();
		}
		
	},
	saveAdmin : function(){
		var me = this;
		var form = me.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			values.passwordAg= undefined ;
			if(me.params.adminId){
				Ext.apply(values, {
					id : me.params.adminId
				});
				if(values.password=="******"){
					values.password= undefined ;
				}
				BusinessAdminAction.updateBusinessAdmin(values,function(actionResult){
					if(actionResult.success){
						Ext.Msg.info("修改成功");
						if (me.onSave) {
							me.onSave.fn.call(me.onSave.scope);
						}
						me.destroy();
					}else{
						Ext.Msg.error(actionResult.message);
					}
				});
			}else{
				Ext.apply(values, {
					businessId : window.account.businessId
				});
				BusinessAdminAction.addBusinessAdmin(values,function(actionResult){
					if(actionResult.success){
						Ext.Msg.info("添加成功");
						if (me.onSave) {
							me.onSave.fn.call(me.onSave.scope);
						}
						me.destroy();
					}else{
						Ext.Msg.error(actionResult.message);
					}
				});
			}
		}
		
	},
	load : function() {
		var me = this;
		me.down('#password').setValue('******');
		me.down('#passwordAg').setValue('******');
		me.down('#accountName').setReadOnly(true);
		BusinessAdminAction.findBusinessAdminById(me.params.adminId,function(actionResult){
			if(actionResult.success){
				me.down('vipform').getForm().setValues(actionResult.data);
			}else{
				Ext.Msg.error(actionResult.message);
			}
		});
	}
});
Ext.define('VIP.common.LoginWindow', {
	extend :  Ext.window.Window ,
	xtype : 'loginwindow',
    plain: true,  
    header: false,  
    border: false,  
    closable: false,  
    draggable: false,  
    frame:true,  
    resizable :false,  
    shadow:false,
	margin : 0,
	padding :0 ,
	width:420,
	createView : function() {
		var me = this;

		var items = [ {
			xtype : 'form',
			region : 'center',
			border: false,  

			bodyStyle: 'background:#dfdfdf',
			layout : {
				type : 'vbox',
				align : 'left',
				pack : 'center'
			},	
			items : [ {
				xtype : 'panel',
				region : 'center',
				margin : '20 0 0 50',
				border: false,  
				bodyStyle: 'background:#dfdfdf',
				layout : {
					type : 'hbox',
					align : 'left',
					pack : 'center'
				},	
				items : [{
					xtype:'label',
					text:'登录',
					margin : '0 5 0 0',
					style: {
						fontFamily: '微软雅黑',
						fontSize : '26px',
						color : '#434343'
			        }
				},{
					xtype:'label',
					text:'魔客会员',
					margin : '15 5 0 10',
					style: {
						fontSize :'13px',
						fontFamily: '微软雅黑',
						color : '#434343'
			        }
				}]
			},{
				
				xtype : 'textfield',
				allowBlank : false,
				labelAlign :'left',
				name : 'accountName',
				itemId:'accountName',
				blankText : '请输入用户名',
				margin : '0 5 5 20',
				emptyText : '用 户 名',
				value : '',
				width: 320,
				height:45,
				fieldStyle : 'font-size:15px;font-family:\'微软雅黑\';padding-left:20px;font-weight: bold;border-top-left-radius:6px;border-top-right-radius:6px; ',
				margin : '20 0 0 50',
				selectOnFocus : true,
				listeners : {
					afterrender : {
						fn :  function(){
							this.focus();
						},
						delay : 500
					},
					specialKey : function(field, e) {
						if (e.keyCode == 13) {
							setTimeout(function(){
								me.down('#password').focus(true);
							}, 100);
						}
					}
				}
				
			},{
				xtype : 'textfield',
				allowBlank : false,
				itemId : 'password',
				name : 'password',
				margin : '0 5 5 20',
				emptyText : '密 　 码',
				emptyCls : '',
				height : 45,
				blankText : '请输入密码',
				inputType : 'password',
				value : '',
				width: 320,
				fieldStyle : 'font-size:15px;font-family:\'微软雅黑\';padding-left:20px;font-weight: bold;border-bottom-left-radius:6px;border-bottom-right-radius:6px;  ',
				margin : '0 0 0 50',
				selectOnFocus : true,
				listeners : {
					specialKey : function(field, e) {
						if (e.keyCode == 13) {
							me.signIn();
						}
					}
				}
			},{
				xtype : 'checkbox',
				boxLabel: '记住用户名',
                name: 'saveAccount',
                itemId: 'saveAccount',
                margin : '5 0 0 50',
                boxLabelCls : 'checkLabel',
                inputValue: 'true'
			},{
				xtype : 'button',
				text : '<font color="#fff" style="font-size:14px;font-family:\'宋体\';">登录</font>',
				height : 45,
				width: 320,
				margin : '20 0 5 50',
		        style : 'border-radius:6px;background:#299816',
				padding : '10 5',
				handler : function(btn) {
					me.signIn();
				}
			},{
				xtype : 'label',
				margin : '0 0 35 285',
				html : '<a href="../index.html" class="fontlink">操作员登录界面</a>'
			}]
		}];
	

		return items;
	},

	
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView()
		});
		this.callParent(arguments);
		
		this.load();
	},
	load : function(){
		var me =this;
		var accountName = window.localStorage.getItem('saveAccount');
		if(accountName){
			me.down('#accountName').setValue(accountName);
			me.down('#saveAccount').setValue(true);
		}
		
	},
	signIn : function(){
		var me = this;
		me.setLoading('登录中...');
		var form = me.down('form').getForm();
		var values = form.getValues();
		values.password = base64encode(values.password);
		if (form.isValid()) {
			if(values.saveAccount){
				window.localStorage.setItem('saveAccount', values.accountName);
			}else{
				window.localStorage.removeItem("saveAccount");
			}
			BusinessAdminAction.login(domainPrefix,values.accountName,values.password, function(actionResult) {
				me.setLoading(false);
				if (actionResult.success) {
					window.account = actionResult.data.operator;
					window.location.reload();
				} else {
					Ext.Msg.info(actionResult.message,function(){
						setTimeout(function(){
							me.down('#accountName').focus(true);
						}, 100);
					});
				}
			});
		} else {
			if (values.accountName == null || values.accountName == "") {
				Ext.Msg.info("请输入管理员帐号");
			} else if (values.password == null || values.password == "") {
				Ext.Msg.info("请输入管理员密码");
			}
			me.setLoading(false);
		}
	}
});
Ext.define('VIP.common.SignInViewport', {
	extend :  Ext.Viewport ,
	xtype : 'signinform',
	                                      
	layout : 'fit',
	createView : function() {
		var me = this;

		var items = [ {
			xtype : 'panel',
			border : false,
			width:'100%',
			layout : 'anchor',	
			items : [{
				xtype : 'box',
				height : '85px',
				anchor : '100%',
				html : '<div style="height:100%;background:#dfdfdf"><div style="height:5px;background:#444"></div><img style="height:100%" src="images/login-picture.png "></div>'
			},{
				xtype : 'box',
				anchor : '100% -175px',
				html : '<div style="position: absolute; z-index: 999; top:20%; left:20%"><p style="font-family:\'微软雅黑\';font-Size:24px;color:#fff;">便捷的使用体验，强大的会员管理</p></div><img style="width:100%;height:100%" src="images/world-wallpaper.jpg ">'
			},{
				xtype : 'box',
				height : '90px',
				anchor : '100%',
				html : '<div style="text-align: center;padding-top:20px;height:100%;background:#fff"><a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">产品主页</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">公司主页</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">关于我们</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">联系我们</a><br/><p>昆明泽天科技  &copy;2013 All Rights Reserved</p></div>'
			}]
			
		}];
		return items;
	},

	initComponent : function() {
		Ext.apply(this, {
			items : this.createView()
		});
		
		this.callParent(arguments);
		var loginWin = Ext.create('VIP.common.LoginWindow');
		loginWin.show();
		
		this.on('resize', function(viewport, newWidth, newHeight, oldWidth, oldHeight){
			if(newWidth<500){
				loginWin.setPosition(0, newHeight*0.2);
			}else {
				loginWin.setPosition(newWidth-500, newHeight*0.2);
			}
			
		}, this);
	}
	
});
Ext.define('VIP.operator.OperatorWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.operatorwindow' ],
	                                       
	layout : 'fit',
	width : 640,
	height : 480,
	modal : true,
	border : false,
	resizable:false,
	closable: false,  
	createButtons : function() {
		var me = this;

		var buttons = [ {
			text : '保存',
			icon : 'images/update.png',
			itemId : 'saveBtn',
			width : 90,
			handler : function(btn) {
				me.saveOperator();
			}
		}, {
			text : '取消',
			icon : 'images/cancel.png',
			width : 90,
			handler : function(btn) {
				me.destroy();
			}
		} ];

		return buttons;
	},

	createView : function() {
		var me = this;

		var items = [ {
			xtype : 'vipform',
			defaults : {
				margin : 5
			},
			layout : {
				type : 'anchor'
			},
			items : [ {
				xtype : 'fieldset',
				title : '基本信息',
				anchor : '100% 80%',
				defaults : {
					width : 275,
					labelAlign : 'right'
				},
				layout : {
					type : 'table',
					columns : 2
				},
				items : [{
					fieldLabel : '店铺',
					xtype : 'vcombo',
					name : 'shopId',
					allowBlank : false,
					colspan : 2,
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'ShopAction.listAsOption'
						};
					},
					listeners : {
						change : {
							fn : function(field, key, option) {
								me.down('#name').focus(true);
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '姓名',
					name : 'name',
					itemId :'name',
					allowBlank : false,
					maxLength : '15',
					maxLengthText : '不可超过15位',
					vtype : 'stringblank',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#accountName').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '用户名',
					name : 'accountName',
					itemId : 'accountName',
					maxLength : '15',
					maxLengthText : '不可超过15位',
					vtype : 'stringblank',
					allowBlank : false,
					validFlag : true,
					validator : function() {
						return this.validFlag;
					},
					listeners : {
						blur : function(field) {
							var me = this;
							OperatorAction.getOperatorByAccountName(field.getValue(), function(actionResult) {
								me.validFlag = actionResult.success ? '此用户名已被占用！' : true;
								me.validate();
							});
						},
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#password').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '密码',
					name : 'password',
					itemId : 'password',
					inputType : 'password',
					allowBlank : false,
					vtype : 'password',
					initialPassField : 'passwordAg',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#passwordAg').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '确认密码',
					name : 'passwordAg',
					itemId : 'passwordAg',
					inputType : 'password',
					allowBlank : false,
					vtype : 'password',
					initialPassField : 'password',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#idCardNumber').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'radiogroup',
					fieldLabel : '会员性别',
					columns : 3,
					items : [ {
						boxLabel : '男',
						name : 'sex',
						checked : true,
						inputValue : 'M'
					}, {
						boxLabel : '女',
						name : 'sex',
						inputValue : 'F'
					}, {
						boxLabel : '未知',
						name : 'sex',
						inputValue : 'U'
					} ]
				}, {
					xtype : 'textfield',
					fieldLabel : '身份证号',
					name : 'idCardNumber',
					itemId : 'idCardNumber',
					allowBlank : false,
					regex:/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2013)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/,
					regexText:'无效的身份证',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#mobile').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'datefield',
					fieldLabel : '生日',
					name : 'birthday',
					maxValue : new Date()
				}, {
					xtype : 'vcombo',
					fieldLabel : '教育程度',
					name : 'education',
					options : [ {
						text : '小学',
						value : '小学'
					}, {
						text : '初中',
						value : '初中'
					}, {
						text : '高中',
						value : '高中'
					}, {
						text : '大专',
						value : '大专'
					}, {
						text : '本科',
						value : '本科'
					}, {
						text : '硕士',
						value : '硕士'
					}, {
						text : '博士',
						value : '博士'
					}, {
						text : '其他',
						value : '其他'
					} ]
				}, {
					xtype : 'textfield',
					fieldLabel : '手机号',
					name : 'mobile',
					itemId : 'mobile',
					colspan : 2,
					allowBlank : false,
					regex:/^1[3|4|5|8][0-9]{9}$/,
					regexText:'无效的手机号码',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#address').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '地址',
					name : 'address',
					itemId : 'address',
					colspan : 2,
					maxLength : '30',
					maxLengthText : '不可超过30位',
					width : 550,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#notes').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textareafield',
					fieldLabel : '备注',
					name : 'notes',
					itemId : 'notes',
					maxLength : '140',
					maxLengthText : '不可超过140位',
					colspan : 2,
					width : 550
				}]
			}, {
				xtype : 'fieldset',
				title : '操作权限',
				anchor : '100% 20%',
				layout : {
					type : 'table',
					columns : 2
				},
				items : [{
					xtype : 'vcombo',
					name : 'operatorRuleId',
					fieldLabel : '角色',
					labelAlign : 'right',
					width : 275,
					allowBlank : false,
					getProxy : function() {
						return {
							type : 'direct',
							directFn : 'OperatorRuleAction.listAsOption'
						};
					},
					listeners : {
						change : function(field, newValue, oldValue){
							me.down('#saveBtn').setDisabled(newValue == 1);
						}
					}
				},{
					fieldLabel : '状态',
					xtype : 'vcombo',
					name : 'state',
					hidden : true,
					labelAlign : 'right',
					itemId:'state',
					options : [ {
						text : '正常',
						value : 1
					}, {
						text : '冻结',
						value : 0
					}, {
						text : '注销',
						value : -2
					} ],
					allowBlank : false,
					listeners : {
						change : {
							fn : function(field, key, option) {
								var value = field.getValue();
								if(value=="-2"){
									Ext.Msg.info("注销无可逆性,请慎重操作！");			
								}
							},
							delay : 200
						}
					}
				} ]
			}]
		} ];

		return items;
	},

	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			title : this.params.operatorId? '修改操作员' : '添加操作员',
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		
		setTimeout(function(){
			me.down('#name').focus(true);
		}, 500);
		
		if(this.params.operatorId){
			this.down('#password').hide();
			this.down('#passwordAg').hide();
			this.down('#state').show();
			this.load();
		}
	},
	load : function(){
		var me =this;
		OperatorAction.getOperatorById(this.params.operatorId, function(actionResult){
			me.down('vipform').getForm().setValues(actionResult.data);
		});
	},
	saveOperator : function(btn) {
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			if(this.params.operatorId){
				OperatorAction.editOperator(Ext.apply({
					operatorId : this.params.operatorId
				}, values), function(actionResult) {
					if (actionResult.success) {
						Ext.Msg.info('修改成功', function(){
							if(me.onSave){
								me.onSave.fn.call(me.onSave.scope);
							}
							me.destroy();
						});
					} else {
						Ext.Msg.error(actionResult.message);
					}
				});
			}else{
				OperatorAction.addOperator(values, function(actionResult) {
					if (actionResult.success) {
						Ext.Msg.info('添加成功.', function() {
							if (me.onSave) {
								me.onSave.fn.call(me.onSave.scope);
							}
							me.destroy();
						});
					} else {
						Ext.Msg.error(actionResult.message);
					}
				});
			}
			
		}
	}
});
Ext.define('VIP.security.OperatorRuleWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.operatorrulewindow' ],
	                                       
	layout : 'fit',
	width : 680,
	height : 540,
	title : '',
	modal : true,
	border : false,	
	resizable:false,
	closable: false,  
	params : {},
	createButtons : function() {
		var me = this;
		
		var buttons = [ {
			text : '保存',
			icon : 'images/update.png',
			width : 90,
			handler : function(btn) {
				if(me.params.ruleId != undefined){
					me.saveRule();
				} else {
					me.addRule();
				}
			}
		}, {
			text : '取消',
			icon : 'images/cancel.png',
			width : 90,
			handler : function(btn) {
				me.destroy();
			}
		} ];

		return buttons;
	},

	createView : function() {
		var me = this;

		var items = [{
			xtype : 'vipform',
			defaults : {
				margin : 5
			},
			layout : {
				type : 'anchor'
			},
			items : [{
				xtype : 'fieldset',
				title : '基本信息',
				anchor : '100% 30%',				
				defaults : {
					width : 500,
					labelAlign : 'right'
				},
				layout : {
					type : 'table',
					columns : 1
				},
				items : [ {
					xtype : 'textfield',
					fieldLabel : '名称',
					name : 'name',
					itemId:'name',
					vtype : 'stringblank',
					maxLength : '15',
					maxLengthText : '不可超过15位',
					allowBlank : false,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#description').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textarea',
					fieldLabel : '描述',
					name : 'description',
					itemId : 'description',
					maxLength : '140',
					maxLengthText : '不可超过140位',
					allowBlank : false
				}]					
			}, {
				xtype : 'fieldset',
				title : '操作权限',
				itemId : 'actions_fieldset',				
				autoScroll : true,				
				anchor : '100% 70%',
				padding : '5 10 10 40',
				layout : {
					type : 'vbox',
					align : 'stretch'
				},
				fieldDefaults : {
					labelWidth : 100
				},
				items : [{
					xtype : 'checkbox',
					boxLabel : '全选',
					listeners : {
						change : {
							fn : this.selectAll,
							scope : this
						}
					}
				}]
			}]
		}];

		return items;
	},
	
	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			title : this.params.ruleId? '修改权限组' : '添加权限组',
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		
		this.load();
		setTimeout(function(){
			me.down('#name').focus(true);
		}, 500);
	},

	load : function(){
		var me = this;
		OperatorRuleAction.findActions(function(dataStore){
			me.actions = dataStore.records;
			me.fillActions();
		});		
	},
	
	fillActions : function(){
		var me = this;
		var actions_fieldset = this.down('#actions_fieldset');		
		
		actions_fieldset.suspendLayout = true;
		for(var i=0; i<this.actions.length; i++){
			var r = this.actions[i];			

			var checkboxGroup = actions_fieldset.down('checkboxgroup[fieldLabel=' + r.category + ']');
			
			if(!checkboxGroup){
				checkboxGroup = Ext.create('Ext.form.CheckboxGroup', {
					fieldLabel : r.category,
					columns : 3,
					vertical : true,
					margin : '5 20 20 0',
					labelStyle : 'font-weight:bold',
					style : {
						borderBottom : '1px solid gray'
					}
				});
				actions_fieldset.add(checkboxGroup);
			}
			
			checkboxGroup.add({
				name : 'actions',
				inputValue : r.id,
				boxLabel : r.name
			});			
		}
		actions_fieldset.suspendLayout = false;
		actions_fieldset.doLayout();
		
		if(this.params.ruleId){
			OperatorRuleAction.findOperatorRuleById(this.params.ruleId, function(actionResult) {
				if (actionResult.success) {
					var data = actionResult.data;
					var actions =  new Array(); actionResult.data.length
					for(var i = 0 ; i<data.actions.length;i++){
						actions[i] = data.actions[i].id;
					}
					me.down('vipform').getForm().setValues({
						name : data.name,
						actions : actions,
						description : data.description
					});					
				} else {
					Ext.Msg.error(actionResult.message);
				}
			});
		}
	},
	
	selectAll : function(checkbox, value){
		var actions = this.query('checkbox[name=actions]');
		
		for(var i=0; i<actions.length; i++){
			actions[i].setValue(value == true);
		}		
	},
	
	addRule : function(btn){
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			values.actions = Ext.encode(values.actions);
			OperatorRuleAction.addOperatorRule(Ext.apply({
				businessId : window.account.businessId
			}, values), function(actionResult) {
				if (actionResult.success) {
					Ext.Msg.info('添加成功', function(){
						if(me.onSave){
							me.onSave.fn.call(me.onSave.scope);
						}
						me.destroy();
					});
				} else {
					Ext.Msg.error(actionResult.message);
				}
			});
		}
	},
	
	saveRule : function(btn){
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			values.actions = Ext.encode(values.actions);
			OperatorRuleAction.updateOperatorRule(Ext.apply({
				id : this.params.ruleId
			}, values), function(actionResult) {
				if (actionResult.success) {
					Ext.Msg.info('修改成功', function(){
						if(me.onSave){
							me.onSave.fn.call(me.onSave.scope);
						}
						me.destroy();
					});
				} else {
					Ext.Msg.error(actionResult.message);
				}
			});
		}
	}
});
Ext.define('VIP.shop.ShopWindow', {
	extend :  Ext.window.Window ,
	alias : [ 'widget.shopwindow' ],
	                                       
	layout : 'fit',
	width : 640,
	height : 280,
	border : false,
	resizable:false,
	modal : true,
	closable: false,  
	createView : function(){
		
	},
	
	createButtons : function() {
		var me = this;
		
		var buttons = [ {
			text : '保存',
			icon : 'images/update.png',
			width : 90,
			handler : function(btn) {
				me.saveShop();
			}
		}, {
			text : '取消',
			icon : 'images/cancel.png',
			width : 90,
			handler : function(btn) {
				me.destroy();
			}
		} ];

		return buttons;
	},

	createView : function() {
		var me = this;

		var items = [{
			xtype : 'vipform',
			defaults : {
				margin : 5
			},
			layout : {
				type : 'anchor'
			},
			items : [{
				xtype : 'fieldset',
				title : '基本信息',
				anchor : '100% 100%',
				defaults : {
					width : 275,
					labelAlign : 'right'
				},
				layout : {
					type : 'table',
					columns : 2
				},
				items : [ {
					xtype : 'textfield',
					fieldLabel : '店铺名',
					name : 'name',
					vtype : 'stringblank',
					maxLength : '15',
					maxLengthText : '不可超过15位',
					allowBlank : false,
					colspan : 2,
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#contactName').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '联系人',
					name : 'contactName',
					allowBlank : false,
					vtype : 'stringblank',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.down('#telephone').focus(true);
								}
							},
							delay : 200
						}
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '联系电话',
					name : 'telephone',
					allowBlank : false,
					regex:/^1[3|4|5|8][0-9]{9}$/,
					regexText:'无效的手机号码',
					listeners : {
						specialKey : {
							fn : function(field, key, option) {
								if (key.keyCode == 13) {
									me.saveShop();
								}
							},
							delay : 200
						}
					}
				},{
					xtype : 'textfield',
					fieldLabel : '分店地址',
					name : 'address',
					colspan : 2,
					width: 550,
					allowBlank : false
				},{
					xtype : 'numberfield',
					fieldLabel : '经度',
					name : 'longitude',
					allowBlank : false
				},{
					xtype : 'numberfield',
					fieldLabel : '纬度',
					name : 'latitude',
					allowBlank : false
				},{
					fieldLabel : '状　态',
					xtype : 'vcombo',
					hidden : true,
					name : 'state',
					itemId:'state',
					options : [ {
						text : '正常',
						value : '1'
					}, {
						text : '冻结',
						value : '0'
					}, {
						text : '注销',
						value : '-2'
					} ]
				} ]
			}]
		}];

		return items;
	},
	
	initComponent : function() {
		var me = this;
		Ext.apply(this, {
			title : this.params.shopId? '修改店铺' : '添加店铺',
			items : this.createView(),
			buttons : this.createButtons()
		});
		this.callParent(arguments);
		
		
		if(this.params.shopId){
			this.down('#state').show();
			this.load();
		}
	},
	load : function(){
		var me = this;
		ShopAction.findShopById(this.params.shopId, function(actionResult) {
			me.down('vipform').getForm().setValues(actionResult.data);
		});
	},
	saveShop : function(btn){
		var me = this;
		var form = this.down('vipform').getForm();
		if (form.isValid()) {
			var values = form.getValues();
			if(me.params.shopId){
				ShopAction.editShop(Ext.apply({
					id : me.params.shopId
				}, values), function(actionResult) {
					if (actionResult.success) {
						Ext.Msg.info('修改成功.', function() {
							if (me.onSave) {
								me.onSave.fn.call(me.onSave.scope);
							}
							me.destroy();
						});
					} else {
						Ext.Msg.error(actionResult.message);
					}
				});
			}else{
				values.state = "1";
				ShopAction.addShop(Ext.apply({
					businessId : window.account.businessId
				},values), function(actionResult) {
					if (actionResult.success) {
						Ext.Msg.info('添加成功.', function(){
							if(me.onSave){
								me.onSave.fn.call(me.onSave.scope);
							}
							me.destroy();
						});
					} else {
						Ext.Msg.error(actionResult.message);
					}
				});
			}
		}
	}
});
Ext.define('VIP.widget.Link', {
	extend :  Ext.Component ,
	alias : [ 'widget.link' ],
	requires : [],
	height : 30,
	padding : '6 20 6 20',	
	baseCls : 'x-link',
	initComponent : function() {
		if(this.icon){
			this.html = '<img src="'+this.icon+'"><span>' + this.text + '</span>';
		} else {
			this.html = '<span>' + this.text + '</span>';
		}		
		
		this.callParent(arguments);
		
		this.on('render', function(){
			this.getEl().on('mouseover', function(){
				this.addCls('x-boundlist-item-over');
			}, this);
			
			this.getEl().on('mouseout', function(){
				this.removeCls('x-boundlist-item-over');
			}, this);
			
			if(this.handler){
				this.getEl().on('click', function(){
					this.handler.call(this, this);
				}, this);
			}
		}, this);
	}
});
