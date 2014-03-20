Ext.define('VIP.message.model.Coupon', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		type : 'string'
	}, {
		name : 'title',
		type : 'string'
	}, {
		name : 'endDate',
		type : 'string'
	}, {
		name : 'startDate',
		type : 'string'
	}, {
		name : 'content',
		type : 'string'
	} ,{
		name :'createTime',
		type : 'string'
	}]
});