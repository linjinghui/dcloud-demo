/**
 * 
 **/
(function($, owner) {
	var URL = 'http://wifino1.yourslink.com:10205';
	var TIMEOUT = '30000';
	var WAIT_TEXT = '加载中...';
	var ERROR = '服务异常，请稍后再试！';
	var KEY_USER = '_$USER_DATA_INFO_';
	var urlEncode = function (obj) {
		if (obj) {
			obj = JSON.stringify(obj);
			obj = '?' + obj.replace(/:/g, '=').replace(/,/g, '&').replace(/"/g, '').replace(/({|})/g, '');	
		}
		return obj;
	}
	var filterCode = function (data) {
		console.log(JSON.stringify(data));
		if (data.code === 3) {
			// 未登录
			owner.loginout();
			plus.webview.getLaunchWebview().show('pop-in');
		}
	}
	/**
	 * 获取图形验证码
	 **/
	owner.vcode = function() {
		return URL + '/kaptcha?t=' + new Date().getTime();
	}
	
	/**
	 * 用户登录
	 **/
	owner.login = function(params, callback) {
		var url = URL + '/login' + urlEncode({
			username: params.account,
			password: params.pwd,
			kaptcha: params.code
		});
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'post',
			timeout: TIMEOUT,
			headers: {'Content-Type':'application/json'},
			error: function (xhr, type, errorThrown) {
				wait.close();
				plus.nativeUI.toast(type);
			},
			success: function (data) {
				wait.close();
				if (data.code !== 0) {
					plus.nativeUI.toast(data.msg);
				} else {
					// 缓存用户信息
					owner.saveUser(data.ret);
					callback && callback(data);
				}
			}
		});
	};
	
	/**
	 * 保存登录用户信息
	 **/
	owner.saveUser = function(data) {
		app.lsgSaveData(KEY_USER, data);
	};
	
	/**
	 * 获取登录用户信息
	 **/
	owner.getUserInfo = function() {
		return app.lsgGetData(KEY_USER);
	};
	
	/**
	 * 退出登录
	 **/
	owner.loginout = function() {
		var url = URL + '/logout';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			headers: {'Content-Type':'application/json'},
			error: function (xhr, type, errorThrown) {
				wait.close();
				plus.nativeUI.toast(type);
			},
			success: function (data) {
				wait.close();
			}
		});		
		// 跳转到登录页
		plus.webview.getLaunchWebview().show('pop-in');
		// 清除缓存
		app.lsgDeleteData();
	};
	
	/**
	 * 获取 主体基本信息
	 **/
	owner.getEntInfo = function(callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_sys_entuser/getEntUser';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				username: userInfo.username
			},
			error: function (xhr, type, errorThrown) {
				wait.close();
				plus.nativeUI.toast(type);
			},
			success: function (data) {
				wait.close();
				filterCode(data);
				callback && callback(data);
				if (data.code !== 0) {
					plus.nativeUI.toast(data.msg);
				} else {
					// 保存主体信息
					userInfo.entInfo = data.ret;
					owner.saveUser(userInfo);
				}
			}
		});
	}
	
	/**
	 * 获取 证照信息
	 **/
	owner.getZzInfo = function(callback) {
		var userInfo = owner.getUserInfo();
		console.log(JSON.stringify(userInfo));
		var url = URL + '/ent_main_license/getAllInfo';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				entId: userInfo.entInfo.entId
			},
			error: function (xhr, type, errorThrown) {
				wait.close();
				plus.nativeUI.toast(type);
			},
			success: function (data) {
				wait.close();
				filterCode(data);
				callback && callback(data);
				if (data.code !== 0) {
					plus.nativeUI.toast(data.msg);
				}
			}
		});
	}
	
	/**
	 * 获取 认证信息列表
	 **/
	owner.getRzDataList = function(callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_main_certification/getAllInfo';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				entId: userInfo.entInfo.entId
			},
			error: function (xhr, type, errorThrown) {
				wait.close();
				plus.nativeUI.toast(type);
			},
			success: function (data) {
				wait.close();
				filterCode(data);
				callback && callback(data);
				if (data.code !== 0) {
					plus.nativeUI.toast(data.msg);
				}
			}
		});
	}
	
	/**
	 * 获取 生产基地信息列表
	 **/
	owner.getScjdDataList = function(callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_main_produce_place/getAllInfo';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				entId: userInfo.entInfo.entId
			},
			error: function (xhr, type, errorThrown) {
				wait.close();
				plus.nativeUI.toast(type);
			},
			success: function (data) {
				wait.close();
				filterCode(data);
				callback && callback(data);
				if (data.code !== 0) {
					plus.nativeUI.toast(data.msg);
				}
			}
		});
	}
	
	/**
	 * 获取 电商信息列表
	 **/
	owner.getDsDataList = function(callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_main_recommend/getAllInfo';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				entId: userInfo.entInfo.entId
			},
			error: function (xhr, type, errorThrown) {
				wait.close();
				plus.nativeUI.toast(type);
			},
			success: function (data) {
				wait.close();
				filterCode(data);
				callback && callback(data);
				if (data.code !== 0) {
					plus.nativeUI.toast(data.msg);
				}
			}
		});
	}
	
	/**
	 * 获取 主体形象信息
	 **/
	owner.getZtxxInfo = function(callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_main_sub_info/getInfo';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				entId: userInfo.entInfo.entId
			},
			error: function (xhr, type, errorThrown) {
				wait.close();
				plus.nativeUI.toast(type);
			},
			success: function (data) {
				wait.close();
				filterCode(data);
				callback && callback(data);
				if (data.code !== 0) {
					plus.nativeUI.toast(data.msg);
				}
			}
		});
	}
	
	/**
	 * 更新 主体形象信息
	 **/
	owner.getSaveZtxxInfo = function(params, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_main_sub_info/saveOrUpdate';
//		var url = URL + '/ent_main_sub_info/saveOrUpdate' + urlEncode({
//			entId: userInfo.entInfo.entId,
//			entDescription: params.entDescription,
//			entWebsite: params.entWebsite
//		});
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'post',
			timeout: TIMEOUT,
//			headers: {'Content-Type':'application/json'},
			data: {
				entId: userInfo.entInfo.entId,
				entDescription: params.entDescription,
				entWebsite: params.entWebsite
			},
			error: function (xhr, type, errorThrown) {
				wait.close();
				plus.nativeUI.toast(type);
			},
			success: function (data) {
				console.log(JSON.stringify(data));
				wait.close();
				callback && callback(data);
				if (data.code !== 0) {
					plus.nativeUI.toast(data.msg);
				}
			}
		});
	}
}(mui, window.api = {}));