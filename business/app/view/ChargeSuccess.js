/**
 * @class Business.view.ChargeSuccess
 * @extends extendsClass
 * Description
 */
Ext.define('Business.view.ChargeSuccess', {
	extend:'Ext.Container',
	alias:'widget.chargesuccess',
    config: {
        cls:'chargesuccess',
        fullscreen:true,
        title:'会员充值',
        layout:{
        	type:'vbox'
        },
        style:{
            background:'rgba(0,0,0,0)'
        },
        items:[
            {
                xtype:'container',
                flex:1,
                items:[
                    {
                        xtype:'container',
                        style:{
                            background:'rgba(255,229,225,1)'
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
                                                cls:'charge-label-success',
                                                html:'充值成功',
                                                margin:'0 0 0 10'
                                            }
                                        ]
                                    },
                                    {
                                        xtype:'label',
                                        cls:'charge-label-username',
                                        itemId:'charge-username',
                                        tpl:'{username}',
                                        style:'text-align:center'
                                    },
                                    {
                                        xtype:'label',
                                        itemId:'charge-balance',
                                        cls:'charge-label-balance',
                                        tpl:'账户余额 : {balance}',
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
                style:{
                    'background':'rgba(255,255,255,0.25)',
                    'border':'1px solid rgba(255,255,255,1)'
                },
                margin:10
        	}
        ]
    }
});