Ext.define('VIP.sms.model.MessageHistory',{
	extend: 'Ext.data.Model',
    fields: [
        {name: 'targetNumber',  type: 'string'},
        {name: 'content',   type: 'string'},
        {name: 'time', type: 'string'},
        {name: 'operatorName', type: 'string'},
        {name: 'shopName', type: 'string'}
    ]
});