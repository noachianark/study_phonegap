Ext.define('VIP.reports.store.AdminLog',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.reports.model.AdminLog'],
	model : 'VIP.reports.model.AdminLog',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'time',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'BusinessLogAction.findBusinessAdminLogs',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: false
});