Ext.define('Business.model.User', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: "cardType", 		type: "string"},
            {name: "cardTypeId",  		type: "string"},
            {name: "deposit",       	type: "string"},
            {name: "depositMoneyBackPercent",  		type: "string"},
            {name: "discountPercent", 		type: "string"},
            {name: "id", 		type: "string"},
            {name: "point",			type: "string"},
            {name: "pointPercent",	type: "string"},
            {name: "state",  type: "string"},
            {name: "totalConsume",  type: "string"},
            {name: "totalDeposit",  type: "string"},
            {name: "totalPoint",  type: "string"},
            {name: "userEmail",  type: "string"},
            {name: "userName",  type: "string"},
            {name: "userTelephone",  type: "string"},
            {name: "qrString",type:'string'}
        ]
    }
});