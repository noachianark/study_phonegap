Ext.define('VIP.sms.StaticSmsContent', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.staticsmscontent' ],
	requires : [ 'VIP.sms.store.SMSTemplate','VIP.sms.AddStaticSMSContent','VIP.sms.EditStaticSMSContent' ],
	layout : 'fit',
	isChose:null,
//	title : '短信内容管理',
	
	columns : [  {
		text : '名称 ',
		dataIndex : 'name',
		flex : 2
	},{
		text : '短信模板内容',
		dataIndex : 'content',
		flex : 6
	}],
	createStore : function() {
		var store = Ext.create('VIP.sms.store.SMSTemplate');
		var params = store.getProxy().extraParams;
		params.type = '0';
		return store;
	},
	createDockedItems : function(store) {
		var me=this;
		var topBar = {
			xtype : 'toolbar',
			dock : 'top',			
			items : [ '->', {
				xtype : 'button',
				text : '添加',
				hidden :me.isChose==true,
				icon : 'images/add-16.png',
				width : 80,
				handler : function(btn) {
					Ext.create('VIP.sms.AddStaticSMSContent', {
						frame: true,
						onSave : {
							fn : function(){
								me.refresh();
							},
							scope : this
						}
					}).show();
				}
			}, '-', {
				xtype : 'button',
				text : '修改',
				icon : 'images/edit-16.png',
				width : 80,
				hidden :me.isChose==true,
				itemId : 'edit',
				disabled : true,
				handler : function(btn) {
					me.editStaticSMSConten();
				}
			},{
				xtype : 'button',
				text : '确定',
				icon : 'images/ok-16.png',
				width : 80,
				hidden :me.isChose!=true,
				itemId : 'ok',
				disabled : true,
				handler : function(btn) {
					me.choseContent();
				}
			}, '-', {
				xtype : 'button',
				text : '删除',
				icon : 'images/delete-16.png',
				width : 80,
				hidden :me.isChose==true,
				itemId : 'delete',
				disabled : true,
				handler : function(btn) {
					var records=me.getSelectionModel().selected;
					var id=records.get(0).data.id;
					Ext.Msg.confirm('确认', '确认要删除该短信模板（id='+id+'）吗?',
							function(r) {
								if (r == 'yes') {
									SMSTemplateAction.deleteTemplate({
										id : id
									},function(actionResult){
										Ext.Msg.info(actionResult.message);
										me.refresh();
									});
								}
					});
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
		this.on('celldblclick', this.dodbClick, this);
	},
	resetButtonStatus : function(grid, selected){
		if(selected.length == 0){
			this.down('#edit').setDisabled(true);
			this.down('#delete').setDisabled(true);
			this.down('#ok').setDisabled(true);
		} else {
			this.down('#edit').setDisabled(false);
			this.down('#delete').setDisabled(false);
			this.down('#ok').setDisabled(false);
		}
	},
	dodbClick:function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts ){
		if(this.isChose){
			this.choseContent();
		}else{
			this.editStaticSMSConten();
		}
		
	},
	choseContent:function(){
		var me=this;
		var records=me.getSelectionModel().selected;
		var content=records.get(0).data.content;
		if(me.setContent){
			me.onClose.fn.call(me.onClose.scope);
			me.setContent.fn.call(me.setContent.scope, content);
		}
	},
	editStaticSMSConten:function(){
		var me=this;
		var records=me.getSelectionModel().selected;
		var id=records.get(0).data.id;
		var editsmscontent=Ext.create('VIP.sms.EditStaticSMSContent', {
			frame: true,
			id:id,
			onLoad : {
				fn : function(){
					SMSTemplateAction.getTemplate({
						id : id,
						type:'0'
					},function(actionResult){
						editsmscontent.down('vipform').getForm().setValues(actionResult.data);
					});
				},
				scope : this
			},
			onSave : {
				fn : function(){
					me.refresh();
				},
				scope : this
			}
		}).show();
	},
	refresh:function(){
		this.getStore().reload();
		this.down('#edit').setDisabled(true);
		this.down('#delete').setDisabled(true);
	}
});