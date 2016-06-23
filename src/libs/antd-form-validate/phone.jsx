module.exports = function phone(form,msg=[ ]){
	msg = Object.assign([
		"请填写手机号码！",
		"请输入正确的手机号码！",
	],msg)
	return {
		phoneCheck(){
			return form.getFieldProps('phone', {
				validate: [
					{
						rules: [
							{ validator: this.phoneFormate } 
						],
						trigger: ['onBlur','onChange']
					}
				]
			})
		},
		phoneFormate(rule, value, callback){
			var reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i;
			if(value !== ""){
				if(reg.test(value)){
					callback();
				}else{
					callback(new Error(msg[1]));
				}
			}else{
				callback(new Error(msg[0]));
			}
		}
	}
}
