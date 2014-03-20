Ext.define('VIP.operator.OperatorGrid', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.operatorgrid' ],
	requires : [ 'VIP.operator.store.Operator' ],
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
			items : ['->',{
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
				text : '删除',
				icon : 'images/delete.png',
				width : 80,
				itemId : 'delete',
				disabled : true,
				handler : function(btn) {
					btn.up('operatorgrid').deleteOperator();
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
	
	addOperator : function(){
		var me = this;
		var shopWindow = Ext.create('VIP.operator.OperatorWindow', {
			params : {
				
			},
			onSave : {
				fn : me.refresh,
				scope : me
			}
		});
		shopWindow.show();
	},

	editOperator : function(){
		var me = this;
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
		
	},
	
	deleteOperator : function(){
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
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
		
	}
});