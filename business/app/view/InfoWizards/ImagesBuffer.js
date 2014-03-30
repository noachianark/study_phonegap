/**
 * @class Business.view.ImagesBuffer
 * @extends Ext.Container
 * Description
 */
Ext.define('Business.view.InfoWizards.ImagesBuffer', {
    extend: 'Ext.form.Panel',
    alias:'widget.imagesbuffer',
    requires: [
        'Business.view.InfoWizards.ImageItem'
    ],

    config: {
        cls:"image-buffer",
        autoDestroy:true,
        title:"发布",
        layout:{
            type:'vbox'
        },
        items:[
            {
                xtype:'textfield',
                placeHolder:'填写资讯标题',
                margin:'10 10 0 10',
                clearIcon : false
            },
        	{
        		xtype:'textareafield',
        		placeHolder:'填写资讯描述信息',
                margin:10,
                maxRows:3,
                clearIcon : false
        	},
        	{
                flex:1,
                cls:'image-area',
        		xtype:'container',
                margin:10
        	}
        ]
    },

    editBtn:{
    	xtype:"button",
    	text:"发送",
    	align:'right',
    	itemId:'editImage'
    },

    cancelBtn:{
        xtype:'button',
        text:'取消',
        align:'left',
        itemId:'cancel'
    },

    addmore:{
        xtype:'imageitem',
        itemId:'addmore'
    },

    setNavBar:function(navi,panel){
        navi.getNavigationBar().leftBox.query('button')[0].hide();
    	navi.getNavigationBar().add(this.editBtn);
        navi.getNavigationBar().add(this.cancelBtn);
    }
});