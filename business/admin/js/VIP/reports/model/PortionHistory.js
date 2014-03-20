Ext.define('VIP.reports.model.PortionHistory', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'transactionNumber',
		type : 'string'
	}, {
		name : 'userId',
		type : 'string'
	}, {
		name : 'userName',
		type : 'string'
	}, {
		name : 'time',
		type : 'string'
	}, {
		name : 'notes',
		type : 'string'
	}, {
		name : 'operatorName',
		type : 'string'
	}, {
		name : 'shopName',
		type : 'string'
	}, {
		name : 'shopState',
		type : 'string'
	}, {
		name : 'balance',
		type : 'string'
	}, {
		name : 'totalPoint',
		type : 'string'
	}, {
		name : 'currentPoint',
		type : 'string'
	}]
});