Ext.define('VIP.card.model.Card', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'id',
		type : 'string'
	},{
		name : 'name',
		type : 'string'
	},{
		name : 'depositMoneyBackPercent',
		type : 'string'
	},{
		name : 'discountPercent',
		type : 'string'
	},{
		name : 'isDefault',
		type : 'boolean'
	},{
		name : 'pointPercent',
		type : 'string'
	},{
		name : 'description',
		type : 'string'
	}]
});