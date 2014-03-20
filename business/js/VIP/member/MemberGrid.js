Ext.define('VIP.member.MemberGrid', {
	extend : 'Ext.grid.Panel',
	alias : [ 'widget.membergrid' ],
	requires : ['VIP.member.store.Member'],
	margin : 5,
	columns : [ {
        xtype: 'rownumberer',
        width: 50,
        align : 'center',
        text:'序列',
        flex : 1,
        sortable: false
	},{
		text : 'Email',
		dataIndex : 'userEmail',
		flex : 2
	},{
		text : '会员电话',
		dataIndex : 'userTelephone',
		flex : 2
	}, {
		text : '会员昵称',
		dataIndex : 'userName',
		flex : 2
	}, {
		text : '级别',
		dataIndex : 'cardType',
		flex : 1
	} ],
	
	createDockedItems : function(store) {
		var dockedItems = [ {
			xtype : 'pagingtoolbar',
			dock : 'bottom',
			store : store,
			displayInfo : true,
			displayMsg : '',
			emptyMsg : ''
		} ];

		return dockedItems;
	},
	createStore : function() {
		var store = Ext.create('VIP.member.store.Member');
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

		this.on('selectionchange', this.onSelectChange.fn, this.onSelectChange.scope);
		
		store.on('load', function(){
			var result = this.getStore().getProxy().getReader().rawData;
			
			if(!result.success){
				Ext.Msg.error(result.message);
			}
		},this);

		this.callParent(arguments);
	},
	refresh : function() {
		this.getStore().reload();
	},
	doQuery : function(values) {
		var params = this.getStore().getProxy().extraParams;
		var me = this;
		if (!params) {
			params = {};
			this.getStore().getProxy().extraParams = params;
		}
		
		if (values.userName != "") {
			params.userName = values.userName;
		} else {
			params.userName = undefined;
		}		
		if(values.userTelephone != ""){
			params.userTelephone = values.userTelephone;
		} else {
			params.userTelephone = undefined;
		}	
		
		if(values.userEmail != ""){
			params.userEmail = values.userEmail;
		} else {
			params.userEmail = undefined;
		}
		this.getStore().loadPage(1);
		
	}
});