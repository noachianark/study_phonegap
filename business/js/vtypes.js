// Add the additional 'advanced' VTypes

Ext.apply(Ext.form.field.VTypes, {
	daterange : function(val, field) {
		var date = field.getValue();

		if (!date) {
			return false;
		}
		if (field.startDateField) {
			var container = field.up();
			if(container && container.down('#' + field.startDateField)){
				var startDateField = field.up().down('#' + field.startDateField);
				var startDate = startDateField.getValue();
				if (startDate!=null && startDate > date) {
					return false;
				} else {
					startDateField.clearInvalid();
				}
			}
			
		} else if (field.endDateField) {
			var container = field.up();
			if(container && container.down('#' + field.endDateField)){
				var endDateField = field.up().down('#' + field.endDateField);
				var endDate = endDateField.getValue();
				if (endDate!=null && endDate < date) {
					return false;
				} else {
					endDateField.clearInvalid();
				}
			}
		}

		return true;
	},
	daterangeText : '搜索时间区间不符合规范.',
	
	stringblank :function(val,field){
		var date = field.getValue().trim();
		if(date==""){
			field.markInvalid("标题不允许为纯空格");
			return false;
		}
		return true;
	},
	stringblankText : '标题不允许为纯空格',
	
	numberrange : function(val, field){
		var date = field.getValue();

		if (date==null) {
			return false;
		}
		if (field.minNumber) {
			var container = field.up();
			if(container && container.down('#' + field.minNumber)){
				var minNumber = field.up().down('#' + field.minNumber);
				var startDate = minNumber.getValue();
				if (startDate!=null && startDate > date || startDate<0 || date<0 ) {
					return false;
				} else {
					minNumber.clearInvalid();
				}
			}
			
		} else if (field.maxNumber) {
			var container = field.up();
			if(container && container.down('#' + field.maxNumber)){
				var maxNumber = field.up().down('#' + field.maxNumber);
				var endDate = maxNumber.getValue();
				if (endDate!=null && endDate < date || endDate<0 ||date<0 ) {
					return false;
				} else {
					maxNumber.clearInvalid();
				}
			}
		}

		return true;
	},
	numberrangeText : '最大值必须大于最小值且不能为负数',
	
	password : function(val, field) {
		if (field.initialPassField) {
			var pwd = field.up('form').down('#' + field.initialPassField);
			if(val == pwd.getValue()){
				if(val.length<20){
					pwd.clearInvalid();
					return true;
				}else{
					return false;
				}
				
			} else {
				return false;
			}			
		}
		return true;
	},

	passwordText : '两次密码需小于20位且输入一致'
});