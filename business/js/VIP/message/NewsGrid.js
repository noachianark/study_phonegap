Ext.define('VIP.message.NewsGrid', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.newsgrid' ],
	requires : [ 'VIP.message.AddNewsWindow' ],
	layout : 'fit',
	icon : 'images/promotion.png',
	columns : [ {
        xtype: 'rownumberer',
        width: 50,
        text:'序列',
        align : 'center',
        sortable: false
	}, {
		text : '标题',
		dataIndex : 'title',
		flex : 2
	}, {
		text : '创建时间',
		dataIndex : 'publishTime',
		flex : 1
	}],
	createStore : function() {
		var store = Ext.create('VIP.message.store.News');
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
		var topBar = [{
			xtype : 'vipform',	
			defaults : {
				border : false
			},
			items : [{
				xtype : 'toolbar',
				dock : 'top',
				defaults : {
					xtype : 'textfield',
					labelAlign : 'right',
					labelWidth : 80
				},
				items : ['->', {
					xtype : 'button',
					text : '添加',
					icon : 'images/add.png',
					width : 80,
					handler : function(btn) {
						btn.up('newsgrid').addNews();
					}
				}, '-', {
					xtype : 'button',
					text : '修改',
					icon : 'images/edit.png',
					width : 80,
					itemId : 'edit',
					disabled : true,
					handler : function(btn) {
						btn.up('newsgrid').editNews();
					}
				}, {
					xtype : 'button',
					text : '删除',
					icon : 'images/delete.png',
					width : 80,
					itemId : 'delete',
					disabled : true,
					handler : function(btn) {
						btn.up('newsgrid').deleteNews();
					}
				} ]
			}]
		}];
		var bottomBar = {
			dock : 'bottom',
			xtype : 'pagingtoolbar',
			store : store,
			displayInfo : true,
			emptyMsg : "没有查询到数据"
		};

		return topBar.concat(bottomBar);
	},

	initComponent : function() {
		var store = this.createStore();		

		Ext.apply(this, {
			store : store,			
			dockedItems : this.createDockedItems(store)
		});
		this.on('selectionchange', this.onSelectChange, this.onSelectChange.scope);
		this.on('itemdblclick', this.editNews, this);
		this.callParent(arguments);
	},
	onSelectChange : function(grid, selected, eOpts) {
		if (selected.length != 0) {
			this.down("#edit").enable();
			this.down("#delete").enable();
		} else {
			this.down("#edit").disable();
			this.down("#delete").disable();
		}
	},
	refresh : function() {
		this.getStore().reload();
	},
	
	addNews : function(){
		var me = this;
		for(var i = 0 ; i<window.account.actionCodes.length;i++){
			if(window.account.actionCodes[i]=="News_Edit"){
				var win = Ext.create('VIP.message.AddNewsWindow', {
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});
				win.show();
			}
		}
		
	},
	
	editNews : function(){
		var me = this;
		for(var i = 0 ; i<window.account.actionCodes.length;i++){
			if(window.account.actionCodes[i]=="News_Edit"){
				var record = me.getSelectionModel().getSelection()[0];
				var messageId = record.raw.id;
				
				var win = Ext.create('VIP.message.EditNewsWindow', {
					messageId : messageId,
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});
				win.show();
			}
		}
		
	},
	
	deleteNews : function(){
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var title = record.raw.title;
		for(var i = 0 ; i<window.account.actionCodes.length;i++){
			if(window.account.actionCodes[i]=="News_Edit"){
				Ext.Msg.confirm('确认', '确认要删除信息 [' + title + '] 吗？', function(r) {
					if (r == 'yes') {
						var messageId = record.raw.id;
						MessageAction.deleteNews(messageId, function(actionResult) {
							if (actionResult.success) {
								me.refresh();
							} else {
								Ext.Msg.error(actionResult.message);
							}
						});
					}
				}, this);
			}
		}
		
	}
});