Ext.define('VIP.reports.model.AdminLog', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'time',
		type : 'string'
	}, {
		name : 'businessAdminName',
		type : 'string'
	}, {
		name : 'shopName',
		type : 'string'
	}, {
		name : 'description',
		type : 'string'
	} ]
});