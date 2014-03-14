/**
 * @class Business.controller.Login
 * @extends extendsClass
 * Description
 */
Ext.define('Business.controller.Login', {
    extend: 'Ext.app.Controller',
    
    requires:[
    	"Business.view.Login",
        "Business.model.Session",
        'Ext.data.proxy.LocalStorage'
    ],

    config: {
    	refs:{
            logBtn:"loginview #logInButton",
            logfield:"loginview fieldset",
            loginview:"loginview",
            main:'main'
    	},

        control:{
        	loginview:{
        		initialize:"inita"
        	},
            logBtn:{
                tap:'onLoginBtnTap'
            }
        }

    },

    inita:function(){
        //1、查询商家的列表。

        //2、获取本地local storage信息自动选中商家列表和用户名。
        var userinfo = Ext.getStore('Session');
        if(null!=userinfo.getAt(0)){
            var info = userinfo.getAt(0);
            this.getLogfield().getComponent("username").setValue(info.get("username"));
        }

    },

    onLoginBtnTap:function(btn){
        btn.disable();
        var me = this;
        var values = this.getLoginview().getValues();
        var valid = this.validateCredentials(values);
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '登陆中请稍后...'
        });

        if(valid){

            //发送请求，然后在回调函数中处理返回的用户信息

            var sessionInfo = Ext.getStore('Session');
            sessionInfo.removeAll();
            sessionInfo.sync();

            var userinfo = new Business.model.Session({
                username:values.username,
                password:values.password,
                business_id:"1",
                shop_id:"1"
            });

            sessionInfo.add(userinfo);
            sessionInfo.sync();

            //。。。。。。。。。。。。。。。

            var task = Ext.create('Ext.util.DelayedTask', function() {

                me.getLoginview().destroy();

                // Ext.Viewport.add([{xtype:'mainpanel'}]);
                // Ext.Viewport.animateActiveItem("mainpanel",{type:"slide",direction:"left"});
                //Ext.Viewport.add([{xtype:"menuview"}]);
                //Ext.Viewport.animateActiveItem("menuview", { type: 'slide', direction: 'left' });
                //Ext.Viewport.animateActiveItem("mainpanel",{type:"slide",direction:"left"});
                this.getMain().push({xtype:'mainpanel'});
                this.getMain().getNavigationBar().setTitle('已发送资讯');
                Ext.Viewport.setMasked(false);
            }, this);

            task.delay(2000);

        }else{
            Ext.Viewport.setMasked(false);
            btn.enable();
        }
    },

    validateCredentials:function(values){
        if (values.username == "" || values.username == null) {
            Ext.Msg.alert('信息', '请输入用户名');
            return false;
        }
        if (values.password == "" || values.password == null) {
            Ext.Msg.alert('信息', '请输入密码');
            return false;
        }
        if (values.mall == "" || values.mall == null) {
            Ext.Msg.alert('信息', '请选择商家信息');
            return false;
        }
        return true;
    }
});