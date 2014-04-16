Ext.define('Business.model.Coupon', {
    extend: 'Ext.data.Model',

    config: {
        fields:[
        	{name:'title',type:'string'},
        	{name:'startDate',type:'string'},
        	{name:'endDate',type:'string'},
        	{name:'content',type:'string'},
        	{name:'love',type:'string'},
        	{name:'pictureUrl',type:'string'}
        ]
    }
});