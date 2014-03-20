Ext.define('VIP.message.model.News', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'id',
		type : 'string'
	}, {
		name : 'title',
		type : 'string'
	}, {
		name : 'content',
		type : 'string'
	} ,{
		name :'publishTime',
		type : 'string'
	}]
});