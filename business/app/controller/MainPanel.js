/**
 * @class Business.controller.MainPanel
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.controller.MainPanel', {
    extend: 'Ext.app.Controller',
    requires:[
        'Business.view.UserProfile'
    ],
    config: {
     	refs:{
     		mainpanel:"mainpanel",
            navi:"main"
     	},
     	control:{
     		mainpanel:{
     			initialize:'initAction',
                activeitemchange:'onActiveitemchange'
     		}
     	}
    },

    initAction:function(){
        var me = this;

        this.getMainpanel().getTabBar().getAt(0).setFlex(1);
        this.getMainpanel().getTabBar().getAt(1).setFlex(1);
        this.getMainpanel().getTabBar().getAt(2).setFlex(1);

        this.getMainpanel().getTabBar().getAt(1).addCls("scanBtn");
        this.getMainpanel().addBeforeListener('activeitemchange', function(container, newItem, oldItem, opts){
            if(newItem.getItemId() == "scan"){
                me.scanAction();
                return false;
            }

        });
    },

    onActiveitemchange:function( container, value, oldValue, eOpts ){
        this.getNavi().getNavigationBar().rightBox.removeAll();
        this.getMainpanel().setNavBar(this.getNavi(),value);
    },

    scanAction:function(btn){
        //开启相机并扫描，返回结果后转至showUserProfile。
        //根据用户ID调用store,返回数据后，调用user profile页面。
        var me = this;
        //var qr = '8c4624d92ee8c457bbbb67959427fb86';
        var qr = '8c4624d92ee8c457bbbb67959427fb86';
        PVipCardAction.getVipCardByQRString(
            Business.app.userinfo.get('businessId')+'',
            qr,
            function(actionResult){
                if(actionResult.success){
                    console.log(actionResult.data);
                    var user = new Business.model.User(actionResult.data);
                    user.set('qrString',qr);
                    me.showUserProfile(user);
                }else{
                    Ext.Msg.alert('信息',actionResult.message);
                }
            }
        );
        
    },

    showUserProfile:function(user){
        //获取到用户信息。
        var profile = Ext.create("Business.view.UserProfile");
        profile.setData(user);
        this.getNavi().push([profile]);
    }
});