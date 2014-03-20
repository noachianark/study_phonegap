Ext.define('VIP.search.MemberGrid', {
	extend : 'VIP.member.MemberGrid',
	alias : [ 'widget.searchmembergrid' ],
	
	initComponent : function() {
		this.on('itemdblclick', this.onRecordSelect.fn, this.onRecordSelect.scope);
		this.on('selectionchange', this.onSelectChange.fn, this.onSelectChange.scope);
		
		this.callParent(arguments);
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