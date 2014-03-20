Ext.define('VIP.admin.store.Admin',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.admin.model.Admin'],
	model : 'VIP.admin.model.Admin',
	sorters: [],
	remoteSort: true,
	pageSize: 50,
	proxy : {
		type : 'direct',
		directFn : 'BusinessAdminAction.findBusinessAdmins',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});