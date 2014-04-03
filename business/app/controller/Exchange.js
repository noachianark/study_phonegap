/**
 * @class Business.controller.Exchange
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.controller.Exchange', {
    extend: 'Ext.app.Controller',
    requires: [
        'Business.view.Exchange',
        'Business.view.ExchangeSuccess'
    ],

    config: {
    	refs:{
    		navi:'main',
    		userprofile:'userprofile',
    		panel:'exchange',
    		pointField:'exchange #pointField',
    		segment:'exchange #segment',
            returnBtn:'exchangesuccess #returnBtn',
            successpanel:'exchangesuccess'
    	},
    	control:{
    		panel:{
    			initialize:'initAction'
    		},
    		segment:{
    			toggle:'itemToggle'
    		},
    		pointField:{
    			change:'pointChanged'
    		},
    		'exchange #exchange':{
    			tap:'exchangePointAction'
    		},
            successpanel:{
                updatedata:'successful'
            },
            returnBtn:{
                tap:'confirmAction'
            }    		
    	}
    },
    initAction:function(){
    	var user = this.getUserprofile().userinfo;
    	this.getPointField().setValue(0);
    	var max = Math.floor(Number(user.get('point'))).toFixed(0);
    	var avaliable = Math.floor(Number(max)/100) != Number(max)/100?Math.floor(Number(max)/100)*100:Number(max);

    	this.getPanel().down('#pointInfo').setData({
    		point:user.get('point'),
    		money:Number(avaliable)*Number(user.get('pointPercent'))/100
    	});
    	this.getPanel().down('#moneyLabel').setData({
    		money:0
    	});
    },
    pointChanged:function(self, newValue, oldValue, eOpts){
    	var user = this.getUserprofile().userinfo;
    	var max = Math.floor(Number(user.get('point'))).toFixed(0);
    	var avaliable = Math.floor(Number(max)/100) != Number(max)/100?Math.floor(Number(max)/100)*100:Number(max);
    	
    	if(Math.floor(Number(newValue)/100) != Number(newValue)/100){
    		Ext.Msg.alert('信息','兑换的积分必须为100的倍数');
    		self.setValue(Math.floor(Number(newValue)/100)*100);
    		return;
    	}
    	if(Number(newValue) > Number(avaliable)){

    		Ext.Msg.alert('信息','最多只能兑换'+avaliable+'的积分');

    		self.setValue(avaliable);
    		return;
    	}
    	if(Number(newValue) < 0){
    		Ext.Msg.alert('信息','兑换积分不能为负数');
    		self.setValue(0);
    		return;
    	}
    	if(Math.floor(newValue) != Number(newValue)){
    		Ext.Msg.alert('信息','兑换积分应为整数');
    		self.setValue(Math.floor(newValue));
    		return;
    	}
    	this.getPanel().down('#moneyLabel').setData({
    		money:Math.floor(Number(user.get('pointPercent'))/100 * Number(newValue)).toFixed(0)
    	});

    },
    exchangePointAction:function(btn){
    	var me = this;
    	var user = this.getUserprofile().userinfo;
    	Ext.Viewport.setMasked({
    		xtype:'loadmask',
    		message:'正在兑换请稍后...'
    	});
    	var points = this.getPointField().getValue();
    	var money = Math.floor(Number(user.get('pointPercent'))/100 * Number(points)).toFixed(0)
    	var note = this.getPanel().down('#noteField').getValue();
    	var cardId = user.get('id');

    	var params = {
    		money:money+'',note:note+'',points:points+'',vipCardId:cardId+''
    	};

    	if(this.getPanel().down('panel').getActiveItem().getItemId() != 'exchangemoney'){
    		Ext.Viewport.setMasked(false);
    		Ext.Msg.alert("暂未实现");
    		return;
    	}

        PTransactionAction.exchangePoint(params,function(actionResult){
            if(actionResult.success){
                console.log(actionResult);
                me.exchangeSuccess(money);
            }else{
                console.log("failed");
                Ext.Msg.alert(actionResult.message);
                Ext.Viewport.setMasked(false);
            } 
        });
    },

    exchangeSuccess:function(gain){
    	var me = this;
        var user = this.getUserprofile().userinfo;
        PVipCardAction.getVipCardById(user.get('id'),function(actionResult){
            if(actionResult.success){
                var qrStr = user.get('qrString');
                actionResult.data.qrString = qrStr;
                me.getUserprofile().setData(new Business.model.User(actionResult.data));
                user = me.getUserprofile().userinfo;
                var successpanel = Ext.create('Business.view.ExchangeSuccess');
                successpanel.setData({
                	gain:gain,
                	point:user.get('point')
                });
                me.getNavi().push([successpanel]);
                me.getNavi().getNavigationBar().leftBox.query('button')[0].hide();                
            }else{
                console.log('失败了');
            }
            Ext.Viewport.setMasked(false);
        });    	
    },

    successful:function( self, newData, eOpts){
        this.getSuccesspanel().down('#exchange-gain').setData({gain:newData.gain});
        this.getSuccesspanel().down('#exchange-point').setData({point:newData.point});
    },
    confirmAction:function(){
        this.getNavi().pop(2);
    },    

    itemToggle:function(self, button, isPressed, eOpts){
		if(isPressed){
			if(button.getItemId() == "cash"){
				this.getPanel().down('panel').animateActiveItem(0,{type:'slide',direction:'right'});
			}else{
				this.getPanel().down('panel').animateActiveItem(1,{type:'slide',direction:'left'});
			}
		}
    }
});