/**
 * @class Business.store.BaseStore
 * @extends Ext.data.Store
 * Description
 */
Ext.define('Business.store.BaseStore', {

    extend: 'Ext.data.Store',

    config: {
        
    },

    listeners : {
    	beforeload : {
    		fn : function(store, records){
				if(Ext.device && Ext.device.Connection && !Ext.device.Connection.isOnline()){
					Ext.Msg.alert('错误', '没有检测到网络连接。');	
					return false;
				}
    		}
    	}
    }
});