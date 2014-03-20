Ext.define('VIP.admin.AdminGrid', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.admingrid' ],
	requires : [ 'VIP.admin.store.Admin' ],
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
				text : '删除',
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
		Ext.Msg.confirm('确认', '确认要删除Admin账号:[' + accountName + '] 吗？', function(r) {
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