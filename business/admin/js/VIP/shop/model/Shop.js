Ext.define('VIP.shop.model.Shop', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		type : 'string'
	},{
		name : 'name',
		type : 'string'
	},{
		name : 'discountDescription',
		type : 'string'
	},{
		name : 'chargeWays',
		type : 'string'
	},{
		name : 'contactName',
		type : 'string'
	},{
		name : 'telephone',
		type : 'string'
	},{
		name : 'smsLimit',
		type : 'string'
	},{
		name : 'state',
		type : 'string'
	},{
		name : 'address',
		type : 'string'
	}]
});
