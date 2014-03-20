Ext.define('VIP.card.CardGrid', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.cardgrid' ],
	requires : [ 'VIP.card.store.Card'],
	layout : 'fit',
	title : '会员等级管理',
	columns : [ {
        xtype: 'rownumberer',
        width: 50,
        align : 'center',
        text:'序列',
        sortable: false
	},{
		text : '类别名称',
		dataIndex : 'name',
		flex : 2
	}, {
		text : '充值返现百分比',
		dataIndex : 'depositMoneyBackPercent',
		flex : 1,
		renderer : function(value, metaData) {
			return value+"%";
		}
	}, {
		text : '折扣百分比',
		dataIndex : 'discountPercent',
		flex : 2,
		renderer : function(value, metaData) {
			return value+"%";
		}
	},{
		text : '积分百分比',
		dataIndex : 'pointPercent',
		flex : 2,
		renderer : function(value, metaData) {
			return value+"%";
		}
	},{
		text : '是否为默认',
		dataIndex : 'isDefault',
		flex : 1,
		renderer : function(value, metaData) {
			if (value==true) {
				metaData.style = 'color:#00FF00';
				return "√";
			}else{
				return "";
			}
		}
	}],

	createDockedItems : function(store) {
		var me = this;
		
		var topBar = {
			xtype : 'toolbar',
			dock : 'top',
			items : [ '->', {
				xtype : 'button',
				width : 100,
				icon:'images/update.png',
				itemId : 'default',
				text : '设为默认',
				disabled : true,
				handler : function(btn) {
					var name = me.getSelectionModel().getSelection()[0].raw.name;
					var id = me.getSelectionModel().getSelection()[0].raw.id;
					me.defaultdMembershpType(name,id);

					
				}
			},'-',{
				xtype : 'button',
				icon : 'images/add.png',
				width : 80,
				text : '增加',
				handler : function(btn) {
					me.addCardType();
				}
			}, '-', {
				xtype : 'button',
				icon : 'images/edit.png',
				width : 80,
				itemId : 'edit',
				text : '修改',
				disabled : true,
				handler : function(btn) {
					me.editCardType();
				}
			}, '-', {
				xtype : 'button',
				icon : 'images/delete.png',
				width : 80,
				itemId : 'delete',
				text : '删除',
				disabled : true,
				handler : function(btn) {
					me.deleteCardType();
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
	
	createStore : function() {
		var store = Ext.create('VIP.card.store.Card');
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
		this.on('itemdblclick', this.editCardType, this);
	},
	refresh : function() {
		this.getStore().reload();
	},
	defaultdMembershpType : function(name,id){
		var me = this;
		Ext.Msg.confirm("提示","确认将【"+name+"】设为默认等级！",function(r){
			if(r=="yes"){
				CardTypeAction.setDefaultCardType(window.account.businessId,id,function(actionResult){
					if (actionResult.success) {
						me.refresh();
					} else {
						Ext.Msg.error(actionResult.message);
					}
				});
			}
		});
		
	},
	resetButtonStatus : function(grid, selected) {
		if(selected.length == 1){
			this.down('#edit').setDisabled(false);
			this.down('#delete').setDisabled(false);
			this.down('#default').setDisabled(false);
		} else {
			this.down('#edit').setDisabled(true);
			this.down('#delete').setDisabled(true);
			this.down('#default').setDisabled(true);
		}
	},

	addCardType : function() {
		var me = this;
		var cardWindow = Ext.create('VIP.card.CardWindow', {
			params : {
				
			},
			onSave : {
				fn : me.refresh,
				scope : me
			}
		});
		cardWindow.show();
		
	},

	editCardType : function() {
		var me = this;
		var record = me.getSelectionModel().getSelection()[0];
		var id = record.raw.id;
		var cardWindow = Ext.create('VIP.card.CardWindow', {
			params : {
				cardTypeId : id
			},
			onSave : {
				fn : me.refresh,
				scope : me
			}
		});
		cardWindow.show();
		
	},
	
	deleteCardType : function() {
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var name = record.raw.name;

		var id = record.raw.id;
		CardTypeAction.countAllUsersForCardType(id,function(actionResult){
			var count = parseInt(actionResult.data.count);
			if(count>0){
				var cardWindow = Ext.create('VIP.card.DeleteCardWindow', {
					params : {
						cardTypeId : id,
						count : count
					},
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});
				cardWindow.show();
			}else{
				Ext.Msg.confirm('确认', '确认要删除会员种类[' + name + '] 吗？', function(r) {
					if (r == 'yes') {
						CardTypeAction.deleteCardTypeById(id,function(actionResult){
							if(actionResult.success){
								me.refresh();
							}else{
								Ext.Msg.error(actionResult.message);
							}
						});
					}
				}, this);
			}
		});
		
		
	}
});