/**
 * @class Business.store.User
 * @extends Ext.data.Store
 * Description
 */
Ext.define('Business.store.User', {
    extend: 'Ext.data.Store',
    requires:[
    	'Business.model.User'
    ],
    config: {
        model:'Business.model.User',
        data : 
			{
				username: "gospelark",
				rebate: "5",
				credit:"249",
				balance:"49",
				consumed:'37',
				discount:'10',
				rate:'1',
				left_credit:'159'
			}
		
    }
});