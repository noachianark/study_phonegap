/**
 * @class Business.controller.Consume
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.controller.Consume', {
    extend: 'Ext.app.Controller',
    requires: [
        'Business.view.ConsumeSuccess'
    ],

    config: {
        refs:{
        	navi:"main",
            userprofile:'userprofile',
        	panel:"consumepanel",
            consumefield:"consumepanel #consumefield",
            cardpayfield:'consumepanel #cardpayfield',
            cashpayfield:'consumepanel #cashpay',
            consumeBtn:'consumepanel #consume',
            returnBtn:'consumesuccess #returnBtn',
            successpanel:'consumesuccess'
        },
        control:{
        	panel:{
        		initialize:'initia'
        	},
        	consumefield:{
        		change:'consumeFieldChange'
        	},
        	cardpayfield:{
        		change:'cardpayFieldChange'
        	},
        	cashpayfield:{
        		change:'cashpayFieldChange'
        	},
            consumeBtn:{
                tap:'consumeAction'
            }
        }
    },

    initia:function(){
    	var balance = this.getUserprofile().userinfo.getData().balance;
    	var discount = this.getUserprofile().userinfo.getData().discount;
    	var rate = this.getUserprofile().userinfo.getData().rate;

    	this.rate = Number(rate?rate:0)/100;
    	this.discount = Number(discount?discount:0)/100;
    	this.balance = Number(balance?balance:0);
    	
    	this.getPanel().down('#discount').setData({discount:this.discount * 100});
    	
        this.setValue(0);
    },

    consumeAction:function(btn){
        btn.setDisabled(true);
    },

    consumeFieldChange:function(self, newValue, oldValue, eOpts){
        newValue = Number(newValue).toFixed(1);
        if(Number(newValue) == Number(oldValue)){
            return;
        }
    	var msg = "";
    	if(Number(newValue) < 0){
            msg+="消费金额不能为负数<br>";
            newValue = Math.abs(Number(newValue));
    	}
    	if(msg.length > 0){
    		Ext.Msg.alert("提示信息",msg);
    	}
    	this.consume = newValue;
    	
    	this.setValue(newValue);
    },

    cardpayFieldChange:function(self, newValue, oldValue, eOpts){
    	var msg = "";
        newValue = Number(newValue).toFixed(1);
        if(Number(newValue) > Number(this.payfor)){
            newValue = this.payfor;
        }        
    	var cash = Number(this.payfor) - Number(newValue);

    	if(Number(newValue) < 0){
    		msg+="支付金额不能为负数.<br>";
            newValue = Math.abs(Number(newValue));
    	}
    	if(Number(newValue) > Number(this.balance)){
    		msg+="余额不足，将使用现金支付不足部分.<br>";
            cash = Number(newValue) - Number(this.balance);
            newValue = Number(Number(this.balance));
    	}
    	if(msg.length > 0){
    		Ext.Msg.alert("提示信息",msg);
    	}
        self.setValue(newValue);
        this.getCashpayfield().setData({cashpay:cash});
        //this.getCashpayfield().dom.value(cash);
        var bal = (Number(this.balance) - Number(newValue)).toFixed(1);
        this.getPanel().down("#balance").setData({balance:bal});
    },

    cashpayFieldChange:function(self, newValue, oldValue, eOpts){
        // var msg = "";
        // newValue = Number(newValue).toFixed(1);
        // var card = (Number(this.payfor) - Number(newValue)).toFixed(1);
        // if(Number(newValue) > Number(this.payfor)){
        //     newValue = this.payfor;
        //     card = 0;
        // }
        
        // if(Number(newValue) + Number(this.balance) < Number(this.consume)){
        //     msg+="余额不足，请补充现金<br>";
        //     newValue = (Number(this.consume) - Number(this.balance)).toFixed(1);
        // }

        // if(Number(newValue) < 0){
        //     msg+="支付金额不能为负数.<br>";
        //     newValue = Math.abs(Number(newValue));
        // }

        // if(msg.length > 0){
        //     Ext.Msg.alert("提示信息",msg);
        // }



        // self.setValue(newValue);
        // console.log(this.getCardpayfield().element.dom);
        // //this.getCardpayfield().setValue(card);
        // //this.getCardpayfield().element.dom.value(card);
        // var bal = (Number(this.balance) - Number(card)).toFixed(1);
        // this.getPanel().down("#balance").setData({balance:bal});

    },

    setValue:function(consumed,cash){
    	var payfor = (Number(consumed) * ( 1- this.discount )).toFixed(1);
        this.payfor = payfor;
        this.getPanel().down("#payfor").setData({payfor:payfor});
        console.log("pay:"+payfor);
    	var bal = this.balance;
    	if(this.balance < Number(payfor) ){
    		//余额不足
    		this.getCardpayfield().setValue(Number(this.balance).toFixed(1));
    		var cashpay = (Number(payfor) - Number(this.balance)).toFixed(1);
    		this.getCashpayfield().setData({cashpay:cashpay});
    		bal = 0;
    	}else{
    		//余额充足
			this.getCashpayfield().setData({cashpay:0});
			var cardpay = Number(payfor).toFixed(1);
			this.getCardpayfield().setValue(cardpay);
    		
    	}
    	var credit =  Math.round(Number(payfor) * this.rate);
    	this.getPanel().down('#credit').setData({credit:credit});
    	this.getPanel().down('#balance').setData({balance:bal});
        this.getConsumefield().setValue(Number(consumed));
    }

});