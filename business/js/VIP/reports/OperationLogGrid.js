Ext.define('VIP.reports.OperationLogGrid', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.operationloggrid' ],
	requires : [ 'VIP.reports.store.OperationLog' ],
	icon : 'images/log_list.png',
	columns : [ {
        xtype: 'rownumberer',
        width: 50,
        text:'序列',
        align : 'center',
        sortable: false
	}, {
		text : '时间',
		dataIndex : 'time',
		flex : 2
		
	}, {
		text : '操作员',
		dataIndex : 'operatorName',
		flex : 1
	}, {
		text : '店铺名称',
		dataIndex : 'shopName',
		flex : 1
	}, {
		text : '操作内容',
		dataIndex : 'description',
		flex : 5
	} ],
	createStore : function() {
		var store = Ext.create('VIP.reports.store.OperationLog');
		var params = store.getProxy().extraParams;
		if (!params) {
			params = {};
			store.getProxy().extraParams = params;
		}
		if (window.account.businessId != null) {
			params.businessId = window.account.businessId;
		}
		if (window.account.shopId != null) {
			params.shopId = window.account.shopId;
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
			items : [ {
				xtype : 'toolbar',
				dock : 'top',
				items : [ {
					xtype : 'datefield',
					fieldLabel : '操作时间',
					emptyText : '开始时间',
					labelWidth : 60,
					itemId : 'start_date',
					vtype : 'daterange',
					maxValue:new Date(),
					endDateField : 'end_date'
				},{
					xtype : 'label',
					margin : '0 5 0 5',
					text : '至'
				}, {
					xtype : 'datefield',
					itemId : 'end_date',
					emptyText : '结束时间',
					vtype : 'daterange',
					maxValue: new Date(),
					startDateField : 'start_date'
				},{
					icon : 'images/search-16.png',
					text : '搜索',
					handler : function(btn) {
						btn.up('operationloggrid').doSearch();
					}
				} ]
			}]
		}];

		var bottomBar = {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
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
		store.on('load', function(){
			var result = this.getStore().getProxy().getReader().rawData;
			
			if(!result.success){
				Ext.Msg.error(result.message);
			}
		},this);
		this.callParent(arguments);
	},
	doSearch : function() {
		var startDate = this.down('#start_date').getSubmitValue();
		var endDate = this.down('#end_date').getSubmitValue();
		var params = this.getStore().getProxy().extraParams;
		var form = this.down('vipform').getForm();
		
		if (form.isValid()) {
			if(!params){
				params = {};
				this.getStore().getProxy().extraParams = params;
			}
			
			if(startDate){
				params.startDate = startDate;
			} else {
				params.startDate = undefined;
			}
			
			if(endDate){
				params.endDate = endDate;
			} else {
				params.endDate = undefined;
			}
			this.getStore().loadPage(1);
		}
		
	}
});