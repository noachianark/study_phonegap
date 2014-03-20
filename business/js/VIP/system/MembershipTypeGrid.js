Ext.define('VIP.system.MembershipTypeGrid', {
	extend : 'Ext.grid.Panel',
	xtype : 'membershiptypegrid',
	requires : [ 'VIP.system.store.MembershipType', 'VIP.system.AddMembershipTypeWindow', 'VIP.system.EditMembershipTypeWindow','VIP.member.ChangeMemberType'],
	layout : 'fit',
	title : '会员等级维护',
	icon : 'images/level_management.png',
	columns : [ {
        xtype: 'rownumberer',
        width: 50,
        align : 'center',
        text:'序列',
        sortable: false
	},{
		text : '类别名称',
		dataIndex : 'vipCardTypeName',
		flex : 2
	}, {
		text : '充值返现百分比',
		dataIndex : 'moneyBackRate',
		flex : 1,
		renderer : function(value, metaData) {
			return value+"%";
		}
	}, {
		text : '折扣百分比',
		dataIndex : 'discountRate',
		flex : 2,
		renderer : function(value, metaData) {
			return value+"%";
		}
	},{
		text : '积分百分比',
		dataIndex : 'pointRate',
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
					var membershipTypeName = me.getSelectionModel().getSelection()[0].raw.vipCardTypeName;
					
					me.defaultdMembershpType(membershipTypeName);

					
				}
			},'-',{
				xtype : 'button',
				icon : 'images/add.png',
				width : 80,
				text : '增加',
				handler : function(btn) {
					me.addMembershipType();
				}
			}, '-', {
				xtype : 'button',
				icon : 'images/edit.png',
				width : 80,
				itemId : 'edit',
				text : '修改',
				disabled : true,
				handler : function(btn) {
					me.editMembershipType();
				}
			}, '-', {
				xtype : 'button',
				icon : 'images/delete.png',
				width : 80,
				itemId : 'delete',
				text : '删除',
				disabled : true,
				handler : function(btn) {
					me.deleteMembershipType();
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
		var store = Ext.create('VIP.system.store.MembershipType');
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
		this.on('itemdblclick', this.editMembershipType, this);
	},
	doSearch : function() {
		var params = this.getStore().getProxy().extraParams;

		if (!params) {
			params = {};
			this.getStore().getProxy().extraParams = params;
		}	
		this.getStore().loadPage(1);
	},
	refresh : function() {
		this.getStore().reload();
	},
	resetButtonStatus : function(grid, selected) {
		if (selected.length == 1) {
			var record = this.getSelectionModel().getSelection()[0].raw.isDefault;
			this.down('#edit').setDisabled(false);
			if(record=="false"){
				this.down('#delete').setDisabled(false);
				this.down('#default').setDisabled(false);
			}else{
				this.down('#delete').setDisabled(true);
				this.down('#default').setDisabled(true);
			}
			
		}
	},

	addMembershipType : function() {
		var me = this;
		MembershipTypeAction.canAddMembershipType(function(result){
			if(result.success){
				var addWindow = Ext.create('VIP.system.AddMembershipTypeWindow', {
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

	editMembershipType : function() {
		var me = this;
		MembershipTypeAction.canEditMembershipType(function(result){
			if(result.success){
				var record = me.getSelectionModel().getSelection()[0];
				var membershipTypeId = record.raw.vipCardTypeId;

				var editWindow = Ext.create('VIP.system.EditMembershipTypeWindow', {
					params : {
						membershipTypeId : membershipTypeId
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
	defaultdMembershpType : function(membershipTypeName){
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var vipCardTypeId = record.raw.vipCardTypeId;
		MembershipTypeAction.canDeleteMembershipType(function(result){
			if(result.success){
				Ext.Msg.confirm("提示","确认将【"+membershipTypeName+"】设为默认等级！",function(r){
					if(r=="yes"){
						MembershipTypeAction.setDefaultMembershipType(vipCardTypeId,function(actionResult){
							if (actionResult.success) {
								me.refresh();
							} else {
								Ext.Msg.error(actionResult.message);
							}
						});
					}
				});
			}else {
				Ext.Msg.error(result.message);
			}
		});
		
	},
	deleteMembershipType : function() {
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var name = record.raw.vipCardTypeName;

		var membershipTypeId = record.raw.vipCardTypeId;
		MembershipTypeAction.canDeleteMembershipType(function(result){
			if(result.success){
				MembershipTypeAction.countAllUsersForMembershipType(membershipTypeId,function(result){
					var membershipNumber = result.data.memberNumber;
					if(membershipNumber>0){
						var deleteWindow = Ext.create('VIP.system.DeleteMembershipTypeWindow', {
							params : {
								membershipTypeId : membershipTypeId,
								membershipNumber : membershipNumber
							},
							onSave : {
								fn : me.refresh,
								scope : me
							}
						});
						deleteWindow.show();
					}else{
						Ext.Msg.confirm('确认', '确认要删除会员种类[' + name + '] 吗？', function(r) {
							if (r == 'yes') {
			
								MembershipTypeAction.deleteMembershipTypeById(membershipTypeId,null, function(actionResult) {
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
			}else{
				Ext.Msg.error(result.message);
			}
		});
		
		
	}
});