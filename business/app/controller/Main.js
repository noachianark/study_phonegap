/**
 * @class Business.controller.Main
 * @extends extendsClass
 * Description
 */
Ext.define('Business.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
    	refs:{
    		main:"main"
    	},
        control:{
            main:{
                initialize:'initAction',
                push:'onPush',
                pop:'onPop'
            }
        }
    },




    initAction:function(){
        this.backButtonHandle();
        Ext.Viewport.add([{xtype:"loginview"}]);
    },

    onPush:function(navi, view, eOpts){

        this.removeRightButton();
        if(navi.getActiveItem().setNavBar){
            navi.getActiveItem().setNavBar(navi);
        }
        
    },

    onPop:function( navi, view, eOpts ){
        this.removeRightButton();
        if(navi.getActiveItem().setNavBar){
            navi.getActiveItem().setNavBar(navi);
        }
        
    },

    removeRightButton:function(){
        this.getMain().getNavigationBar().rightBox.removeAll();
    },

    changeTitle:function(container,value,oldValue,eOpts ){
        this.getMain().getNavigationBar().setTitle(value.label);
        console.log(value.label);
    },


    backButtonHandle:function(){
    	if (Ext.os.is('Android')) {
		    document.addEventListener("backbutton", Ext.bind(onBackKeyDown, this), false);

		    function onBackKeyDown(eve) {

		        eve.preventDefault();

		        //do something
		        alert('back button pressed');

		    }
		}
    }
});