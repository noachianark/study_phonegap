Ext.define('VIP.member.store.ConsumeSummary',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.member.model.ConsumeSummary'],
	model : 'VIP.member.model.ConsumeSummary',
	sorters: [],
	proxy : {
		type : 'direct',
		directFn : 'BVipCardAction.getConsumeGroupByMonth',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: false
});