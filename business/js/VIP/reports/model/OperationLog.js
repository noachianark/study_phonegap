Ext.define('VIP.reports.model.OperationLog', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'time',
		type : 'string'
	}, {
		name : 'operatorName',
		type : 'string'
	}, {
		name : 'shopName',
		type : 'string'
	}, {
		name : 'description',
		type : 'string'
	} ]
});