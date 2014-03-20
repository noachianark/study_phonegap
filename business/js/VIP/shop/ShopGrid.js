Ext.define('VIP.shop.ShopGrid', {
	extend : 'Ext.grid.Panel',
	xtype : 'shopgrid',
	requires : [ 'VIP.shop.store.Shop', 'VIP.shop.AddShopWindow',
			'VIP.shop.EditShopWindow' ],
	layout : 'fit',
	title : '连锁分店管理',
	icon : 'images/shop_management.png',
	columns : [  {
		        xtype: 'rownumberer',
		        width: 50,
		        align : 'center',
		        text:'序列',
		        sortable: false
	},/*{
		text : '店铺编号',
		dataIndex : 'id',
		flex : 1
	}, */{
		text : '店铺名称',
		dataIndex : 'name',
		flex : 2
	}, /*{
		text : '折扣说明',
		dataIndex : 'discountDescription',
		flex : 2
	},*/ {
		text : '收费方式',
		dataIndex : 'chargeWays',
		flex : 1
	}, {
		text : '联系人',
		dataIndex : 'contactName',
		flex : 1
	}, {
		text : '联系电话',
		dataIndex : 'telephone',
		flex : 2
	}/*, {
		text : '短信余量',
		dataIndex : 'smsLimit',
		flex : 1,
		renderer : function(value, metaData) {
			if (value == 'null') {
				return 0;
			}else{
				return value;
			}
		}
	}*/, {
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
			items : [ {
				xtype : 'vcombo',
				emptyText : '选择状态',
				fieldLabel : '状态',
				labelWidth : 30,
				width : 125,
				margin : '0 5 0 10',
				itemId : 'state',
				options : [ {
					text : '全部',
					value : ''
				}, {
					text : '正常',
					value : '1'
				}, {
					text : '冻结',
					value : '0'
				}]/*,
				listeners : {
					change : {
						fn : function(field, key, option) {
							me.doSearch();
						},
						delay : 200
					}
				}*/
			}, {
				xtype : 'button',
				icon : 'images/search-16.png',
				text : '搜索',
				width : 70,
				handler : function(btn) {
					btn.up('shopgrid').doSearch();
				}
			}, '->', '-', {
				xtype : 'button',
				icon : 'images/add.png',
				width : 80,
				text : '增加',
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
			}/*, '-', {
				xtype : 'button',
				icon : 'images/delete-16.png',
				width : 80,
				itemId : 'delete',
				text : '删除',
				disabled : true,
				handler : function(btn) {
					btn.up('shopgrid').deleteShop();
				}
			} */]
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
		return store;
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
		this.on('itemdblclick', this.editShop, this);
	},
	doSearch : function() {		
		var state = this.down('#state').getValue();

		var params = this.getStore().getProxy().extraParams;

		if (!params) {
			params = {};
			this.getStore().getProxy().extraParams = params;
		}		

		if (state != "") {
			params.state = state;
		} else {
			delete params.state;
		}
		/*this.down('#state').setValue();*/
		this.getStore().loadPage(1);
	},
	refresh : function() {
		this.getStore().reload();
	},
	resetButtonStatus : function(grid, selected) {
		if (selected.length == 1) {
			var record = this.getSelectionModel().getSelection()[0];
			this.down('#edit').setDisabled(false);/*
			this.down('#delete').setDisabled(false);*/
		}
	},

	addShop : function() {
		var me = this;
		ShopAction.canAddShop(function(result){
			if(result.success){
				var addWindow = Ext.create('VIP.shop.AddShopWindow', {
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

	editShop : function() {
		var me = this;
		ShopAction.canAddShop(function(result){
			if(result.success){
				var record = me.getSelectionModel().getSelection()[0];
				var shopId = record.data.id;

				var editWindow = Ext.create('VIP.shop.EditShopWindow', {
					params : {
						shopId : shopId
					},
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});
				editWindow.show();
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
	},
	deleteShop : function() {
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var name = record.raw.name;

		Ext.Msg.confirm('确认', '确认要删除店铺[' + name + '] 吗？', function(r) {
			if (r == 'yes') {

				var shopId = record.raw.id;

				ShopAction.deleteShop({
					shopId : shopId
				}, function(actionResult) {
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