Ext.define('VIP.reports.model.DepositHistory', {
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
		name : 'realAmount',
		type : 'string'
	}, {
		name : 'rewardAmount',
		type : 'string'
	}, {
		name : 'time',
		type : 'string'
	}, {
		name : 'notes',
		type : 'string'
	}, {
		name : 'currentDeposit',
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
	}]
});