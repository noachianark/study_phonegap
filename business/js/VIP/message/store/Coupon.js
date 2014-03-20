Ext.define('VIP.message.store.Coupon',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.message.model.Coupon'],
	model : 'VIP.message.model.Coupon',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'createTime',
        direction: 'DESC'
    }],
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'MessageAction.findCoupons',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});