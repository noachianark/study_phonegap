/**
 * @class Business.model.Session
 * @extends Ext.data.Model
 * Description
 */
Ext.define('Business.model.Session', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'accountName', type:'string' },
            {name: 'name',        type:'string' },
            {name: 'businessId',  type:"int"    },
            {name: 'shopId',      type:"int"    },
            {name: 'actionCodes',        type:"auto"   },
            {name: 'allowPublishCoupons',type:'boolean'},
            {name: 'allowPublishNews',   type:'boolean'},
            {name:'domain',type:'string'}
        ]
    }
});