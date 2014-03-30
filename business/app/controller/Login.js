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
            main:'main',
            verifyimg:'loginview #verifyImg',
            quicklogin:'quicklogin',
            quickfield:"quicklogin fieldset",
            quickloginbtn:"quicklogin #quickLoginBtn",
            switchlogin:"quicklogin #switchlogin"
    	},

        control:{
            logBtn:{
                tap:'onLoginBtnTap'
            },
            verifyimg:{
                tap:function(self){
                    self.setSrc(basePath + 'verify-code.jsp?date=' + new Date().getTime());
                }
            },
            quickloginbtn:{
                tap:'onLoginBtnTap'
            },
            quicklogin:{
                initialize:"inita"
            }
        }

    },

    inita:function(){
        //获取本地local storage。
        var userinfo = Ext.getStore('session').load().getAt(0);
        this.getQuickfield().getComponent('nameLabel').setData({username:userinfo.get('name')});
    },

    onLoginBtnTap:function(btn){
        btn.disable();
        var me = this;
        if(btn.itemId == 'quickLoginBtn'){

        }
        var values = this.getLoginview().getValues();
        var valid = this.validateCredentials(values);


        if(valid){
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: '登陆中请稍后...'
            });
            //发送请求，然后在回调函数中处理返回的用户信息
            POperatorAction.login(values.verifycode,values.mall,values.username,btoa(values.password),function(actionResult){
                if(actionResult.success){
                    me.loginSucces(actionResult.data,values.mall);
                }else{
                    me.loginFailed(actionResult.message,btn);
                }
            });
        }else{
            //Ext.Viewport.setMasked(false);
            btn.enable();
        }
    },

    loginSucces:function(values,domain){
        var sessionInfo = Ext.getStore('session');
        sessionInfo.removeAll();
        sessionInfo.sync();

        //var userinfo = new Business.model.Session(actionResult.data);
        var userinfo = new Business.model.Session(values);
        console.log(values.mall);
        userinfo.set('domain',domain);
        newRecords=sessionInfo.add(userinfo);
        Ext.each(newRecords, function(record) {
            record.phantom = true;
        });
        sessionInfo.sync();

        this.getLoginview().destroy();
        this.getMain().push({xtype:'mainpanel'});
        this.getMain().getNavigationBar().setTitle('已发送资讯'); 
        
        Ext.Viewport.setMasked(false);
    },

    loginFailed:function(message,btn){
        Ext.Msg.alert("信息",message);
        Ext.Viewport.setMasked(false);
        btn.enable();
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
        if(values.verifycode == "" || values.verifycode == null){
            Ext.Msg.alert('信息','请输入验证码');
            return false;
        }
        if (values.mall == "" || values.mall == null) {
            Ext.Msg.alert('信息', '请输入商家域名');
            return false;
        }
        return true;
    }
});