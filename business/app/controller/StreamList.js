/**
 * @class Business.controller.StreamList
 * @extends Ext.app.Controller
 * Description
 */
Ext.define('Business.controller.StreamList', {
    extend: 'Ext.app.Controller',

    config: {
        refs:{
        	list:'streamlist',
        	postBtn:'main #postBtn'
        },
        control:{
        	postBtn:{
        		tap:'popActionSheet'
        	}
        }
    },

    popActionSheet:function(){
		var actionSheet = Ext.Viewport.down('actionsheet');
		if(!actionSheet){
			actionSheet = Ext.create('Ext.ActionSheet', {
				itemId:'actionsheet',
			    items: [
				    {
				    	xtype:'component',
				    	html:"<p style='text-align:center;'>通过照片发送资讯</p><br>"
				    },
			        {
			        	iconCls:'icon-camera',
			            text: '通过照相机获取图片'
			        },
			        {
			        	iconCls:'icon-image',
			            text: '从相册中获取图片'
			        },
			        {
			            text: '取消',
			            iconCls:'icon-close',
			            listeners:{
			            	tap:{
			            		fn:function(){
			            			actionSheet.hide();
			            		}
			            	}
			            }
			        }
			    ]
			});
			actionSheet.on({
				delay:200,
				hiddenchange : function(sheet, hidden) {
					if (hidden) {
						sheet.destroy();
					}
				}				
			});
			Ext.Viewport.add(actionSheet);
			actionSheet.show();
		}
	}
});