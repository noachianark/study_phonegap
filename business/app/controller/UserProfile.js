/**
 * @class Business.controller.UserProfile
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.controller.UserProfile', {
    extend: 'Ext.app.Controller',

    config: {
        refs:{
        	userview:"userprofile",
        	charge:'userprofile #charge',
        	consume:'userprofile #consume',
        	withdraw:'userprofile #withdraw',
        	exchange:'userprofile #exchange',
        	navi:"main"
        },
        control:{
        	userview:{
        		initialize:function(){
        			//console.log("xxx");
        		},
        		updatedata:"updateinfo"
        	},
        	charge:{
        		tap:"chargeAction"
        	},
        	consume:{
        		tap:"consumeAction"
        	},
        	withdraw:{
        		tap:'withdrawAction'
        	},
        	exchange:{
        		tap:'exchangeAction'
        	}
        }
    },

    chargeAction:function(){
        console.log('asdasd');
        var charge = Ext.create('Business.view.Charge');
        //charge.userinfo = this.userinfo;
        this.getNavi().push([charge]);    	
    },

    consumeAction:function(){

    },

    withdrawAction:function(){

    },

    exchangeAction:function(){

    },

    //when view apply setData function , call this function to fill the data to children fields
    updateinfo:function(me, newData, eOpts){
    	this.getUserview().userinfo = newData;
		this.getUserview().down('#balance').setData({balance:newData.get('balance')});
		this.getUserview().down('#credit').setData({credit:newData.get('credit')});
		this.getUserview().down('#consumed').setData({consumed:newData.get('consumed')});

		this.getUserview().down('#rebate').setData({rebate:newData.get('rebate')});
		this.getUserview().down('#discount').setData({discount:newData.get('discount')});
		this.getUserview().down('#left_credit').setData({left_credit:newData.get('left_credit')});
		this.getUserview().down('#rate').setData({rate:newData.get('rate')});
    }
});