/**
 * password格式验证配置 
 * @param [obj] msg = [
 *		"留空信息提示",
 * 	    "请再次输入密码",
 *		"密码不一致提示语"
 * ]
 */
module.exports = function password(form,reCheck=true,length=6,msg=[ ]){
	msg = Object.assign([
		"请填写密码！",
		"请再次输入密码！",
		"两次输入密码不一致！",
		"密码长度过短！",
		"密码格式不对，需要数字和英文字母结合！",
	],msg)
	return {
		pwd(){
			return form.getFieldProps('passwd', {
				validate: [
					{
						rules: [
							{
								required: true,
								//whitespace: true,
								message: msg[0], 
							}, 
							{ validator: this.checkPass },
						],
						trigger: ['onBlur'],
					},
				]
			});
		},
		repwd(){
			return form.getFieldProps('rePasswd', {
				validate: [
					{
						rules: [
							{
								required: true,
								//whitespace: true,
								message: msg[1],
							}, 
							{
								validator: this.checkPass2,
							}
						],
						trigger: ['onBlur'],
					},
				]
			});
		},
		checkPass(rule, value, callback) {
			let { validateFields } = form;
			var pass = new RegExp("(.*)[a-zA-Z](.*)").test(value);
			//console.debug(pass,value.length)
			if(value == ""){
				callback();
				return;
			}
			if(value.length < length ){
				callback(msg[3])
			}else if(!pass){
				callback(msg[4])
			}else{
				if (value && reCheck) {
					validateFields(['rePasswd']);
				}
				callback();
			}
		},
		//重复验证密码
		checkPass2(rule, value, callback) {
			const { getFieldValue } = form;
			if (value && value !== getFieldValue('passwd')) {
				callback(msg[2]);
			} else {
				callback();
			}
		}                                                                          
	}
}
