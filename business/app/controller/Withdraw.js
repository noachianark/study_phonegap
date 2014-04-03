/**
 * @class Business.controller.Withdraw
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.controller.Withdraw', {
    extend: 'Ext.app.Controller',
    requires: [
        'Business.view.Withdraw',
        'Business.view.WithdrawSuccess'
    ],

    config: {
        refs:{
        	navi:'main',
    		userprofile:'userprofile',
    		panel:'withdraw',
    		withdrawfield:'withdraw #withdrawfield',
            returnBtn:'withdrawsuccess #returnBtn',
            successpanel:'withdrawsuccess'
        },
        control:{
        	panel:{
        		initialize:'initAction'
        	},
        	successpanel:{
        		updatedata:'successful'
        	},
        	returnBtn:{
        		tap:'confirmAction'
        	},
        	withdrawfield:{
        		change:'withdrawChanged'
        	},
        	'withdraw #withdrawBtn':{
        		tap:'withdrawAction'
        	}
        }
    },
    initAction:function(){
    	var user = this.getUserprofile().userinfo;
    	this.getWithdrawfield().setValue(0);
    	var deposit = Number(user.get('deposit'));
    	this.getPanel().down('#depositlabel').setData({
    		deposit:deposit
    	});
    },
    withdrawChanged:function(self, newValue, oldValue, eOpts){
    	var user = this.getUserprofile().userinfo;
    	var max = Number(user.get('deposit'));
    	if(Number(newValue) > Number(max)){
    		Ext.Msg.alert('信息','取款金额最多为'+max);
    		self.setValue(max);
    		return;
    	}
    	if(Number(newValue) < 0){
    		Ext.Msg.alert('信息','取款金额不能为负数');
    		self.setValue(0);
    		return;    		
    	}
    },
    withdrawAction:function(btn){
    	var me = this;
    	var user = this.getUserprofile().userinfo;
    	Ext.Viewport.setMasked({
    		xtype:'loadmask',
    		message:'正在兑换请稍后...'
    	});
    	var amount = this.getWithdrawfield().getValue();
    	var note = this.getPanel().down('#notefield').getValue();
    	var shopId = user.get('shopId');
    	var vipCardId = user.get('id');

    	var params = {
    		amount:amount+'',note:note,shopId:shopId+'',vipCardId:vipCardId+''
    	};

    	PTransactionAction.withdraw(params,function(actionResult){
    		if(actionResult.success){
    			me.withdrawSuccess(amount);
    		}else{
    			Ext.Msg.alert(actionResult.message);
    		}
    	});
    },

    withdrawSuccess:function(money){
    	var me = this;
        var user = this.getUserprofile().userinfo;
        PVipCardAction.getVipCardById(user.get('id'),function(actionResult){
            if(actionResult.success){
                var qrStr = user.get('qrString');
                actionResult.data.qrString = qrStr;
                me.getUserprofile().setData(new Business.model.User(actionResult.data));
                user = me.getUserprofile().userinfo;
                var successpanel = Ext.create('Business.view.WithdrawSuccess');
                successpanel.setData({
                	withdraw:money,
                	deposit:user.get('deposit')
                });
                me.getNavi().push([successpanel]);
                me.getNavi().getNavigationBar().leftBox.query('button')[0].hide();                
            }else{
                console.log('失败了');
            }
            Ext.Viewport.setMasked(false);
        });  
    },

    successful:function(self, newData, eOpts){
    	this.getSuccesspanel().down('#withdraw-deposit').setData({deposit:newData.deposit});
    	this.getSuccesspanel().down('#withdraw-money').setData({money:newData.money});
    },

    confirmAction:function(){
    	this.getNavi().pop(2);
    }
});