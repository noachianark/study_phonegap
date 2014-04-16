/**
 * @class Business.app.Coupon
 * @extends Ext.data.Store
 * Description
 */
Ext.define('Business.store.Coupon', {
    extend: 'Business.store.BaseStore',
    requires: [
        'Business.model.Coupon'
    ],

    config: {
        model:'Business.model.Coupon',
        autoLoad:false,
        clearOnpageLoad:false,
        pageSize:8,
        proxy:{
        	type:'direct',
        	limitParam:'limit',
        	pageParam:'page',
        	directFn:'PMessageAction.findCoupons',
        	reader : {
        		type:'json',
        		rootProperty:'records'
        	}
        },
        listeners:{
        	beforeload:{
				fn:function(store, records, isSuccessful){
					store.getProxy().setExtraParams({
						businessId:Business.app.userinfo.get('businessId')+'',
						sort:[{property:'createTime',direction:'DESC'}]
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