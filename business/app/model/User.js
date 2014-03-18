Ext.define('Business.model.User', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: "username", 		type: "string"},
            {name: "rebate",  		type: "string"},
            {name: "credit",       	type: "string"},
            {name: "balance",  		type: "string"},
            {name: "consumed", 		type: "string"},
            {name: "discount", 		type: "string"},
            {name: "rate",			type: "string"},
            {name: "left_credit",	type: "string"}
        ]
    }
});