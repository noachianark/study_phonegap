Ext.define('VIP.member.model.CashCouponManage', {
	extend : 'Ext.data.Model',
	fields : [ {
		name : 'target_number',
		type : 'string'
	}, {
		name : 'content',
		type : 'int'
	}, {
		name : 'time',
		type : 'datetime'
	}, {
		name : 'operator_name',
		type : 'string'
	}, {
		name : 'shop_name',
		type : 'string'
	}, {
		name : 'phoneCount',
		type : 'int'
	}, {
		name : 'smsCount',
		type : 'int'
	} ]
});