Ext.define('VIP.reports.model.Member', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		type : 'string'
	}, {
		name : 'deposit',
		type : 'string'
	}, {
		name : 'totalDeposit',
		type : 'string'
	}, {
		name : 'totalConsume',
		type : 'string'
	},{
		name : 'point',
		type : 'string'
	},{
		name : 'totalPoint',
		type : 'string'
	}, {
		name : 'cardTypeId',
		type : 'string'
	}, {
		name : 'cardType',
		type : 'string'
	}, {
		name : 'userAccountName',
		type : 'string'
	}, {
		name : 'userName',
		type : 'string'
	}, {
		name : 'userEmail',
		type : 'string'
	}, {
		name : 'userTelephone',
		type : 'string'
	}]
});