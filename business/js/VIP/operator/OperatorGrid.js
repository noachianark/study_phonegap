Ext.define('VIP.operator.OperatorGrid', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.operatorgrid' ],
	requires : [ 'VIP.operator.store.Operator', 'VIP.operator.AddOperatorWindow', 'VIP.operator.EditOperatorWindow' ],
	title : '',
	layout : 'fit',
	title : '操作员管理',
	icon : 'images/operator_management.png',
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
	},/* {
		text : '操作员编号',
		dataIndex : 'operatorNumber'
	},*/ {
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
/*				metaData.style = 'color:#0F0';*/
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
				}/*, {
					text : '已注销',
					value : '-2'
				}*/]
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
		/*this.down('#name').setValue();
		this.down('#shopId').setValue();
		this.down('#state').setValue();
		this.down('#accountName').setValue();*/
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
				var addWindow = Ext.create('VIP.operator.AddOperatorWindow', {
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});
				
				addWindow.show();
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
				
				if(operatorId != 1){
					OperatorAction.getOperatorById(operatorId, function(actionResult){
						var editWindow = Ext.create('VIP.operator.EditOperatorWindow', {
							params : {
								operatorId : operatorId,
								actionResult : actionResult.data
							},
							onSave : {
								fn : me.refresh,
								scope : me
							}
						});
						
						editWindow.show();
					});
					
				}
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