/**
 * @class Business.controller.Charge
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.controller.Charge', {
    extend: 'Ext.app.Controller',
    requires:[
        'Business.view.ChargeSuccess',
        'Business.store.Charge'
    ],
    config: {
        refs:{
        	navi:"main",
            userprofile:'userprofile',
        	panel:"chargepanel",
            chargefield:"chargepanel #chargefield",
        	buttons:'chargepanel button[action=fast]',
            chargeBtn:'chargepanel #charge',
            returnBtn:'chargesuccess #returnBtn',
            successpanel:'chargesuccess'
        },
        control:{
        	panel:          {
                initialize:'initia',
                show:function(){
                    Ext.getBody().addCls('bg_deposit');
                }
            },
        	buttons:        {tap:'fastchargeAction'},
            chargefield:    {change:'chargeinput'},
            chargeBtn:      {tap:'chargeAction'},
            returnBtn:      {tap:'confirmAction'},
            successpanel:   {updatedata:'successful'}
        }
    },

    initia:function(){
        var balance = this.getUserprofile().userinfo.get('deposit');
        this.balance = Number(balance?balance:0);
        this.getChargefield().setValue(100);
    },

    chargeAction:function(btn){
        btn.disable();
        var me = this;
        var store = Ext.create('Business.store.Charge');
        var user = me.getUserprofile().userinfo;
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '充值中请稍后...'
        });

        var realAmount = Number(me.getChargefield().getValue());
        var rewardAmount = (Number(user.get('depositMoneyBackPercent')).toFixed(2) * realAmount).toFixed(2) / 100;
        var notes = this.getPanel().down('formpanel').getValues().notes;
        var cardid = user.get('id');

        var params = {
            realAmount:realAmount,
            rewardAmount:rewardAmount,
            shopId:Business.app.userinfo.get('shopId'),
            businessId:Business.app.userinfo.get('businessId'),
            vipCardId:cardid,
            note:notes
        };

        if(!me.validateParams(params)){
            Ext.Viewport.setMasked(false);
            btn.enable();
            return;
        }


        PTransactionAction.deposit(params,function(actionResult){
            if(actionResult.success){
                me.chargeSuccess();
            }else{
                Ext.Msg.alert('信息',actionResult.message);
                Ext.Viewport.setMasked(false);
                btn.enable();
            }
            
        });

        // store.load({
        //     params:{
        //         realAmount:realAmount,
        //         rewardAmount:rewardAmount,
        //         shopId:Business.app.userinfo.get('shopId'),
        //         businessId:Business.app.userinfo.get('businessId'),
        //         vipCardId:cardid,
        //         note:notes
        //     },
        //     scope:this,
        //     callback:function(records, operation,success){
        //         var task = Ext.create('Ext.util.DelayedTask', function() {
        //             //this.confirmAction();
        //             if(success){
        //                 if(records[0].data.success){
        //                     me.chargeSuccess();
        //                 }
        //             }

        //             Ext.Viewport.setMasked(false);

        //         }, this);

        //         task.delay(1000);

        //     }
        // });
    },

    validateParams:function(params){
        if(Number(params.realAmount)<=0){
            Ext.Msg.alert('提示','您的充值金额为0元');
            return false;
        }
        return true;
    },

    chargeSuccess:function(){
        var me = this;
        var user = this.getUserprofile().userinfo;
        PVipCardAction.getVipCardById(user.get('id'),function(actionResult){
            if(actionResult.success){
                var qrStr = user.get('qrString');
                actionResult.data.qrString = qrStr;
                me.getUserprofile().setData(new Business.model.User(actionResult.data));
                user = me.getUserprofile().userinfo;
                var successpanel = Ext.create('Business.view.ChargeSuccess');
                successpanel.setData({userName:user.get('userName'),deposit:user.get('deposit')});
                
                me.getNavi().push([successpanel]);
                me.getNavi().getNavigationBar().leftBox.query('button')[0].hide();                
            }else{
                Ext.Msg.alert('信息',actionResult.message);
            }
            Ext.Viewport.setMasked(false);
        });

    },

    successful:function( self, newData, eOpts){

        this.getSuccesspanel().down('#charge-balance').setData({balance:newData.deposit});
        this.getSuccesspanel().down('#charge-username').setData({username:newData.userName});
    },

    confirmAction:function(btn){
        btn.disable();
        this.getNavi().pop(2);
    },

    fastchargeAction:function(btn){
        this.getChargefield().setValue(btn.getData());
    },

    chargeinput:function(self, newValue, oldValue, eOpts){
        if(Number(newValue) < 0){
            Ext.Msg.alert("信息","充值金额不能为负数,请使用取款功能");
            newValue = Math.abs(Number(newValue));
            self.setValue(newValue);
        }
        this.setValue(newValue);
    },

    setValue:function(money){
        var rebate = (Number(money)*Number(this.getUserprofile().userinfo.get('depositMoneyBackPercent'))/100).toFixed(2);
        var af = Number(this.balance) + Number(money) + Number(rebate);
        this.getPanel().down('#depositPayback').setData({rebate:rebate});
        this.getPanel().down('#balanceBefore').setData({before:this.balance});
        this.getPanel().down('#balanceAfter').setData({after:af});        
    }
});