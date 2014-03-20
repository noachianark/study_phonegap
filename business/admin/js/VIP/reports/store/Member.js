Ext.define('VIP.reports.store.Member',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.reports.model.Member'],
	model : 'VIP.reports.model.Member',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'userName',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'BVipCardAction.findVipCards',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: false
});