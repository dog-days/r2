/**
 * 空信息验证 
 * @param {string} name input id
 * @param {obj} msg = [
 *		email : "请填写！"
 * ]
 */
module.exports = function emptyProps(form,msg=[]) {
	msg = Object.assign([
		"请填写！",
		"长度过短！",
		"长度过长！",
	],msg)
	/**
	* @param {String} name input prop名 
	* @param {String} errorMessage 未通过自定义提示
	*/
	return function(name,errorMessage,length=[0,null],lengthMsg=[]){
		function validLength(rule, value, callback){
			if(value == undefined){
				callback()
				return;
			}
			if(value !== "" && value.length >= length[0]){
				if(length[0] && value.length > length[1]){
					callback(lengthMsg[1] || msg[2]);
				}else{
					callback();
				}
			}else if(value.length > 0){
				callback(lengthMsg[0] || msg[1]);
			}else{
				callback();
			}
		}
		return form.getFieldProps(name, {
	        validate: [
				{
					rules: [
						{
							required: true,
							message: errorMessage || msg[0], 
						}, 
					],
					trigger: 'onBlur',
				},
				{
					rules: [
						{ validator: validLength } 
					],
					trigger: ['onBlur']
				}
			]
	    });
	}
    

}
