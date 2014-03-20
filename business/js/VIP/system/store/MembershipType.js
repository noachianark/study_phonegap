Ext.define('VIP.system.store.MembershipType',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.system.model.MembershipType'],
	model : 'VIP.system.model.MembershipType',
	sorters: [],
	remoteSort: true,
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'MembershipTypeAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});