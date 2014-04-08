/**
 * @class Business.store.Stream
 * @extends Ext.data.Store
 * Description
 */
Ext.define('Business.store.Stream', {
    extend: 'Business.store.BaseStore',
    requires: [
        'Business.model.Stream'
    ],

	config : {
		model : 'Business.model.Stream',
		autoLoad: false,
		clearOnPageLoad: false,
		pageSize: 2,
		// grouper : {
		// 	groupFn : function(record) {
				
		// 	}
		// },
		proxy : {
			type : 'direct',
			limitParam: 'limit',
			pageParam: 'page',
			directFn : PMessageAction.findNews,
			reader : {
				type : 'json',
				rootProperty : 'records'
			}
	    },
	 	// data:{
	 		
	 	// 		title:'xxx'
	 		
	 	// },
		autoLoad : false,
		listeners:{
			beforeload:{
				fn:function(store, records, isSuccessful){
					console.log("lalal");
					store.getProxy().setExtraParams({
						businessId:Business.app.userinfo.get('businessId')+'',
						sort:[{property:'publishTime',direction:'DESC'}]
					});
				    var pageSize = store.getPageSize();
				    var pageIndex = store.currentPage - 1;    // Page numbers start at 1

				    if(isSuccessful && records.length < pageSize)
				    {
				        //Set count to disable 'loading' message
				        var totalRecords = pageIndex * pageSize + records.length;
				        store.setTotalCount(totalRecords);
				    }
				    else
				        store.setTotalCount(null);					
				}
			}
		}
	}
});