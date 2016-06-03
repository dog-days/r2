/**
 * email格式验证配置 
 * @param [obj] msg = {
 *		required : "留空信息提示",
 *		email : "email信息格式不正确处理"
 * }
 */
module.exports = function emailProps(form,msg={ }) {
	msg = Object.assign({
		required : "请填写邮箱地址！",
		email:"请填写正确的邮箱地址！",
	},msg)
    return form.getFieldProps('email', {
        validate: [
			{
				rules: [
					{
						required: true,
						message: msg.required, 
					}, 
				],
				trigger: 'onBlur',
			},
			{
				rules: [
					{
						type: 'email',
						message: msg.email, 
					}, 
				],
				trigger: ['onBlur', 'onChange'], 
			},
		]
    });

}
