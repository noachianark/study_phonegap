Ext.define('VIP.reports.model.ConsumeHistory', {
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
		name : 'consumeSubject',
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
		name : 'consumptionAmount',
		type : 'string'
	}, {
		name : 'discount',
		type : 'string'
	}, {
		name : 'accountPayable',
		type : 'string'
	}, {
		name : 'cashPayment',
		type : 'string'
	}, {
		name : 'bankCardPaymant',
		type : 'string'
	}, {
		name : 'cardPayment',
		type : 'string'
	}, {
		name : 'changeAmount',
		type : 'string'
	}, {
		name : 'currentDeposit',
		type : 'string'
	} ]
});