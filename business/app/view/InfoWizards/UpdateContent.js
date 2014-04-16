/**
 * @class Business.view.InfoWizards.UpdateContent
 * @extends Ext.Container
 * Description
 */
Ext.define('Business.view.InfoWizards.UpdateContent', {
    extend: 'Ext.Container',
    alias:'widget.updatecontent',
    requires: [
        
    ],

    config: {
        autoDestroy:true,
        layout:{
        	type:'vbox'
        },
        cls:'update-content',
        title:'修改资讯信息',
        items:[
        	{
        		flex:1,
        		xtype:'container',
        		margin:10,
        		items:[
                    {
                        xtype:'label',
                        html:'标题',
                        margin:'10 10 0 10'
                    },
		        	{
		        		xtype:'textfield',
		        		clearIcon:false,
		        		placeHolder:'标题',
		        		margin:"0 10 10 10"
		        	},
                    {
                        xtype:'label',
                        html:'内容',
                        margin:'10 10 0 10'
                    },
		        	{
		        		xtype:'textareafield',
		        		clearIcon:false,
		        		placeHolder:'内容',
		        		margin:"0 10 10 10"
		        	}
        		]
        	},
        	{
        		xtype:'button',
        		text:'保存修改',
                itemId:'update',
                margin:10,
                style:{
                    'background':'rgba(255,255,255,0.25)',
                    'border':'1px solid rgba(255,255,255,1)'
                }        		
        	},
            {
                xtype:'button',
                text:'删除信息',
                itemId:'delete',
                margin:10,
                style:{
                    'background':'rgba(255,255,255,0.25)',
                    'border':'1px solid rgba(255,255,255,1)'
                }                 
            }
		]
    },
    setNavBar:function(navi,panel){
        var me = this;
        var btn = Ext.create('Ext.Button',{
            xtype:"button",
            text:"下一步",
            align:'right',
            itemId:'showPics',
            action:'add',
            listeners:{
                tap:function(){
                    me.showPictures();
                },
                scope:me
            }
        });
    	navi.getNavigationBar().add(btn);
    },
    initialize:function(){
        this.down("#update").on('tap',this.updateInfo,this);
        this.down("#delete").on('tap',this.deleteInfo,this);
        if(this.getData()){
            this.down("textfield").setValue(this.getData().title);
            this.down("textareafield").setValue(this.getData().content);
        }
    },
    updateInfo:function(){
        var me = this;
        Ext.Viewport.setMasked({
            xtype:'loadmask',
            message:'更新数据中...'
        });
        var title = this.down("textfield").getValue();
        var content = this.down("textareafield").getValue();
        var params={
            title:title,
            content:content,
            id:this.getData().id
        }
        if(this.getData().type=="news"){
            PMessageAction.editNews(params,resultHandler);
        }else{
            PMessageAction.editCoupon(params,resultHandler);
        }

        function resultHandler (actionResult) {
            Ext.Viewport.setMasked(false);
            if(actionResult.success){
                Ext.Msg.alert('信息','修改保存成功');
                me.fireEvent("updateSuccess","#"+me.getData().type,me);
            }else{
                Ext.Msg.alert('信息',actionResult.message);
            }
        }
        
    },
    deleteInfo:function(){
        var me = this;

        function resultHandler(actionResult){
            Ext.Viewport.setMasked(false);
            if(actionResult.success){
                me.fireEvent("onDeleteInfo","#"+me.getData().type,me);
            }else{
                Ext.Msg.alert('信息','删除成功');
            }
        };


        Ext.Msg.confirm('信息','真的要删除该条资讯吗？',function(btnId){
            if(btnId=="yes"){
                Ext.Viewport.setMasked({
                    xtype:'loadmask',
                    message:'正在删除...'
                });                
                if(me.getData().type == "news"){
                    PMessageAction.deleteNews(me.getData().id,resultHandler);
                }else{
                    PMessageAction.deleteCoupon(me.getData().id,resultHandler);
                }
            }
        });

    },
    showPictures:function(){
        var me = this;
        Ext.Viewport.setMasked({
            xtype:'loadmask',
            message:'读取中...'
        });
        function resultHandler(actionResult){
            if(actionResult.success){
                actionResult.data.type = me.getData().type;
                me.fireEvent("onFindById",actionResult.data,me);
            }else{
                Ext.Msg.alert('信息',actionResult.message);
            }
            Ext.Viewport.setMasked(false);
        }
        if(this.getData().type == "news"){
            PMessageAction.findNewsById(this.getData().id,resultHandler);
        }else{
            PMessageAction.findCouponById(this.getData().id,resultHandler);
        }
    }
});