/**
 * @class Business.controller.UserProfile
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.controller.UserProfile', {
    extend: 'Ext.app.Controller',
    requires:[
        'Business.view.Charge',
        'Business.view.Consume',
        'Business.view.Exchange'
    ],

    config: {
        refs:{
        	userview:"userprofile",
        	charge:'userprofile #charge',
        	consume:'userprofile #consume',
        	withdraw:'userprofile #withdraw',
        	exchange:'userprofile #exchange',
        	navi:"main",
            userRecords:'userrecords'
        },
        control:{
        	userview:{
        		updatedata:"updateinfo",
                initialize:function(){
                    var me = this;
                    this.getUserview().on("painted",function(){
                        me.getCharge().enable();
                        me.getConsume().enable();
                        me.getWithdraw().enable();
                        me.getExchange().enable();                        
                    });

                }
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

    disableAllBtn:function(){
        var me = this;
        me.getCharge().disable();
        me.getConsume().disable();
        me.getWithdraw().disable();
        me.getExchange().disable();
    },

    chargeAction:function(btn){
        this.disableAllBtn();
    	var charge = Ext.create('Business.view.Charge');
    	this.getNavi().push([charge]);
    },

    consumeAction:function(btn){
        this.disableAllBtn();
        var consume = Ext.create('Business.view.Consume');
        this.getNavi().push([consume]);
    },

    withdrawAction:function(){
        this.disableAllBtn();
        var withdraw = Ext.create('Business.view.Withdraw');
        this.getNavi().push([withdraw]);
    },

    exchangeAction:function(){
        this.disableAllBtn();
        var exchange = Ext.create('Business.view.Exchange');
        this.getNavi().push([exchange]);
    },

    //when view apply setData function , call this function to fill the data to children fields
    updateinfo:function(me, newData, eOpts){
        this.getUserview().setTitle("您好，"+newData.get('userName'));
    	this.getUserview().userinfo = newData;
		this.getUserview().down('#balance').setData({balance:newData.get('deposit')});
		this.getUserview().down('#credit').setData({credit:newData.get('totalPoint')});
		this.getUserview().down('#consumed').setData({consumed:newData.get('totalConsume')});
        //total deposit

		this.getUserview().down('#rebate').setData({rebate:newData.get('depositMoneyBackPercent')});
		this.getUserview().down('#discount').setData({discount:newData.get('discountPercent')});
		this.getUserview().down('#left_credit').setData({left_credit:newData.get('point')});
		this.getUserview().down('#rate').setData({rate:newData.get('pointPercent')});
        this.getUserview().down('#cardType').setData({type:newData.get('cardType')});
    }
});