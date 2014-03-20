Ext.define('VIP.member.model.ConsumeSummary', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'year',
		type : 'string'
	}, {
		name : 'month',
		type : 'string'
	}, {
		name : 'yearMonth',
		type : 'string'
	}, {
		name : 'consumeTotal',
		type : 'number'
	}]
});