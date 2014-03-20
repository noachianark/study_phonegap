Ext.define('VIP.member.store.ConsumerMember',{
	extend: 'VIP.store.BaseStore',
	requires:['VIP.store.BaseStore', 'VIP.member.model.ConsumerMember'],
	model: 'VIP.member.model.ConsumerMember',
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