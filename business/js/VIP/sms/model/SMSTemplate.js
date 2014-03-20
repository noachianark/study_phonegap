Ext.define('VIP.sms.model.SMSTemplate',{
	extend: 'Ext.data.Model',
    fields: [
        {name: 'content',  type: 'string'},
        {name: 'type',   type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'id',  type: 'string'}
    ]
});