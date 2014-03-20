Ext.define('VIP.common.LoginWindow', {
	extend : 'Ext.window.Window',
	xtype : 'loginwindow',
    plain: true,  
    header: false,  
    border: false,  
    closable: false,  
    draggable: false,  
    frame:true,  
    resizable :false,  
    shadow:false,
	margin : 0,
	padding :0 ,
	width:420,
	createView : function() {
		var me = this;

		var items = [ {
			xtype : 'form',
			region : 'center',
			border: false,  

			bodyStyle: 'background:#dfdfdf',
			layout : {
				type : 'vbox',
				align : 'left',
				pack : 'center'
			},	
			items : [ {
				xtype : 'panel',
				region : 'center',
				margin : '20 0 0 50',
				border: false,  
				bodyStyle: 'background:#dfdfdf',
				layout : {
					type : 'hbox',
					align : 'left',
					pack : 'center'
				},	
				items : [{
					xtype:'label',
					text:'登录',
					margin : '0 5 0 0',
					style: {
						fontFamily: '微软雅黑',
						fontSize : '26px',
						color : '#434343'
			        }
				},{
					xtype:'label',
					text:'魔客会员',
					margin : '15 5 0 10',
					style: {
						fontSize :'13px',
						fontFamily: '微软雅黑',
						color : '#434343'
			        }
				}]
			},{
				
				xtype : 'textfield',
				allowBlank : false,
				labelAlign :'left',
				name : 'accountName',
				itemId:'accountName',
				blankText : '请输入用户名',
				margin : '0 5 5 20',
				emptyText : '用 户 名',
				value : '',
				width: 320,
				height:45,
				fieldStyle : 'font-size:15px;font-family:\'微软雅黑\';padding-left:20px;font-weight: bold;border-top-left-radius:6px;border-top-right-radius:6px; ',
				margin : '20 0 0 50',
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
				
			},{
				xtype : 'textfield',
				allowBlank : false,
				itemId : 'password',
				name : 'password',
				margin : '0 5 5 20',
				emptyText : '密 　 码',
				emptyCls : '',
				height : 45,
				blankText : '请输入密码',
				inputType : 'password',
				value : '',
				width: 320,
				fieldStyle : 'font-size:15px;font-family:\'微软雅黑\';padding-left:20px;font-weight: bold;',
				margin : '0 0 0 50',
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
			},{
				xtype : 'container',
				layout : 'hbox',
				width: 320,
				height : 30,
				margin : '0 0 0 50',
				style : 'background:#fff;border: 1px solid #bbb;border-bottom-left-radius:6px;border-bottom-right-radius:6px; ',
				items : [{
					xtype : 'textfield',
					height : 30,
					width : 240,
					border : false,
					maxLength : 4,
					itemId : 'verifyCode',
					name : 'verifyCode',
					emptyText : '验 证 码',
					fieldStyle : 'font-size:15px;font-family:\'微软雅黑\';padding-left:20px;font-weight: bold;border:0px;',
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
				xtype : 'checkbox',
				boxLabel: '记住用户名',
                name: 'saveAccount',
                itemId: 'saveAccount',
                margin : '5 0 0 50',
                boxLabelCls : 'checkLabel',
                inputValue: 'true'
			},{
				xtype : 'button',
				text : '<font color="#fff" style="font-size:14px;font-family:\'宋体\';">登录</font>',
				height : 45,
				width: 320,
				margin : '20 0 5 50',
		        style : 'border-radius:6px;background:#299816',
				padding : '10 5',
				handler : function(btn) {
					me.signIn();
				}
			},{
				xtype : 'label',
				margin : '0 0 35 285',
				html : '<a href="../'+window.location.search+'" class="fontlink">操作员登录界面</a>'
			}]
		}];
	

		return items;
	},

	
	initComponent : function() {
		Ext.apply(this, {
			items : this.createView()
		});
		this.callParent(arguments);
		
		this.load();
	},
	load : function(){
		var me =this;
		var accountName = window.localStorage.getItem('saveAccount');
		if(accountName){
			me.down('#accountName').setValue(accountName);
			me.down('#saveAccount').setValue(true);
		}
		
	},
	signIn : function(){
		var me = this;
		me.setLoading('登录中...');
		var form = me.down('form').getForm();
		var values = form.getValues();
		values.password = base64encode(values.password);
		if (form.isValid()) {
			if(values.saveAccount){
				window.localStorage.setItem('saveAccount', values.accountName);
			}else{
				window.localStorage.removeItem("saveAccount");
			}
			BusinessAdminAction.login(values.verifyCode,domainPrefix,values.accountName,values.password, function(actionResult) {
				me.setLoading(false);
				if (actionResult.success) {
					window.account = actionResult.data.operator;
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