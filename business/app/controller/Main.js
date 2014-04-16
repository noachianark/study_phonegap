/**
 * @class Business.controller.Main
 * @extends extendsClass
 * Description
 */
Ext.define('Business.controller.Main', {
    extend: 'Ext.app.Controller',
    requires:[
        'Business.view.QuickLogin',
        'Business.view.Login'
    ],
    config: {
    	refs:{
    		main:"main"
    	},
        control:{
            main:{
                initialize:'initAction',
                push:'onPush',
                pop:'onPop',
                back:function(self,eOpts){
                    //self.disable();
                    self.getNavigationBar().getBackButton().disable();
                }
            }
        }
    },

    initAction:function(){
        var me = this;
        
        this.getMain().addBeforeListener('activeitemchange',function(self,value,oldValue,eOpts){
            if(value.isXType("userprofile")){
                Ext.getBody().removeCls('bg_deposit');
                Ext.getBody().removeCls('bg_consume');
                Ext.getBody().removeCls('bg_exchange');
                Ext.getBody().removeCls('bg_withdraw');
            }
        });
        this.getMain().addAfterListener('pop',function(){
            me.getMain().getNavigationBar().getBackButton().enable();
        });

        this.backButtonHandle();
        var userinfo = Ext.getStore('session').load().getAt(0);
        if(null!=userinfo){
            Business.app.userinfo = new Business.model.Session(userinfo.getData());
            Ext.Viewport.add([{xtype:'quicklogin'}]);
        }else{
            Ext.Viewport.add([{xtype:"loginview"}]);
            console.log(this.getMain().down("#backToQuick"));
        }
    },

    onPush:function(navi, view, eOpts){
        this.removeRightButton();
        if(navi.getActiveItem().setNavBar){
            navi.getActiveItem().setNavBar(navi);
        }
    },

    onPop:function( navi, view, eOpts ){
        this.removeRightButton();
        //navi.getNavigationBar().getBackButton().enable();
        if(navi.getActiveItem().setNavBar){
            navi.getActiveItem().setNavBar(navi);
        }
    },

    removeRightButton:function(){
        this.getMain().getNavigationBar().rightBox.removeAll();
    },

    changeTitle:function(container,value,oldValue,eOpts ){
        this.getMain().getNavigationBar().setTitle(value.label);
    },


    backButtonHandle:function(){
    	if (Ext.os.is('Android')) {
		    document.addEventListener("backbutton", Ext.bind(onBackKeyDown, this), false);

		    function onBackKeyDown(eve) {

		        eve.preventDefault();

		        //do something
		        
                // console.dir(this.getMain().getSize());
                // if(this.getMain().getItems().length<3){
                //     Ext.Msg.confirm('确认', '确认要退出程序吗？', function(r) {
                //         if (r == 'yes') {
                //             setTimeout(function() {             
                //                 navigator.app.exitApp();
                //             }, 200);
                //         }
                //     });
                // }
		    }
		}
    }
});