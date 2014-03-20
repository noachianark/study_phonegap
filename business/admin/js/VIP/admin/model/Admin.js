Ext.define('VIP.admin.model.Admin', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		type : 'string'
	},{
		name : 'accountName',
		type : 'string'
	},{
		name : 'email',
		type : 'string'
	},{
		name : 'description',
		type : 'string'
	},{
		name : 'name',
		type : 'string'
	}]
});