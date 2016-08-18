'use strict';

module.exports = async function(ctx, next){
	ctx.body = {
		data: {
			id: 1,
		},
		message: "登陆成功！",
		request_id: "2279fa57f4d644c1b333f5ff5ff7a2b7",
	}
}
