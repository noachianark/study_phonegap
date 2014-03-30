/**
 * @class Business.controller.Consume
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.controller.Consume', {
    extend: 'Ext.app.Controller',
    requires: [
        'Business.view.ConsumeSuccess',
        'Business.store.Consume'
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
            consumeBtn:{
                tap:'consumeAction'
            },
            successpanel:{
                updatedata:'successful'
            },
            returnBtn:{
                tap:'confirmAction'
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
        var me = this;
        console.log(this.getPanel().getValues());
        var store = Ext.create('Business.store.Consume');

        Ext.Viewport.setMasked({
            xtype:'loadmask',
            message:'扣款中请稍后...'
        });

        store.load({
            scope:this,
            callback:function(records,operation,success){
                var task = Ext.create('Ext.util.DelayedTask',function(){
                    if(success){
                        if(records[0].data.success){
                            me.consumeSuccess();
                        }else{
                            Ext.Msg.alert("信息","这里是错误信息");
                        }
                    }
                    Ext.Viewport.setMasked(false);
                },this);

                task.delay(1000);
            }
        });

    },

    consumeSuccess:function(){
        var me = this;
        var user = this.getUserprofile().userinfo.getData().username;
        var successpanel = Ext.create('Business.view.ConsumeSuccess');
        successpanel.setData({
            balance : Number(this.balance)-Number(this.consume),
            consume : this.consume,
            username: user
        });

        me.getNavi().push([successpanel]);
        me.getNavi().getNavigationBar().leftBox.query('button')[0].hide();
    },

    successful:function(self, newData, eOpts){
        var data = this.getUserprofile().userinfo.getData();
        data.balance = this.getPanel().down('#balance').getData().balance;
        data.consumed = Number(data.consumed) + Number(newData.consume);
        data.credit = Number(data.credit) + Number(this.getPanel().down('#credit').getData().credit);
        data.left_credit = Number(data.left_credit) + Number(this.getPanel().down('#credit').getData().credit);

        var userinfo = Ext.create('Business.model.User');
        userinfo.setData(data);
        this.getUserprofile().setData(userinfo);

        this.getSuccesspanel().down('#consume-username').setData({username:newData.username});
        this.getSuccesspanel().down('#consume-balance').setData(this.getPanel().down('#balance').getData());
        this.getSuccesspanel().down('#consume-consume').setData({consume:newData.consume});
    },

    confirmAction:function(){
        this.getNavi().pop(2);
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
            //this.afterpay = 0;
    	}else{
    		//余额充足
			this.getCashpayfield().setData({cashpay:0});
			var cardpay = Number(payfor).toFixed(1);
			this.getCardpayfield().setValue(cardpay);
    		bal = Number(this.balance) - Number(payfor);
    	}
    	var credit =  Math.round(Number(payfor) * this.rate);
    	this.getPanel().down('#credit').setData({credit:credit});
    	this.getPanel().down('#balance').setData({balance:bal});
        this.getConsumefield().setValue(Number(consumed));
    }

});