Ext.define('VIP.member.store.MemberInfo',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.member.model.Member'],
	model : 'VIP.member.model.Member',
	sorters: [{
        property: 'userName',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'BVipCardAction.getVipCardById',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});