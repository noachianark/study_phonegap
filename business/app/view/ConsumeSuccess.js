/**
 * @class Business.view.ConsumeSuccess
 * @extends extendsClass
 * Description
 */
Ext.define('Business.view.ConsumeSuccess', {
    extend: 'Ext.Container',
    alias:'widget.consumesuccess',

    config: {
    	cls:'consumesuccess',
    	fullscreen:true,
        title:'会员结账',
        layout:{
        	type:'vbox'
        },
        items:[
            {
                xtype:'container',
                flex:1,
                items:[
                    {
                        xtype:'container',
                        style:{
                            background:'rgba(219,228,221,1)'
                        },
                        items:[
                            {
                                xtype:'container',
                                padding:'10vw 0 10vw 0',
                                items:[
                                    {
                                        xtype:'container',
                                        layout:{
                                            type:'hbox',
                                            pack:'center',
                                            align:'center'
                                        },
                                        items:[
                                            {
                                                xtype:'label',
                                                cls:'success-tag'
                                            },
                                            {
                                                xtype:'label',
                                                html:'支付成功',
                                                margin:'0 0 0 10',
                                                cls:'consume-label-success'
                                            }
                                        ]
                                    },
                                    {
                                        xtype:'label',
                                        cls:'consume-label-username',
                                        itemId:'consume-username',
                                        tpl:'{username}',
                                        style:'text-align:center'
                                    },
                                    {
                                        xtype:'label',
                                        itemId:'consume-balance',
                                        cls:'consume-label-balance',
                                        tpl:'账户余额：{balance}',
                                        style:'text-align:center'
                                    },
                                    {
                                        xtype:'label',
                                        itemId:'consume-consume',
                                        cls:'consume-label-consume',
                                        tpl:'消费金额：{consume}',
                                        style:'text-align:center'
                                    }                                    
                                ]
                            }
                        ]
                    }
                ]
            },
        	{
        		xtype:'button',
        		text:'返回',
        		itemId:'returnBtn',
                margin:10,
                style:{
                    'background':'rgba(255,255,255,0.25)',
                    'border':'1px solid rgba(255,255,255,1)'
                }                
        	}
        ]
    }
});