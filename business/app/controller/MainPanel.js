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
                me.getMainpanel().getTabBar().getAt(1).disable();
                me.scanAction();
                return false;
            }

        });

        this.getMainpanel().on('painted',function(){
            me.getMainpanel().getTabBar().getAt(1).enable();
        });
    },

    onActiveitemchange:function( container, value, oldValue, eOpts ){
        this.getNavi().getNavigationBar().rightBox.removeAll();
        this.getMainpanel().setNavBar(this.getNavi(),value);
    },

    scanAction:function(item){
        var me = this;
        //var qr = '8c4624d92ee8c457bbbb67959427fb86';
        //var qr = '9725758c36197f9abbbb67959427fb86';
        success(['9725758c36197f9abbbb67959427fb86']);
        // cordova.exec(success, this.scanFailed, "ScanditSDK", "scan",
        //      ["eyGErsE0EeOFucQgiAcdgBK3iB4UIKGrwQDXYK8xbKw",
        //       {"beep": true,
        //       "1DScanning" : true,
        //       "2DScanning" : true}]);
        function success(resultArray){
            Ext.Viewport.setMasked({
                xtype:'loadmask',
                message:'正在查询中...'
            });
            if(resultArray[0]){

                var qr = resultArray[0];
                PVipCardAction.getVipCardByQRStringFromPhone(
                    Business.app.userinfo.get('businessId')+'',
                    qr,
                    function(actionResult){
                        if(actionResult.success){
                            var user = new Business.model.User(actionResult.data);
                            user.set('qrString',qr);
                            me.showUserProfile(user);
                        }else{
                            Ext.Msg.alert('信息',actionResult.message);
                        }
                        Ext.Viewport.setMasked(false);
                    }
                );                
            }else{
                Ext.Msg.alert('信息','无法获取到验证码，请重试');
                Ext.Viewport.setMasked(false);
            }            
        }

        function scanFailed(error){
            alert("Failed: " + error);
        }
    },

    showUserProfile:function(user){
        //获取到用户信息。
        var profile = Ext.create("Business.view.UserProfile");
        profile.setData(user);
        this.getNavi().push([profile]);
    }


});