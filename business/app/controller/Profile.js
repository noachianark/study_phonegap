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
        		show:'showProfile'
        	}	
        }
    },
    initAction:function() {
    	console.log("profile create");
    },
    showProfile:function(){
    	console.log();
    	PBusinessConfigurationAction.getConfigurations(
    		Business.app.userinfo.get('businessId')+'',
    		function(actionResult){
    			console.log(actionResult);
    		}
    	);
    }
});