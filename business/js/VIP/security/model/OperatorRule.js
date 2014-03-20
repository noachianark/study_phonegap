Ext.define('VIP.security.model.OperatorRule', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'name',
		type : 'string'
	}, {
		name : 'actions',
		type : 'string'
	}, {
		name : 'actionsStr',
		type : 'string'
	}, {
		name : 'description',
		type : 'string'
	}]
});