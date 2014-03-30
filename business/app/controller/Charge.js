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
        	panel:          {initialize:'initia'},
        	buttons:        {tap:'fastchargeAction'},
            chargefield:    {change:'chargeinput'},
            chargeBtn:      {tap:'chargeAction'},
            returnBtn:      {tap:'confirmAction'},
            successpanel:   {updatedata:'successful'}
        }
    },

    initia:function(){
        var balance = this.getUserprofile().userinfo.getData().balance;
        this.balance = Number(balance?balance:0);
        this.getChargefield().setValue(100);
    },

    chargeAction:function(btn){
        var me = this;
        console.log(this.getPanel().getValues());
        var store = Ext.create('Business.store.Charge');

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '充值中请稍后...'
        });

        store.load({
            scope:this,
            callback:function(records, operation,success){
                var task = Ext.create('Ext.util.DelayedTask', function() {
                    //this.confirmAction();
                    if(success){
                        if(records[0].data.success){
                            me.chargeSuccess();
                        }
                    }

                    Ext.Viewport.setMasked(false);

                }, this);

                task.delay(1000);

            }
        });
    },

    chargeSuccess:function(){
        var me = this;
        var user = this.getUserprofile().userinfo.getData().username;
        var balance = this.getUserprofile().userinfo.getData().balance;
        var money = this.getChargefield().getValue();
        var successpanel = Ext.create('Business.view.ChargeSuccess');
        successpanel.setData({username:user,balance:Number(money)+Number(balance)});
        
        me.getNavi().push([successpanel]);
        me.getNavi().getNavigationBar().leftBox.query('button')[0].hide();
    },

    successful:function( self, newData, eOpts){
        console.log("lalal ssss");
        
        var data = this.getUserprofile().userinfo.getData();
        data.balance = newData.balance;

        var userinfo = Ext.create('Business.model.User');
        userinfo.setData(data);
        this.getUserprofile().setData(userinfo);

        this.getSuccesspanel().down('#charge-balance').setData({balance:newData.balance});
        this.getSuccesspanel().down('#charge-username').setData({username:newData.username});
    },

    confirmAction:function(){
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
        var af = this.balance + Number(money);
        this.getPanel().down('#balanceBefore').setData({before:this.balance});
        this.getPanel().down('#balanceAfter').setData({after:af});        
    }
});