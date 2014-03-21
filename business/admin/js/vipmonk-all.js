Ext.define("VIP.Main",{extend:Ext.panel.Panel,alias:["widget.vipmain"],requires:[],id:"main",region:"center",layout:"card",defaults:{border:false,closable:true},items:[],initComponent:function(){this.callParent(arguments)},setContent:function(a){this.removeAll();this.add(a)}});Ext.define("VIP.store.BaseStore",{extend:Ext.data.Store,constructor:function(a){this.callParent([a]);this.on("load",function(){var b=this.getProxy().getReader().rawData;if(b.message){Ext.MessageBox.show({title:b.success?"信息":"错误",msg:b.message,buttons:Ext.MessageBox.OK,icon:b.success?Ext.MessageBox.INFO:Ext.MessageBox.ERROR,fn:function(d,c){if(b.errorType==0){document.location.href="http://localhost:8080/vipmonk/business/index.html"}}})}},this)}});Ext.define("VIP.shop.model.Shop",{extend:Ext.data.Model,fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"discountDescription",type:"string"},{name:"chargeWays",type:"string"},{name:"contactName",type:"string"},{name:"telephone",type:"string"},{name:"smsLimit",type:"string"},{name:"state",type:"string"},{name:"address",type:"string"}]});Ext.define("VIP.shop.store.Shop",{extend:VIP.store.BaseStore,model:"VIP.shop.model.Shop",sorters:[],remoteSort:true,pageSize:50,proxy:{type:"direct",directFn:"ShopAction.list",reader:{type:"json",root:"records"}},autoLoad:true});Ext.define("VIP.shop.ShopGrid",{extend:Ext.grid.Panel,xtype:"shopgrid",layout:"fit",title:"店铺管理",columns:[{xtype:"rownumberer",width:50,align:"center",text:"序列",sortable:false},{text:"店铺名称",dataIndex:"name",flex:1},{text:"联系人",dataIndex:"contactName",flex:1},{text:"联系电话",dataIndex:"telephone",flex:2},{text:"分店地址",dataIndex:"address",flex:1},{text:"状态",dataIndex:"state",flex:1,renderer:function(b,a){if(b==1){a.style="color:#0f0";return"正常"}else{if(b==0){a.style="color:#00f";return"冻结"}else{if(b==-2){a.style="color:#f00";return"注销"}else{return b}}}}}],createDockedItems:function(a){var b=this;var d={xtype:"toolbar",dock:"top",items:["->",{xtype:"button",icon:"images/add.png",width:80,text:"添加",handler:function(e){e.up("shopgrid").addShop()}},"-",{xtype:"button",icon:"images/edit.png",width:80,itemId:"edit",text:"修改",disabled:true,handler:function(e){e.up("shopgrid").editShop()}},"-",{xtype:"button",icon:"images/delete.png",width:80,itemId:"delete",text:"删除",disabled:true,handler:function(e){e.up("shopgrid").deleteShop()}}]};var c={xtype:"pagingtoolbar",dock:"bottom",store:a,displayInfo:true,emptyMsg:"没有查询到数据"};return[d,c]},createStore:function(){var a=Ext.create("VIP.shop.store.Shop");var b=a.getProxy().extraParams;if(!b){b={};a.getProxy().extraParams=b}if(window.account.businessId!=null){b.businessId=window.account.businessId}return a},initComponent:function(){var a=this.createStore();Ext.apply(this,{store:a,dockedItems:this.createDockedItems(a)});this.callParent(arguments);this.on("selectionchange",this.resetButtonStatus,this);this.on("itemdblclick",this.editShop,this)},refresh:function(){this.getStore().reload()},resetButtonStatus:function(a,b){if(b.length==1){this.down("#edit").setDisabled(false);this.down("#delete").setDisabled(false)}else{this.down("#edit").setDisabled(true);this.down("#delete").setDisabled(true)}},addShop:function(){var b=this;var a=Ext.create("VIP.shop.ShopWindow",{params:{},onSave:{fn:b.refresh,scope:b}});a.show()},editShop:function(){var d=this;var a=d.getSelectionModel().getSelection()[0];var c=a.raw.id;var b=Ext.create("VIP.shop.ShopWindow",{params:{shopId:c},onSave:{fn:d.refresh,scope:d}});b.show()},deleteShop:function(){var c=this;var a=this.getSelectionModel().getSelection()[0];var b=a.raw.name;Ext.Msg.confirm("确认","确认要删除店铺["+b+"] 吗？",function(e){if(e=="yes"){var d=a.raw.id;ShopAction.deleteShop(d,function(f){if(f.success){c.refresh()}else{Ext.Msg.error(f.message)}})}},this)}});Ext.define("VIP.security.model.OperatorRule",{extend:Ext.data.Model,fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"actions",type:"string"},{name:"actionsStr",type:"string"},{name:"description",type:"string"}]});Ext.define("VIP.security.store.OperatorRule",{extend:VIP.store.BaseStore,model:"VIP.security.model.OperatorRule",sorters:[],remoteSort:true,pageSize:50,proxy:{type:"direct",directFn:"OperatorRuleAction.findOperatorRules",reader:{type:"json",root:"records"}},autoLoad:true});Ext.define("VIP.security.OperatorRuleGrid",{extend:Ext.grid.Panel,alias:["widget.operatorrulegrid"],title:"",layout:"fit",title:"权限管理",columns:[{xtype:"rownumberer",width:50,align:"center",text:"序列",sortable:false},{text:"名称",dataIndex:"name",flex:1},{text:"描述",dataIndex:"description",flex:3}],createStore:function(){var a=Ext.create("VIP.security.store.OperatorRule");var b=a.getProxy().extraParams;if(!b){b={};a.getProxy().extraParams=b}if(window.account.businessId!=null){b.businessId=window.account.businessId}return a},createDockedItems:function(a){var c={xtype:"toolbar",dock:"top",items:["->",{xtype:"button",text:"添加",icon:"images/add.png",width:80,handler:function(d){d.up("operatorrulegrid").addRule()}},"-",{xtype:"button",text:"修改",icon:"images/edit.png",width:80,itemId:"edit",disabled:true,handler:function(d){d.up("operatorrulegrid").editRule()}},"-",{xtype:"button",text:"删除",icon:"images/delete.png",width:80,itemId:"delete",disabled:true,handler:function(d){d.up("operatorrulegrid").deleteRule()}}]};var b={xtype:"pagingtoolbar",dock:"bottom",store:a,displayInfo:true,emptyMsg:"没有查询到数据"};return[c,b]},initComponent:function(){var a=this.createStore();Ext.apply(this,{store:a,dockedItems:this.createDockedItems(a)});this.callParent(arguments);a.on("load",function(){var b=this.getStore().getProxy().getReader().rawData;if(!b.success){Ext.Msg.error(b.message)}},this);this.on("selectionchange",this.resetButtonStatus,this);this.on("itemdblclick",this.editRule,this)},refresh:function(){this.getStore().reload()},resetButtonStatus:function(b,c){if(c.length==1){var a=this.getSelectionModel().getSelection()[0];var d=a.raw.id;this.down("#edit").setDisabled(d==1);this.down("#delete").setDisabled(d==1)}else{this.down("#edit").setDisabled(false);this.down("#delete").setDisabled(false)}},addRule:function(){var a=this;var b=Ext.create("VIP.security.OperatorRuleWindow",{onSave:{fn:a.refresh,scope:a}});b.show()},editRule:function(){var c=this;var a=c.getSelectionModel().getSelection()[0];var b=a.raw.id;var d=Ext.create("VIP.security.OperatorRuleWindow",{params:{ruleId:b},onSave:{fn:c.refresh,scope:c}});d.show()},deleteRule:function(){var c=this;var a=this.getSelectionModel().getSelection()[0];var b=a.raw.name;Ext.Msg.confirm("确认","确认要删除权限组 ["+b+"] 吗？",function(e){if(e=="yes"){var d=a.raw.id;OperatorRuleAction.deleteOperatorRule(d,function(f){if(f.success){c.refresh()}else{Ext.Msg.error(f.message)}})}},this)}});Ext.define("VIP.operator.model.Operator",{extend:Ext.data.Model,fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"operatorNumber",type:"string"},{name:"accountName",type:"string"},{name:"password",type:"string"},{name:"idCardNumber",type:"string"},{name:"sex",type:"string"},{name:"birthday",type:"string"},{name:"education",type:"string"},{name:"address",type:"string"},{name:"mobile",type:"string"},{name:"shopId",type:"string"},{name:"shopName",type:"string"},{name:"lastSigninTime",type:"string"},{name:"operatorRuleId",type:"string"},{name:"operatorRuleName",type:"string"},{name:"state",type:"string"},{name:"notes",type:"string"}]});Ext.define("VIP.operator.store.Operator",{extend:VIP.store.BaseStore,model:"VIP.operator.model.Operator",sorters:[],remoteSort:true,pageSize:50,proxy:{type:"direct",directFn:"OperatorAction.findOperators",reader:{type:"json",root:"records"}},autoLoad:true});Ext.define("VIP.operator.OperatorGrid",{extend:Ext.grid.Panel,alias:["widget.operatorgrid"],title:"",layout:"fit",title:"操作员管理",columns:[{xtype:"rownumberer",width:50,align:"center",text:"序列",sortable:false},{text:"姓名",dataIndex:"name",flex:1},{text:"用户名",dataIndex:"accountName",flex:1},{text:"所属店铺",dataIndex:"shopName",flex:2,renderer:function(d,b,a){var c=a.raw.shopState;if(c=="1"){return d}else{if(c=="0"){b.style="color:#00F";return d+"　【已冻结】"}else{b.style="color:#F00";return d+"　【已注销】"}}}},{text:"性别",dataIndex:"sex",renderer:function(a){if(a=="M"){return"男"}else{if(a=="F"){return"女"}else{if(a=="U"){return"未知"}else{return a}}}}},{text:"角色",dataIndex:"operatorRuleName"},{text:"最后登录时间",dataIndex:"lastSigninTime",flex:2},{text:"状态",dataIndex:"state",renderer:function(b,a){if(b=="1"){a.style="color:#0f0";return"正常"}else{if(b==0){a.style="color:#00f";return"冻结"}else{if(b=="-1"){a.style="color:#C9C9C9";return"已过期"}else{if(b=="-2"){a.style="color:#C9C9C9";return"已注销"}else{return b}}}}}}],createStore:function(){var a=Ext.create("VIP.operator.store.Operator");var b=a.getProxy().extraParams;if(!b){b={};a.getProxy().extraParams=b}if(window.account.businessId!=null){b.businessId=window.account.businessId}return a},createDockedItems:function(a){var b=this;var d={xtype:"toolbar",dock:"top",items:[{xtype:"textfield",fieldLabel:"姓名",labelWidth:30,margin:"0 5 0 10",emptyText:"姓名",width:100,itemId:"name",listeners:{specialKey:{fn:function(g,e,f){if(e.keyCode==13){b.doSearch()}},delay:200}}},{xtype:"textfield",fieldLabel:"用户名",labelWidth:50,margin:"0 5 0 10",emptyText:"用户名",width:150,itemId:"accountName",listeners:{specialKey:{fn:function(g,e,f){if(e.keyCode==13){b.doSearch()}},delay:200}}},{xtype:"vcombo",fieldLabel:"店铺",labelWidth:30,width:200,margin:"0 5 0 10",emptyText:"选择店铺",itemId:"shopId",getProxy:function(){return{type:"direct",directFn:"ShopAction.listAsOption",extraParams:{allowBlank:true,blankText:"全部"}}}},{xtype:"vcombo",fieldLabel:"状态",labelWidth:30,emptyText:"选择状态",width:125,margin:"0 5 0 10",itemId:"state",options:[{text:"全部",value:""},{text:"正常",value:"1"},{text:"冻结",value:"0"}]},{xtype:"button",icon:"images/search-16.png",text:"搜索",width:70,handler:function(e){e.up("operatorgrid").doSearch()}},"->","-",{xtype:"button",text:"添加",icon:"images/add.png",width:80,handler:function(e){e.up("operatorgrid").addOperator()}},"-",{xtype:"button",text:"修改",icon:"images/edit.png",width:80,itemId:"edit",disabled:true,handler:function(e){e.up("operatorgrid").editOperator()}},"-",{xtype:"button",text:"注销",icon:"images/delete.png",width:80,itemId:"delete",disabled:true,handler:function(e){e.up("operatorgrid").deleteOperator()}},"-",{xtype:"button",text:"重置密码",icon:"images/reset_password.png",width:100,itemId:"restore",disabled:true,handler:function(e){e.up("operatorgrid").restorePassword()}}]};var c={xtype:"pagingtoolbar",dock:"bottom",store:a,displayInfo:true,emptyMsg:"没有查询到数据"};return[d,c]},initComponent:function(){var a=this.createStore();Ext.apply(this,{store:a,dockedItems:this.createDockedItems(a)});this.callParent(arguments);this.on("selectionchange",this.resetButtonStatus,this);this.on("itemdblclick",this.editOperator,this)},doSearch:function(){var b=this.down("#name").getValue();var c=this.down("#shopId").getValue();var a=this.down("#accountName").getValue();var d=this.down("#state").getValue();var e=this.getStore().getProxy().extraParams;if(!e){e={};this.getStore().getProxy().extraParams=e}e.start=0;if(b!=""){e.name=b}else{delete e.name}if(a!=""){e.accountName=a}else{delete e.accountName}if(c!=""){e.shopId=c}else{delete e.shopId}if(d!=""){e.state=d}else{delete e.state}this.getStore().loadPage(1)},refresh:function(){this.getStore().reload()},resetButtonStatus:function(c,d){if(d.length==1){var a=this.getSelectionModel().getSelection()[0];var b=a.raw.id;this.down("#restore").setDisabled(b==1);this.down("#edit").setDisabled(b==1);this.down("#delete").setDisabled(b==1)}else{this.down("#restore").setDisabled(true);this.down("#edit").setDisabled(true);this.down("#delete").setDisabled(true)}},addOperator:function(){var a=this;OperatorAction.canAddOperator(function(b){if(b.success){var c=Ext.create("VIP.operator.OperatorWindow",{params:{},onSave:{fn:a.refresh,scope:a}});c.show()}else{Ext.Msg.error(b.message)}})},editOperator:function(){var a=this;OperatorAction.canEditOperator(function(b){if(b.success){var c=a.getSelectionModel().getSelection()[0];var d=c.raw.id;var e=Ext.create("VIP.operator.OperatorWindow",{params:{operatorId:d},onSave:{fn:a.refresh,scope:a}});e.show()}else{Ext.Msg.error(b.message)}})},restorePassword:function(){var c=this;var a=this.getSelectionModel().getSelection()[0];var b=a.raw.name;OperatorAction.canRestorePassword(function(d){if(d.success){Ext.Msg.confirm("确认","确认要重置操作员 ["+b+"]的密码吗？",function(f){if(f=="yes"){var e=a.raw.id;OperatorAction.restorePassword(e,function(g){if(g.success){Ext.Msg.info("重置成功");c.refresh()}else{Ext.Msg.error(g.message)}})}},this)}else{Ext.Msg.error(d.message)}})},deleteOperator:function(){var c=this;var a=this.getSelectionModel().getSelection()[0];var b=a.raw.name;OperatorAction.canRestorePassword(function(d){if(d.success){Ext.Msg.confirm("确认","注销无可逆性,请慎重操作！确认要注销吗？",function(f){if(f=="yes"){var e=a.raw.id;OperatorAction.deleteOperator(e,function(g){if(g.success){c.refresh()}else{Ext.Msg.error(g.message)}})}},this)}else{Ext.Msg.error(d.message)}})}});Ext.define("VIP.admin.model.Admin",{extend:Ext.data.Model,fields:[{name:"id",type:"string"},{name:"accountName",type:"string"},{name:"email",type:"string"},{name:"description",type:"string"},{name:"name",type:"string"}]});Ext.define("VIP.admin.store.Admin",{extend:VIP.store.BaseStore,model:"VIP.admin.model.Admin",sorters:[],remoteSort:true,pageSize:50,proxy:{type:"direct",directFn:"BusinessAdminAction.findBusinessAdmin",reader:{type:"json",root:"records"}},autoLoad:true});Ext.define("VIP.admin.AdminGrid",{extend:Ext.grid.Panel,alias:["widget.admingrid"],title:"",layout:"fit",title:"Admin管理",columns:[{xtype:"rownumberer",width:50,align:"center",text:"序列",sortable:false},{text:"账号名",dataIndex:"accountName",flex:1},{text:"姓名",dataIndex:"name",flex:1},{text:"电子邮箱",dataIndex:"email",flex:1},{text:"描述",dataIndex:"description",flex:1}],createStore:function(){var a=Ext.create("VIP.admin.store.Admin");return a},createDockedItems:function(a){var b=this;var d={xtype:"toolbar",dock:"top",items:["->",{xtype:"button",text:"添加",icon:"images/add.png",width:80,handler:function(e){e.up("admingrid").addAdmin()}},"-",{xtype:"button",text:"修改",icon:"images/edit.png",width:80,itemId:"edit",disabled:true,handler:function(e){e.up("admingrid").editAdmin()}},"-",{xtype:"button",text:"注销",icon:"images/delete.png",width:80,itemId:"delete",disabled:true,handler:function(e){e.up("admingrid").deleteAdmin()}}]};var c={xtype:"pagingtoolbar",dock:"bottom",store:a,displayInfo:true,emptyMsg:"没有查询到数据"};return[d,c]},initComponent:function(){var a=this.createStore();Ext.apply(this,{store:a,dockedItems:this.createDockedItems(a)});this.callParent(arguments);this.on("selectionchange",this.resetButtonStatus,this);this.on("itemdblclick",this.editAdmin,this)},refresh:function(){this.getStore().reload()},resetButtonStatus:function(a,b){if(b.length==1){this.down("#edit").setDisabled(false);this.down("#delete").setDisabled(false)}else{this.down("#edit").setDisabled(true);this.down("#delete").setDisabled(true)}},addAdmin:function(){var b=this;var a=Ext.create("VIP.admin.AdminWindow",{params:{adminId:null},onSave:{fn:b.refresh,scope:b}});a.show()},editAdmin:function(){var c=this;var a=c.getSelectionModel().getSelection()[0];var d=a.raw.id;var b=Ext.create("VIP.admin.AdminWindow",{params:{adminId:d},onSave:{fn:c.refresh,scope:c}});b.show()},deleteAdmin:function(){var c=this;var a=this.getSelectionModel().getSelection()[0];var b=a.raw.accountName;Ext.Msg.confirm("确认","确认要Admin账号:["+b+"] 吗？",function(d){if(d=="yes"){BusinessAdminAction.removeBusinessAdmin(a.raw.id,function(e){if(e.success){c.refresh()}else{Ext.Msg.error(e.message)}})}})}});Ext.define("VIP.west.Main",{extend:Ext.panel.Panel,alias:["widget.vipwestmain"],region:"west",id:"west",split:true,width:250,minWidth:250,maxWidth:250,collapsible:true,titleCollapse:true,bodyStyle:"background:#222",items:[{xtype:"box",html:'<div class="west-div" id="west-admin"><div class="west-font"><img class="west-img" src="images/admin.png" />Admin管理</div></div>'},{xtype:"box",html:'<div class="west-div" id="west-shop"><div class="west-font"><img class="west-img" src="images/shop.png" />店铺管理</div></div>'},{xtype:"box",html:'<div class="west-div" id="west-operatorRule"><div class="west-font"><img class="west-img" src="images/key.png" />权限管理</div></div>'},{xtype:"box",html:'<div class="west-div" id="west-operator"><div class="west-font"><img class="west-img" src="images/user.png" />操作员管理</div></div>'},{xtype:"box",html:'<div class="west-div" id="west-exit"><div class="west-font"><img class="west-img" src="images/exit.png" /> 退　出 </div></div>'}],listeners:{beforeexpand:function(){this.setTitle(null)},collapse:function(){this.setTitle("功能菜单")}},initComponent:function(){var a=this;this.callParent(arguments);setTimeout(function(){a.attachEvents()},50)},attachEvents:function(){var b=Ext.get("west-admin");var c=Ext.get("west-operator");var a=Ext.get("west-operatorRule");var e=Ext.get("west-shop");var d=Ext.get("west-exit");b.on("click",function(){vip.viewport.main.setContent({xtype:"admingrid",closable:false})},this);c.on("click",function(){vip.viewport.main.setContent({xtype:"operatorgrid",closable:false})},this);a.on("click",function(){vip.viewport.main.setContent({xtype:"operatorrulegrid",closable:false})},this);e.on("click",function(){vip.viewport.main.setContent({xtype:"shopgrid",closable:false})},this);d.on("click",function(){Ext.MessageBox.confirm("警告","你确定你要退出吗？",function(f){if(f=="yes"){SignAction.signOut(function(g){if(g.success){window.location.reload(true)}else{}})}})},this)}});Ext.define("Option",{extend:Ext.data.Model,fields:[{name:"text",type:"string"},{name:"value",type:"string"}]});Ext.define("VIP.widget.field.ComboBox",{extend:Ext.form.field.ComboBox,alias:["widget.vcombo"],forceSelection:true,editable:false,queryMode:"local",displayField:"text",valueField:"value",triggerAction:"all",initComponent:function(){var a=this;this.addEvents("optionsready");if(a.options){a.store=Ext.create("Ext.data.Store",{fields:["text","value"],data:a.options});a.fireEvent("optionsready",a)}else{a.store=Ext.create("Ext.data.Store",{model:"Option",proxy:a.getProxy(),autoLoad:true});a.store.on("load",function(){if(a.originalValue!=undefined&&a.originalValue!=""){a.setValue(a.originalValue)}else{if(a.allowBlank===false&&a.store.getTotalCount()>0){}}a.fireEvent("optionsready",a)},a,{delay:200});if(!a.isDisabled()){a.store.on("beforeload",function(){this.setDisabled(true)},a);a.store.on("load",function(){this.setDisabled(false)},a)}}this.callParent()},refresh:function(){if(!this.store.isLoading()){this.store.setProxy(this.getProxy());this.store.load()}},setOptions:function(a){this.store.loadData(a,false)},getText:function(){var b=this.store.findExact("value",this.getValue());if(b!=-1){var a=this.store.getAt(b).data;return a.text}}});Ext.define("VIP.widget.form.Panel",{extend:Ext.form.Panel,alias:["widget.vipform"],initComponent:function(){this.callParent(arguments)},bindEnterKeyEvent:function(){var c=function(i,g){var e=this.getForm().getFields().items;var f=e.indexOf(i);if(g.keyCode==13){f++;var h=e[f];while(h.readOnly||h.isDisabled()||!h.focus){f++;h=e[f]}h.focus(true,100)}};var a=this.getForm().getFields().items;for(var b=0;b<a.length;b++){var d=a[b];if(d.readOnly||d.isDisabled()||d.xtype=="radio"||d.xtype=="textarea"){continue}else{d.on("specialKey",c,this)}}}});Ext.define("VIP.Viewport",{extend:Ext.Viewport,alias:["widget.vipviewport"],layout:"border",items:[{xtype:"vipwestmain"},{xtype:"vipmain"}],initComponent:function(){var a=this;this.callParent(arguments)}});Ext.define("VIP.admin.AdminWindow",{extend:Ext.window.Window,alias:["widget.adminwindow"],layout:"fit",id:"adminwindow",width:640,height:300,resizable:false,closable:false,border:false,createButtons:function(){var b=this;var a=[{text:"保存",icon:"images/update.png",handler:function(c){b.saveAdmin()}},{text:"取消",icon:"images/cancel.png",handler:function(c){b.destroy()}}];return a},createView:function(){var b=this;var a=[{xtype:"vipform",defaults:{margin:5},items:[{xtype:"fieldset",title:"基本信息",margin:5,height:155,defaults:{width:275,labelAlign:"right"},layout:{type:"table",columns:2},items:[{xtype:"textfield",fieldLabel:"账号名",itemId:"accountName",allowBlank:false,name:"accountName"},{xtype:"textfield",fieldLabel:"姓名",allowBlank:false,name:"name"},{xtype:"textfield",fieldLabel:"电子邮箱",allowBlank:false,regex:/^[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/,regexText:"无效的电子邮箱",name:"email",colspan:2},{xtype:"textareafield",fieldLabel:"描述",name:"description",colspan:2,width:550}]},{xtype:"fieldset",title:"密码",margin:5,height:65,defaults:{width:275,labelAlign:"right"},layout:{type:"table",columns:2},items:[{xtype:"textfield",fieldLabel:"密码",inputType:"password",itemId:"password",name:"password",allowBlank:false,vtype:"password",labelStyle:"color:red",initialPassField:"passwordAg",listeners:{specialKey:{fn:function(e,c,d){if(c.keyCode==13){b.down("#passwordAg").focus(true)}},delay:200}}},{xtype:"textfield",fieldLabel:"确认密码",itemId:"passwordAg",name:"passwordAg",inputType:"password",allowBlank:false,vtype:"password",initialPassField:"password",labelStyle:"color:red",listeners:{specialKey:{fn:function(e,c,d){if(c.keyCode==13){b.updatePassword()}},delay:200}}}]}]}];return a},initComponent:function(){var a=this;Ext.apply(this,{title:this.params.adminId?"修改Admin":"添加Admin",items:this.createView(),buttons:this.createButtons()});this.callParent(arguments);if(this.params.adminId){this.load()}},saveAdmin:function(){var c=this;var b=c.down("vipform").getForm();if(b.isValid()){var a=b.getValues();a.passwordAg=undefined;if(c.params.adminId){Ext.apply(a,{id:c.params.adminId});if(a.password=="******"){a.password=undefined}BusinessAdminAction.updateBusinessAdmin(a,function(d){if(d.success){Ext.Msg.info("修改成功");if(c.onSave){c.onSave.fn.call(c.onSave.scope)}c.destroy()}else{Ext.Msg.error(d.message)}})}else{Ext.apply(a,{businessId:window.account.businessId});BusinessAdminAction.addBusinessAdmin(a,function(d){if(d.success){Ext.Msg.info("添加成功");if(c.onSave){c.onSave.fn.call(c.onSave.scope)}c.destroy()}else{Ext.Msg.error(d.message)}})}}},load:function(){var a=this;a.down("#password").setValue("******");a.down("#passwordAg").setValue("******");a.down("#accountName").setReadOnly(true);BusinessAdminAction.findBusinessAdminById(a.params.adminId,function(b){if(b.success){a.down("vipform").getForm().setValues(b.data)}else{Ext.Msg.error(b.message)}})}});Ext.define("VIP.common.LoginWindow",{extend:Ext.window.Window,xtype:"loginwindow",plain:true,header:false,border:false,closable:false,draggable:false,frame:true,resizable:false,shadow:false,margin:0,padding:0,width:420,createView:function(){var b=this;var a=[{xtype:"form",region:"center",border:false,bodyStyle:"background:#dfdfdf",layout:{type:"vbox",align:"left",pack:"center"},items:[{xtype:"panel",region:"center",margin:"20 0 0 50",border:false,bodyStyle:"background:#dfdfdf",layout:{type:"hbox",align:"left",pack:"center"},items:[{xtype:"label",text:"登录",margin:"0 5 0 0",style:{fontFamily:"微软雅黑",fontSize:"26px",color:"#434343"}},{xtype:"label",text:"魔客会员",margin:"15 5 0 10",style:{fontSize:"13px",fontFamily:"微软雅黑",color:"#434343"}}]},{xtype:"textfield",allowBlank:false,labelAlign:"left",name:"accountName",itemId:"accountName",blankText:"请输入用户名",margin:"0 5 5 20",emptyText:"用 户 名",value:"",width:320,height:45,fieldStyle:"font-size:15px;font-family:'微软雅黑';padding-left:20px;font-weight: bold;border-top-left-radius:6px;border-top-right-radius:6px; ",margin:"20 0 0 50",selectOnFocus:true,listeners:{afterrender:{fn:function(){this.focus()},delay:500},specialKey:function(d,c){if(c.keyCode==13){setTimeout(function(){b.down("#password").focus(true)},100)}}}},{xtype:"textfield",allowBlank:false,itemId:"password",name:"password",margin:"0 5 5 20",emptyText:"密 　 码",emptyCls:"",height:45,blankText:"请输入密码",inputType:"password",value:"",width:320,fieldStyle:"font-size:15px;font-family:'微软雅黑';padding-left:20px;font-weight: bold;border-bottom-left-radius:6px;border-bottom-right-radius:6px;  ",margin:"0 0 0 50",selectOnFocus:true,listeners:{specialKey:function(d,c){if(c.keyCode==13){b.signIn()}}}},{xtype:"checkbox",boxLabel:"记住用户名",name:"saveAccount",itemId:"saveAccount",margin:"5 0 0 50",boxLabelCls:"checkLabel",inputValue:"true"},{xtype:"button",text:'<font color="#fff" style="font-size:14px;font-family:\'宋体\';">登录</font>',height:45,width:320,margin:"20 0 5 50",style:"border-radius:6px;background:#299816",padding:"10 5",handler:function(c){b.signIn()}},{xtype:"label",margin:"0 0 35 285",html:'<a href="../index.html" class="fontlink">操作员登录界面</a>'}]}];return a},initComponent:function(){Ext.apply(this,{items:this.createView()});this.callParent(arguments);this.load()},load:function(){var b=this;var a=window.localStorage.getItem("saveAccount");if(a){b.down("#accountName").setValue(a);b.down("#saveAccount").setValue(true)}},signIn:function(){var c=this;c.setLoading("登录中...");var b=c.down("form").getForm();var a=b.getValues();a.password=base64encode(a.password);if(b.isValid()){if(a.saveAccount){window.localStorage.setItem("saveAccount",a.accountName)}else{window.localStorage.removeItem("saveAccount")}BusinessAdminAction.login(domainPrefix,a.accountName,a.password,function(d){c.setLoading(false);if(d.success){window.account=d.data.operator;window.location.reload()}else{Ext.Msg.info(d.message,function(){setTimeout(function(){c.down("#accountName").focus(true)},100)})}})}else{if(a.accountName==null||a.accountName==""){Ext.Msg.info("请输入管理员帐号")}else{if(a.password==null||a.password==""){Ext.Msg.info("请输入管理员密码")}}c.setLoading(false)}}});Ext.define("VIP.common.SignInViewport",{extend:Ext.Viewport,xtype:"signinform",layout:"fit",createView:function(){var b=this;var a=[{xtype:"panel",border:false,width:"100%",layout:"anchor",items:[{xtype:"box",height:"85px",anchor:"100%",html:'<div style="height:100%;background:#dfdfdf"><div style="height:5px;background:#444"></div><img style="height:100%" src="images/login-picture.png "></div>'},{xtype:"box",anchor:"100% -175px",html:'<div style="position: absolute; z-index: 999; top:20%; left:20%"><p style="font-family:\'微软雅黑\';font-Size:24px;color:#fff;">便捷的使用体验，强大的会员管理</p></div><img style="width:100%;height:100%" src="images/world-wallpaper.jpg ">'},{xtype:"box",height:"90px",anchor:"100%",html:'<div style="text-align: center;padding-top:20px;height:100%;background:#fff"><a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">产品主页</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">公司主页</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">关于我们</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.vipmonk.com" style="text-decoration: none; color: #000;">联系我们</a><br/><p>昆明泽天科技  &copy;2013 All Rights Reserved</p></div>'}]}];return a},initComponent:function(){Ext.apply(this,{items:this.createView()});this.callParent(arguments);var a=Ext.create("VIP.common.LoginWindow");a.show();this.on("resize",function(b,e,d,c,f){if(e<500){a.setPosition(0,d*0.2)}else{a.setPosition(e-500,d*0.2)}},this)}});Ext.define("VIP.operator.OperatorWindow",{extend:Ext.window.Window,alias:["widget.operatorwindow"],layout:"fit",width:640,height:480,modal:true,border:false,resizable:false,closable:false,createButtons:function(){var b=this;var a=[{text:"保存",icon:"images/update.png",itemId:"saveBtn",width:90,handler:function(c){b.saveOperator()}},{text:"取消",icon:"images/cancel.png",width:90,handler:function(c){b.destroy()}}];return a},createView:function(){var b=this;var a=[{xtype:"vipform",defaults:{margin:5},layout:{type:"anchor"},items:[{xtype:"fieldset",title:"基本信息",anchor:"100% 80%",defaults:{width:275,labelAlign:"right"},layout:{type:"table",columns:2},items:[{fieldLabel:"店铺",xtype:"vcombo",name:"shopId",allowBlank:false,colspan:2,getProxy:function(){return{type:"direct",directFn:"ShopAction.listAsOption"}},listeners:{change:{fn:function(e,c,d){b.down("#name").focus(true)},delay:200}}},{xtype:"textfield",fieldLabel:"姓名",name:"name",itemId:"name",allowBlank:false,maxLength:"15",maxLengthText:"不可超过15位",vtype:"stringblank",listeners:{specialKey:{fn:function(e,c,d){if(c.keyCode==13){b.down("#accountName").focus(true)}},delay:200}}},{xtype:"textfield",fieldLabel:"用户名",name:"accountName",itemId:"accountName",maxLength:"15",maxLengthText:"不可超过15位",vtype:"stringblank",allowBlank:false,validFlag:true,validator:function(){return this.validFlag},listeners:{blur:function(d){var c=this;OperatorAction.getOperatorByAccountName(d.getValue(),function(e){c.validFlag=e.success?"此用户名已被占用！":true;c.validate()})},specialKey:{fn:function(e,c,d){if(c.keyCode==13){b.down("#password").focus(true)}},delay:200}}},{xtype:"textfield",fieldLabel:"密码",name:"password",itemId:"password",inputType:"password",allowBlank:false,vtype:"password",initialPassField:"passwordAg",listeners:{specialKey:{fn:function(e,c,d){if(c.keyCode==13){b.down("#passwordAg").focus(true)}},delay:200}}},{xtype:"textfield",fieldLabel:"确认密码",name:"passwordAg",itemId:"passwordAg",inputType:"password",allowBlank:false,vtype:"password",initialPassField:"password",listeners:{specialKey:{fn:function(e,c,d){if(c.keyCode==13){b.down("#idCardNumber").focus(true)}},delay:200}}},{xtype:"radiogroup",fieldLabel:"会员性别",columns:3,items:[{boxLabel:"男",name:"sex",checked:true,inputValue:"M"},{boxLabel:"女",name:"sex",inputValue:"F"},{boxLabel:"未知",name:"sex",inputValue:"U"}]},{xtype:"textfield",fieldLabel:"身份证号",name:"idCardNumber",itemId:"idCardNumber",allowBlank:false,regex:/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2013)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/,regexText:"无效的身份证",listeners:{specialKey:{fn:function(e,c,d){if(c.keyCode==13){b.down("#mobile").focus(true)}},delay:200}}},{xtype:"datefield",fieldLabel:"生日",name:"birthday",maxValue:new Date()},{xtype:"vcombo",fieldLabel:"教育程度",name:"education",options:[{text:"小学",value:"小学"},{text:"初中",value:"初中"},{text:"高中",value:"高中"},{text:"大专",value:"大专"},{text:"本科",value:"本科"},{text:"硕士",value:"硕士"},{text:"博士",value:"博士"},{text:"其他",value:"其他"}]},{xtype:"textfield",fieldLabel:"手机号",name:"mobile",itemId:"mobile",colspan:2,allowBlank:false,regex:/^1[3|4|5|8][0-9]{9}$/,regexText:"无效的手机号码",listeners:{specialKey:{fn:function(e,c,d){if(c.keyCode==13){b.down("#address").focus(true)}},delay:200}}},{xtype:"textfield",fieldLabel:"地址",name:"address",itemId:"address",colspan:2,maxLength:"30",maxLengthText:"不可超过30位",width:550,listeners:{specialKey:{fn:function(e,c,d){if(c.keyCode==13){b.down("#notes").focus(true)}},delay:200}}},{xtype:"textareafield",fieldLabel:"备注",name:"notes",itemId:"notes",maxLength:"140",maxLengthText:"不可超过140位",colspan:2,width:550}]},{xtype:"fieldset",title:"操作权限",anchor:"100% 20%",layout:{type:"table",columns:2},items:[{xtype:"vcombo",name:"operatorRuleId",fieldLabel:"角色",labelAlign:"right",width:275,allowBlank:false,getProxy:function(){return{type:"direct",directFn:"OperatorRuleAction.listAsOption"}},listeners:{change:function(e,d,c){b.down("#saveBtn").setDisabled(d==1)}}},{fieldLabel:"状态",xtype:"vcombo",name:"state",hidden:true,labelAlign:"right",itemId:"state",options:[{text:"正常",value:1},{text:"冻结",value:0},{text:"注销",value:-2}],allowBlank:false,listeners:{change:{fn:function(f,c,d){var e=f.getValue();if(e=="-2"){Ext.Msg.info("注销无可逆性,请慎重操作！")}},delay:200}}}]}]}];return a},initComponent:function(){var a=this;Ext.apply(this,{title:this.params.operatorId?"修改操作员":"添加操作员",items:this.createView(),buttons:this.createButtons()});this.callParent(arguments);setTimeout(function(){a.down("#name").focus(true)},500);if(this.params.operatorId){this.down("#password").hide();this.down("#passwordAg").hide();this.down("#state").show();this.load()}},load:function(){var a=this;OperatorAction.getOperatorById(this.params.operatorId,function(b){a.down("vipform").getForm().setValues(b.data)})},saveOperator:function(b){var d=this;var c=this.down("vipform").getForm();if(c.isValid()){var a=c.getValues();if(this.params.operatorId){OperatorAction.editOperator(Ext.apply({operatorId:this.params.operatorId},a),function(e){if(e.success){Ext.Msg.info("修改成功",function(){if(d.onSave){d.onSave.fn.call(d.onSave.scope)}d.destroy()})}else{Ext.Msg.error(e.message)}})}else{OperatorAction.addOperator(a,function(e){if(e.success){Ext.Msg.info("添加成功.",function(){if(d.onSave){d.onSave.fn.call(d.onSave.scope)}d.destroy()})}else{Ext.Msg.error(e.message)}})}}}});Ext.define("VIP.security.OperatorRuleWindow",{extend:Ext.window.Window,alias:["widget.operatorrulewindow"],layout:"fit",width:680,height:540,title:"",modal:true,border:false,resizable:false,closable:false,params:{},createButtons:function(){var b=this;var a=[{text:"保存",icon:"images/update.png",width:90,handler:function(c){if(b.params.ruleId!=undefined){b.saveRule()}else{b.addRule()}}},{text:"取消",icon:"images/cancel.png",width:90,handler:function(c){b.destroy()}}];return a},createView:function(){var b=this;var a=[{xtype:"vipform",defaults:{margin:5},layout:{type:"anchor"},items:[{xtype:"fieldset",title:"基本信息",anchor:"100% 30%",defaults:{width:500,labelAlign:"right"},layout:{type:"table",columns:1},items:[{xtype:"textfield",fieldLabel:"名称",name:"name",itemId:"name",vtype:"stringblank",maxLength:"15",maxLengthText:"不可超过15位",allowBlank:false,listeners:{specialKey:{fn:function(e,c,d){if(c.keyCode==13){b.down("#description").focus(true)}},delay:200}}},{xtype:"textarea",fieldLabel:"描述",name:"description",itemId:"description",maxLength:"140",maxLengthText:"不可超过140位",allowBlank:false}]},{xtype:"fieldset",title:"操作权限",itemId:"actions_fieldset",autoScroll:true,anchor:"100% 70%",padding:"5 10 10 40",layout:{type:"vbox",align:"stretch"},fieldDefaults:{labelWidth:100},items:[{xtype:"checkbox",boxLabel:"全选",listeners:{change:{fn:this.selectAll,scope:this}}}]}]}];return a},initComponent:function(){var a=this;Ext.apply(this,{title:this.params.ruleId?"修改权限组":"添加权限组",items:this.createView(),buttons:this.createButtons()});this.callParent(arguments);this.load();setTimeout(function(){a.down("#name").focus(true)},500)},load:function(){var a=this;OperatorRuleAction.findActions(function(b){a.actions=b.records;a.fillActions()})},fillActions:function(){var e=this;var b=this.down("#actions_fieldset");b.suspendLayout=true;for(var a=0;a<this.actions.length;a++){var d=this.actions[a];var c=b.down("checkboxgroup[fieldLabel="+d.category+"]");if(!c){c=Ext.create("Ext.form.CheckboxGroup",{fieldLabel:d.category,columns:3,vertical:true,margin:"5 20 20 0",labelStyle:"font-weight:bold",style:{borderBottom:"1px solid gray"}});b.add(c)}c.add({name:"actions",inputValue:d.id,boxLabel:d.name})}b.suspendLayout=false;b.doLayout();if(this.params.ruleId){OperatorRuleAction.findOperatorRuleById(this.params.ruleId,function(h){if(h.success){var g=h.data;var j=new Array();h.data.length;for(var f=0;f<g.actions.length;f++){j[f]=g.actions[f].id}e.down("vipform").getForm().setValues({name:g.name,actions:j,description:g.description})}else{Ext.Msg.error(h.message)}})}},selectAll:function(c,b){var d=this.query("checkbox[name=actions]");for(var a=0;a<d.length;a++){d[a].setValue(b==true)}},addRule:function(b){var d=this;var c=this.down("vipform").getForm();if(c.isValid()){var a=c.getValues();a.actions=Ext.encode(a.actions);OperatorRuleAction.addOperatorRule(Ext.apply({businessId:window.account.businessId},a),function(e){if(e.success){Ext.Msg.info("添加成功",function(){if(d.onSave){d.onSave.fn.call(d.onSave.scope)}d.destroy()})}else{Ext.Msg.error(e.message)}})}},saveRule:function(b){var d=this;var c=this.down("vipform").getForm();if(c.isValid()){var a=c.getValues();a.actions=Ext.encode(a.actions);OperatorRuleAction.updateOperatorRule(Ext.apply({id:this.params.ruleId},a),function(e){if(e.success){Ext.Msg.info("修改成功",function(){if(d.onSave){d.onSave.fn.call(d.onSave.scope)}d.destroy()})}else{Ext.Msg.error(e.message)}})}}});Ext.define("VIP.shop.ShopWindow",{extend:Ext.window.Window,alias:["widget.shopwindow"],layout:"fit",width:640,height:280,border:false,resizable:false,modal:true,closable:false,createView:function(){},createButtons:function(){var b=this;var a=[{text:"保存",icon:"images/update.png",width:90,handler:function(c){b.saveShop()}},{text:"取消",icon:"images/cancel.png",width:90,handler:function(c){b.destroy()}}];return a},createView:function(){var b=this;var a=[{xtype:"vipform",defaults:{margin:5},layout:{type:"anchor"},items:[{xtype:"fieldset",title:"基本信息",anchor:"100% 100%",defaults:{width:275,labelAlign:"right"},layout:{type:"table",columns:2},items:[{xtype:"textfield",fieldLabel:"店铺名",name:"name",vtype:"stringblank",maxLength:"15",maxLengthText:"不可超过15位",allowBlank:false,colspan:2,listeners:{specialKey:{fn:function(e,c,d){if(c.keyCode==13){b.down("#contactName").focus(true)}},delay:200}}},{xtype:"textfield",fieldLabel:"联系人",name:"contactName",allowBlank:false,vtype:"stringblank",listeners:{specialKey:{fn:function(e,c,d){if(c.keyCode==13){b.down("#telephone").focus(true)}},delay:200}}},{xtype:"textfield",fieldLabel:"联系电话",name:"telephone",allowBlank:false,regex:/^1[3|4|5|8][0-9]{9}$/,regexText:"无效的手机号码",listeners:{specialKey:{fn:function(e,c,d){if(c.keyCode==13){b.saveShop()}},delay:200}}},{xtype:"textfield",fieldLabel:"分店地址",name:"address",colspan:2,width:550,allowBlank:false},{xtype:"numberfield",fieldLabel:"经度",name:"longitude",allowBlank:false},{xtype:"numberfield",fieldLabel:"纬度",name:"latitude",allowBlank:false},{fieldLabel:"状　态",xtype:"vcombo",hidden:true,name:"state",itemId:"state",options:[{text:"正常",value:"1"},{text:"冻结",value:"0"},{text:"注销",value:"-2"}]}]}]}];return a},initComponent:function(){var a=this;Ext.apply(this,{title:this.params.shopId?"修改店铺":"添加店铺",items:this.createView(),buttons:this.createButtons()});this.callParent(arguments);if(this.params.shopId){this.down("#state").show();this.load()}},load:function(){var a=this;ShopAction.findShopById(this.params.shopId,function(b){a.down("vipform").getForm().setValues(b.data)})},saveShop:function(b){var d=this;var c=this.down("vipform").getForm();if(c.isValid()){var a=c.getValues();if(d.params.shopId){ShopAction.editShop(Ext.apply({id:d.params.shopId},a),function(e){if(e.success){Ext.Msg.info("修改成功.",function(){if(d.onSave){d.onSave.fn.call(d.onSave.scope)}d.destroy()})}else{Ext.Msg.error(e.message)}})}else{a.state="1";ShopAction.addShop(Ext.apply({businessId:window.account.businessId},a),function(e){if(e.success){Ext.Msg.info("添加成功.",function(){if(d.onSave){d.onSave.fn.call(d.onSave.scope)}d.destroy()})}else{Ext.Msg.error(e.message)}})}}}});Ext.define("VIP.widget.Link",{extend:Ext.Component,alias:["widget.link"],requires:[],height:30,padding:"6 20 6 20",baseCls:"x-link",initComponent:function(){if(this.icon){this.html='<img src="'+this.icon+'"><span>'+this.text+"</span>"}else{this.html="<span>"+this.text+"</span>"}this.callParent(arguments);this.on("render",function(){this.getEl().on("mouseover",function(){this.addCls("x-boundlist-item-over")},this);this.getEl().on("mouseout",function(){this.removeCls("x-boundlist-item-over")},this);if(this.handler){this.getEl().on("click",function(){this.handler.call(this,this)},this)}},this)}});