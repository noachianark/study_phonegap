Ext.define('VIP.system.model.MembershipType', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'vipCardTypeId',
		type : 'string'
	},{
		name : 'vipCardTypeName',
		type : 'string'
	},{
		name : 'moneyBackRate',
		type : 'string'
	},{
		name : 'discountRate',
		type : 'string'
	},{
		name : 'isDefault',
		type : 'boolean'
	},{
		name : 'pointRate',
		type : 'string'
	}]
});
