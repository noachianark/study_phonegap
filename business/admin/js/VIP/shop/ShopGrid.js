Ext.define('VIP.shop.ShopGrid', {
	extend : 'Ext.grid.Panel',
	xtype : 'shopgrid',
	requires : ['VIP.shop.store.Shop'],
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