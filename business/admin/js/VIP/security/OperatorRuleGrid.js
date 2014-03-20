Ext.define('VIP.security.OperatorRuleGrid', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.operatorrulegrid' ],
	requires : [ 'VIP.security.store.OperatorRule' ],
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