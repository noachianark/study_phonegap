Ext.define('VIP.message.CouponGrid', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.coupongrid' ],
	requires : [ 'VIP.message.AddCouponWindow' ],
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
		text : '优惠开始时间',
		dataIndex : 'startDate',
		flex : 1
	}, {
		text : '优惠结束时间',
		dataIndex : 'endDate',
		flex : 1
	},{
		text : '创建时间',
		dataIndex : 'createTime',
		flex : 1
	} ],
	createStore : function() {
		var store = Ext.create('VIP.message.store.Coupon');
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
				items : [ {
					xtype : 'datefield',
					fieldLabel:'开始时间',
					itemId : 'initDateFrom',
					vtype : 'daterange',
					endDateField : 'initDateTo'
				}, {
					xtype : 'label',
					text : '至'
				}, {
					xtype : 'datefield',
					itemId : 'initDateTo',
					vtype : 'daterange',
					startDateField : 'initDateFrom'
				},  {
					xtype : 'datefield',
					fieldLabel:'结束时间',
					itemId : 'expireDateFrom',
					vtype : 'daterange',
					endDateField : 'expireDateTo'
				}, {
					xtype : 'label',
					text : '至'
				}, {
					xtype : 'datefield',			
					itemId : 'expireDateTo',
					vtype : 'daterange',
					startDateField : 'expireDateFrom'
				}, {
					xtype : 'button',
					icon : 'images/search-16.png',
					text : '搜索',
					handler : function() {
						me.doSearch();
					}
				}, '->', {
					xtype : 'button',
					text : '添加',
					icon : 'images/add.png',
					width : 80,
					handler : function(btn) {
						btn.up('coupongrid').addCoupon();
					}
				}, '-', {
					xtype : 'button',
					text : '修改',
					icon : 'images/edit.png',
					width : 80,
					itemId : 'edit',
					disabled : true,
					handler : function(btn) {
						btn.up('coupongrid').editCoupon();
					}
				}, {
					xtype : 'button',
					text : '删除',
					icon : 'images/delete.png',
					width : 80,
					itemId : 'delete',
					disabled : true,
					handler : function(btn) {
						btn.up('coupongrid').deleteCoupon();
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
		this.on('itemdblclick', this.editCoupon, this);
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
	doSearch : function() {
		var startDateFrom = this.down('#initDateFrom').getSubmitValue();
		var startDateTo = this.down('#initDateTo').getSubmitValue();
		var endDateFrom = this.down('#expireDateFrom').getSubmitValue();
		var endDateTo = this.down('#expireDateTo').getSubmitValue();
		var params = this.getStore().getProxy().extraParams;
		var form = this.down('vipform').getForm();
		
		if (form.isValid()) {
			if (!params) {
				params = {};
				this.getStore().getProxy().extraParams = params;
			}
			if (startDateFrom != "") {
				params.startDateFrom = startDateFrom;
			} else {
				params.startDateFrom = undefined;
			}
			if (startDateTo != "") {
				params.startDateTo = startDateTo;
			} else {
				params.startDateTo = undefined;
			}
			if (endDateFrom != "") {
				params.endDateFrom = endDateFrom;
			} else {
				params.endDateFrom = undefined;
			}
			if (endDateTo != "") {
				params.endDateTo = endDateTo;
			} else {
				params.endDateTo = undefined;
			}
	/*		this.down('#initDateFrom').setValue();
			this.down('#initDateTo').setValue();
			this.down('#expireDateFrom').setValue();
			this.down('#expireDateTo').setValue();*/
			this.getStore().loadPage(1);
		}
		
	},
	refresh : function() {
		this.getStore().reload();
	},
	
	addCoupon : function(){
		var me = this;
		for(var i = 0 ; i<window.account.actionCodes.length;i++){
			if(window.account.actionCodes[i]=="Offer_Edit"){
				var win = Ext.create('VIP.message.AddCouponWindow', {
					onSave : {
						fn : me.refresh,
						scope : me
					}
				});
				win.show();
			}
		}
		
	},
	
	editCoupon : function(){
		var me = this;
		for(var i = 0 ; i<window.account.actionCodes.length;i++){
			if(window.account.actionCodes[i]=="Offer_Edit"){
				var record = me.getSelectionModel().getSelection()[0];
				var messageId = record.raw.id;
				
				var win = Ext.create('VIP.message.EditCouponWindow', {
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
	
	deleteCoupon : function(){
		var me = this;
		var record = this.getSelectionModel().getSelection()[0];
		var title = record.raw.title;
		for(var i = 0 ; i<window.account.actionCodes.length;i++){
			if(window.account.actionCodes[i]=="Offer_Edit"){
				Ext.Msg.confirm('确认', '确认要删除信息 [' + title + '] 吗？', function(r) {
					if (r == 'yes') {
						var messageId = record.raw.id;
						MessageAction.deleteCoupon(messageId, function(actionResult) {
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