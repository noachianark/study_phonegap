/**
 * @class Business.model.Session
 * @extends Ext.data.Model
 * Description
 */
Ext.define('Business.model.Session', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'username', type: 'string'},
            {name: 'password', type:'string'},
            {name: 'business_id', type:"int"},
            {name: 'shop_id',type:"int"}
        ],

        validations: [
            {type: 'length',  field: 'username', min : 1},
            {type: 'length',  field: 'password', min : 1}
        ]
    }
});