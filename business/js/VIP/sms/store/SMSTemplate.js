Ext.define('VIP.sms.store.SMSTemplate',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.sms.model.SMSTemplate'],
	model: 'VIP.sms.model.SMSTemplate',
	remoteSort: true,
	pageSize: 50,
	sorters: [{
        property: 'type',
        direction: 'DESC'
    }],
	proxy : {
		type : 'direct',
		directFn : 'SMSTemplateAction.list',
		reader : {
			type : 'json',
			root : 'records'
		}
    },
    autoLoad: true
});