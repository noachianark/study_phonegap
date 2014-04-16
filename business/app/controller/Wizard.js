/**
 * @class Business.controller.Wizard
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.controller.Wizard', {
    extend: 'Ext.app.Controller',
    alias:'widget.wizard',
    requires: [
        'Business.view.InfoWizards.InfoPanel'
    ],

    config: {
        refs:{
            navi:'main',
        	buffer:'imagesbuffer',
            info:"infopanel",
            publishAction:'infopanel #publish',
            list:'streamlist'
        },
        control:{
        	buffer:{
        		initialize:'initAction',
                destroy:'destroyed'
        	},
            "imagesbuffer #nextBtn":{
                tap:'nextAction'
            },
            publishAction:{
                tap:'publishAction'
            }
        }
    },

    initAction:function(){
    	var me = this;
    },

    destroyed:function(){
        var store = Ext.getStore('Images');
        store.removeAll();
        store.sync();
    },

    nextAction:function(nextBtn){
        var store = Ext.getStore('Images');
        if(store.getAllCount() > 0 ){
            var panel = Ext.create('widget.infopanel',{
                data:{type:this.getBuffer().getData().type}
            });
            this.getNavi().push([panel]);            
        }else{
            Ext.Msg.alert('信息','您还没有添加任何图片信息');
        }

    },

    publishAction:function(btn){
        console.log('publish！');
        var store = Ext.getStore('Images');
        var picArr = new Array();
        store.each(function (item, index, length) {
            console.log(item.get('description'), index);
            picArr.push({
                content:item.get('url'),
                description:item.get('description')
            });
        });

        var type = this.getBuffer().getData().type;
        if(type=="news"){
            this.publishNews(picArr);
        }else{
            this.publishCoupon(picArr);
        }
    },
    publishNews:function(pictures){
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '发布中请稍后...'
        });

        var me = this;
        
        var params = {
            businessId:Business.app.userinfo.get('businessId')+'',
            title:me.getInfo().down('#title').getValue()+'',
            content:me.getInfo().down('#content').getValue()+'',
            bytePictures:pictures
        };

        PMessageAction.publisNews(params,function(actionResult){
            console.log(actionResult);
            if(actionResult.success){
                me.publishSuccess("#news");
            }else{
                Ext.Msg.alert('信息',actionResult.message);
            }
            Ext.Viewport.setMasked(false);
        });
    },

    publishCoupon:function(pictures){
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '发布中请稍后...'
        });

        var me = this;
        
        var params = {
            businessId:Business.app.userinfo.get('businessId')+'',
            title:me.getInfo().down('#title').getValue()+'',
            content:me.getInfo().down('#content').getValue()+'',
            bytePictures:pictures,
            startDate:me.getInfo().down('#start').getValue()+'',
            endDate:me.getInfo().down('#end').getValue()
        };

        PMessageAction.publisCoupon(params,function(actionResult){
            console.log(actionResult);
            if(actionResult.success){
                me.publishSuccess('#coupons');
            }else{
                Ext.Msg.alert('信息',actionResult.message);
            }
            Ext.Viewport.setMasked(false);
        });
    },

    publishSuccess:function(selector){
        this.getNavi().pop(2);
        this.getList().down(selector).getStore().removeAll();
        this.getList().down(selector).getStore().loadPage(1);
        if(selector == "#news"){
            this.getList().down('tabpanel').setActiveItem(1);
        }else{
            this.getList().down('tabpanel').setActiveItem(0);
        }
        console.log("jiong");
    }
});