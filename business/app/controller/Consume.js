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
            cashpayfield:'consumepanel #cashpayfield',
            consumeBtn:'consumepanel #consume',
            returnBtn:'consumesuccess #returnBtn',
            successpanel:'consumesuccess'
        },
        control:{
        	panel:{
        		initialize:'initia',
                show:function(){
                    Ext.getBody().addCls('bg_consume');
                },
                destroy:function(){
                    Ext.getBody().removeCls('bg_consume');
                }
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
    	var deposit = this.getUserprofile().userinfo.get('deposit');
    	var discount = this.getUserprofile().userinfo.get('discountPercent');
    	var pointPercent = this.getUserprofile().userinfo.get('pointPercent');

    	this.pointPercent = Number(pointPercent?pointPercent:0)/100;
    	this.discount = Number(discount?discount:0)/100;
    	this.balance = Number(deposit?deposit:0);
    	this.consume = 0;
    	//this.getPanel().down('#discount').setData({discount:this.discount * 100});
    	this.getPanel().down('#discount').setValue(Number(this.discount * 100)+'%');
        this.setValue(0);
        this.getCashpayfield().setValue(0);
    },

    consumeAction:function(btn){
        var me = this;
        var user = this.getUserprofile().userinfo;
        //消费金额
        var consume = Number(this.getPanel().down('formpanel').getValues().consumes).toFixed(2);
        //卡内支付
        var cardpay = Number(this.getPanel().down('formpanel').getValues().cardpay).toFixed(2);
        if(Number(cardpay) > Number(consume) || Number(cardpay) < 0){
            cardpay = consume;
            this.getCardpayfield().setValue('cardpay',cardpay);
            Ext.Msg.alert('信息','卡内余额支付金额需小于消费金额');
            return;
        }else if(Number(cardpay) > Number(this.balance)){
            cardpay = this.balance;
            this.getPanel().down('formpanel').setValue('cardpay',cardpay);
            Ext.Msg.Alert('信息','卡内余额不足，余下金额请使用现金支付');
            return;
        }

        //应付金额
        var accountPayable = Number(consume * (1-me.discount)).toFixed(2);
        //现金支付
        var cashPayment = Number(accountPayable - cardpay).toFixed(2);

        var params = {
            accountPayable: accountPayable,
            cardPayment: cardpay+'',
            cashPayment: cashPayment+'',
            changeAmount: me.getPanel().down('#changeAmount').getValue()+'',
            consumeSubject: '消费',
            consumptionAmount:me.getConsumefield().getValue()+'',
            discount:Number(consume * me.discount).toFixed(2)+'',
            notes:'',
            reveivedPoints:me.getPanel().down('#credit').getData().credit+'',
            shopId:Business.app.userinfo.get('shopId')+'',
            userQrString:user.get('qrString'),
            vipCardId:user.get('id')+''
        };

        Ext.Viewport.setMasked({
            xtype:'loadmask',
            message:'扣款中请稍后...'
        });

        PTransactionAction.consumeFromDeposit(
            params,
            function(actionResult){
                if(actionResult.success){
                    me.consumeSuccess();
                }else{
                    Ext.Msg.alert("信息",actionResult.message);
                    Ext.Viewport.setMasked(false);
                }
                
            }
        );

    },

    consumeSuccess:function(){
        var me = this;
        var user = this.getUserprofile().userinfo;

        PVipCardAction.getVipCardById(user.get('id'),function(actionResult){
            if(actionResult.success){
                var qrStr = user.get('qrString');
                actionResult.data.qrString = qrStr;
                me.getUserprofile().setData(new Business.model.User(actionResult.data));
                user = me.getUserprofile().userinfo;
                var successpanel = Ext.create('Business.view.ConsumeSuccess');
                successpanel.setData({
                    balance : user.get('deposit'),
                    consume : me.consume,
                    username: user.get('userName')
                });
                me.getNavi().push([successpanel]);
                me.getNavi().getNavigationBar().leftBox.query('button')[0].hide();                
            }else{
                console.log('失败了');
            }
            Ext.Viewport.setMasked(false);
        });





        // var successpanel = Ext.create('Business.view.ConsumeSuccess');
        // successpanel.setData({
        //     balance : Number(this.balance)-Number(this.consume),
        //     consume : this.consume,
        //     username: user
        // });

        // me.getNavi().push([successpanel]);
        // me.getNavi().getNavigationBar().leftBox.query('button')[0].hide();
    },

    successful:function(self, newData, eOpts){
        // var data = this.getUserprofile().userinfo.getData();
        // data.deposit = this.getPanel().down('#balance').getData().balance;
        // data.totalConsume = Number(data.totalConsume) + Number(newData.consume);
        // data.totalPoint = Number(data.totalPoint) + Number(this.getPanel().down('#credit').getData().credit);
        // data.point = Number(data.point) + Number(this.getPanel().down('#credit').getData().credit);

        // var userinfo = Ext.create('Business.model.User');
        // userinfo.setData(data);
        // this.getUserprofile().setData(userinfo);

        this.getSuccesspanel().down('#consume-username').setData({username:newData.username});
        this.getSuccesspanel().down('#consume-balance').setData({balance:newData.balance});
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
        this.getCashpayfield().setValue(cash);
        //this.getCashpayfield().dom.value(cash);
        var bal = (Number(this.balance) - Number(newValue)).toFixed(1);
        this.getPanel().down("#balance").setData({balance:bal});
    },

    cashpayFieldChange:function(self, newValue, oldValue, eOpts){
        var user = this.getUserprofile().userinfo;
        var cardpay = this.getCardpayfield().getValue();
        var needcash = Number(Number(this.consume)*(1-Number(this.discount)) - Number(cardpay)).toFixed(1); 
        if(Number(newValue) >= Number(needcash)){
            this.getPanel().down('#changeAmount').setValue(Number(Number(newValue) - Number(needcash)).toFixed(1));
            //this.getPanel().down('#changeAmount').setData({change:Number(Number(newValue) - Number(needcash)).toFixed(1)});
        }else if(needcash=='NaN'){

        }else{
            self.setValue(needcash);
            Ext.Msg.alert("信息",'现金不足');
        }
        
    },

    setValue:function(consumed){
        var user = this.getUserprofile().userinfo;
    	var payfor = (Number(consumed) * ( 1- this.discount )).toFixed(1);
        this.payfor = payfor;
        //this.getPanel().down("#payfor").setData({payfor:payfor});
    	this.getPanel().down("#payfor").setValue("￥"+payfor+"元");
        var bal = this.balance;
    	if(this.balance < Number(payfor) ){
    		//余额不足
    		this.getCardpayfield().setValue(Number(this.balance).toFixed(1));
    		var cashpay = (Number(payfor) - Number(this.balance)).toFixed(1);
    		this.getCashpayfield().setValue(cashpay);
    		bal = 0;

            //this.afterpay = 0;
    	}else{
    		//余额充足
			this.getCashpayfield().setValue(0);
			var cardpay = Number(payfor).toFixed(1);
			this.getCardpayfield().setValue(cardpay);
    		bal = Number(this.balance) - Number(payfor);
    	}

        // this.getPanel().down('#changeAmount').setData({change:0});
        this.getPanel().down('#changeAmount').setValue(0);
    	var credit =  Math.round(Number(payfor) * this.rate);
    	this.getPanel().down('#credit').setData({credit:Number(user.get('pointPercent')/100*consumed).toFixed(0)});
    	this.getPanel().down('#balance').setData({balance:Number(bal).toFixed(1)});
        this.getConsumefield().setValue(Number(consumed));
    }

});