Ext.define('VIP.member.store.CashCouponManage',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.member.model.CashCouponManage'],
	model: 'VIP.member.model.CashCouponManage',
	proxy : {
		type : 'direct',
		directFn : 'DepositAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});