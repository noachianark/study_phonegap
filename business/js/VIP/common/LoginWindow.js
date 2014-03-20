Ext.define('VIP.common.LoginWindow', {
	extend : 'Ext.window.Window',
	xtype : 'loginwindow',
    plain: true,  
    header: false,  
    border: false,  
    closable: false,  
    draggable: false,  
    frame:false,  
    resizable :false,  
	margin : 0,
	padding :0 ,
	width:420,
	
	createView : function() {
		var me = this;

		var items = [ {
			xtype : 'form',
			region : 'center',
			border: false,  
			layout : {
				type : 'vbox',
				align : 'left',
				pack : 'center'
			},	
			items : [ {
				xtype : 'panel',
				region : 'center',
				margin : '20 0 5 0',
				border: false,  
				
				layout : {
					type : 'hbox',
					align : 'left',
					pack : 'center'
				},	
				items : [{
					xtype:'label',
					text:'登录',
					margin : '0 5 5 70',
					style: {
						fontFamily: '微软雅黑',
						fontSize : '26px',
						color : '#434343'
			        }
				},{
					xtype:'label',
					text:'魔客会员营销管理系统',
					margin : '15 5 5 10',
					style: {
						fontSize :'13px',
						fontFamily: '微软雅黑',
						color : '#434343'
			        }
				}]
			},{
				border: false,
				xtype : 'box',
				width:'100%',
				html:'<div style="text-align:center;color:#666;">::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::</div>'
			},{
				xtype : 'panel',
				margin : '5 0 0 0',
				border: false,  
				layout : {
					type : 'hbox'
				},	
				items : [{
					xtype : 'label',
					text : '用户名:',
					margin : '30 0 0 50',
					style: {
						fontSize :'13px',
						fontFamily: '宋体',
						color : '#000'
			        }
				},{
					xtype : 'textfield',
					allowBlank : false,
					labelAlign :'left',
					name : 'accountName',
					itemId:'accountName',
					margin : '20 5 5 20',
					emptyText : '用户名',
					value : '',
					height : 35,
					width:250,
					selectOnFocus : true,
					listeners : {
						afterrender : {
							fn :  function(){
								this.focus();
							},
							delay : 500
						},
						specialKey : function(field, e) {
							if (e.keyCode == 13) {
								setTimeout(function(){
									me.down('#password').focus(true);
								}, 100);
							}
						}
					}
				}]
			},{
				xtype : 'panel',
				margin : '10 0 10 0',
				border: false,  
				layout : {
					type : 'hbox'
				},	
				items : [{
					xtype : 'label',
					text : '密　码:',
					margin : '20 0 0 50',
					style: {
						fontSize :'13px',
						fontFamily: '宋体',
						color : '#000'
			        }
				},{
					xtype : 'textfield',
					allowBlank : false,
					itemId : 'password',
					name : 'password',
					margin : '10 5 5 20',
					emptyText : '密　码',
					height : 35,
					inputType : 'password',
					value : '',
					width:250,
					selectOnFocus : true,
					listeners : {
						specialKey : function(field, e) {
							if (e.keyCode == 13) {
								setTimeout(function(){
									me.down('#verifyCode').focus(true);
								}, 100);
							}
						}
					}
				}]
			},{
				xtype : 'panel',
				margin : '10 0 10 0',
				border: false,  
				layout : {
					type : 'hbox'
				},	
				items : [{
					xtype : 'textfield',
					height : 30,
					margin : '0 0 0 55',
					fieldLabel : '验证码',
					labelWidth: 55,
					padding : '0 0 0 20',
					width : 230,
					maxLength : 4,
					itemId : 'verifyCode',
					name : 'verifyCode',
					emptyText : '验 证 码',
					listeners : {
						specialKey : function(field, e) {
							if (e.keyCode == 13) {
								me.signIn();
							}
						}
					}
				},{
					border : false,
					xtype : 'image',
					src : basePath+"verify-code.jsp?date="+new Date().getTime(),
					width : 80,
					height : 30,
					listeners : {
						afterrender : function(image){
							image.getEl().on('click', function(){
								image.setSrc(basePath+"verify-code.jsp?date="+new Date().getTime());
							}, image);
						}
					}
				}]
			},{
				border: false,
				margin : '10 5 5 115',
				padding : '0 0 5 0',
				layout : {
					type : 'hbox',
					align : 'left',
					pack : 'center'
				},	
				items : [ {
					xtype : 'button',
					text : '<font color="#fff" style="font-size:14px;font-family:\'宋体\';">登录</font>',
					width: 250,
					margin :'0 5 0 0',
					style: {
						background: "#299816",
						color : '#fff'
			        },
					padding : '10 5',
					handler : function(btn) {
						me.signIn();
					}
				}/*,{
					xtype : 'button',
					text : '重置',
					margin :'0 0 0 5',
					width: 65,
					padding : 5,
					handler : function(btn) {
						var winform = btn.up('signinform');
						var form = winform.down('form').getForm();
						form.reset();
					}
				}*/]
			},{
				xtype : 'label',
				margin : '0 0 35 280',
				html : '<a href="admin/'+window.location.search+'" class="fontlink">Admin登录界面</a>'
			}]
		}];
	

		return items;
	},

	/*createButtons : function() {
		var me = this;
		var buttons = [ {
			text : '登录',
			handler : function(btn) {
				me.signIn();
			}
		}, {
			text : '重置',
			handler : function(btn) {
				var winform = btn.up('signinform');
				var form = winform.down('form').getForm();
				form.reset();
			}
		} ];

		return buttons;
	},*/

	initComponent : function() {
		Ext.apply(this, {
/*			buttons : this.createButtons(),*/
			items : this.createView()
		});
		/*alert();*/
		this.callParent(arguments);
	},
	
	signIn : function(){
		var me = this;
		me.setLoading('登录中...');
		var form = me.down('form').getForm();
		var values = form.getValues();
		values.password = base64encode(values.password);
		if (form.isValid()) {
			
			OperatorAction.login(values.verifyCode,domainPrefix,values.accountName,values.password, function(actionResult) {
				me.setLoading(false);
				if (actionResult.success) {
					window.operator = actionResult.data.operator;
					window.contextPath = actionResult.data.contextPath;
					window.localStorage.setItem('allowPublishCoupons', actionResult.data.allowPublishCoupons);
					window.localStorage.setItem('allowPublishMessages', actionResult.data.allowPublishMessages);
					window.location.reload();
				} else {
					Ext.Msg.info(actionResult.message,function(){
						setTimeout(function(){
							me.down('#accountName').focus(true);
						}, 100);
					});
				}
			});
		} else {
			if (values.accountName == null || values.accountName == "") {
				Ext.Msg.info("请输入管理员帐号");
			} else if (values.password == null || values.password == "") {
				Ext.Msg.info("请输入管理员密码");
			}
			me.setLoading(false);
		}
	}
});