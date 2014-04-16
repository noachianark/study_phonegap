/**
 * @class Business.controller.Profile
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.controller.Profile', {
    extend: 'Ext.app.Controller',
    requires: [
        
    ],

    config: {
        refs:{
        	profile:'profile'
        },
        control:{
        	profile:{
        		initialize:'initAction',
        		painted:'showProfile',
                updatedata:'updateinfo'
        	}	
        }
    },
    initAction:function() {
        var me = this;
    	this.getProfile().on('painted',function(){
            me.showProfile();
        });
    },
    showProfile:function(){
    	var me = this;
        Ext.Viewport.setMasked({
            xtype:'loadmask',
            message:'正在兑换请稍后...'
        });
    	PBusinessAction.findBusinessById(
    		Business.app.userinfo.get('businessId')+'',
    		function(actionResult){
    			Ext.Viewport.setMasked(false);
                if(actionResult.success){
                    me.getProfile().setData(actionResult.data);
                }else{
                    Ext.Msg.alert('提示',actionResult.message);
                }
    		}
    	);
    },

    updateinfo:function(me,newData,eOpts){
        var me = this;
        this.getProfile().profile = newData;
        this.getProfile().down('#members').setData({members:newData.vipCardNumber});
        this.getProfile().down('#coupons').setData({coupons:newData.couponNumber});
        this.getProfile().down('#news').setData({news:newData.newsNumber});
        this.getProfile().down('#shops').setData({shops:newData.shopInfos.length});

        this.getProfile().down('#description').setData({
            desc:newData.description,
            telephone:newData.telephone,
            img:basePath+newData.mainPath
        });
        var items = [];
        Ext.each(newData.pictures, function(picture) {
            if (!picture.thumbnailUrl) {
                return;
            }
            items.push({
                xtype: 'panel',
                scrollable : {
                    direction     : 'vertical',
                    directionLock : true
                },                  
                html:'<div style="text-align: center;">'+
                        '<img src='+basePath+picture.url+' style="width:100%;">'+
                     '</div>'+
                     '<p style="text-indent:2em;">'+picture.description+'</p>'

            });
        });        
        this.getProfile().down('#pictures').setItems(items);
        this.getProfile().down('#offer').setData({offer:newData.offerDescription});

    }


});