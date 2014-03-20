Ext.define('VIP.member.store.Member',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.member.model.Member'],
	model : 'VIP.member.model.Member',
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
    autoLoad: true
});