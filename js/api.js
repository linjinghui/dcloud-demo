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
	 * post url带参方式
	 **/
	owner.login = function(pms, callback) {
		var url = URL + '/login' + urlEncode({
			username: pms.account,
			password: pms.pwd,
			kaptcha: pms.code
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
	 * get方式
	 **/
	owner.loginout = function() {
		var url = URL + '/logout';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
//			data: {},
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
	 * POST表单提交
	 **/
	owner.formPost = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_main_produce_place/saveOrUpdate';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'post',
			timeout: TIMEOUT,
			data: {
				pplaceId: pms.pplaceId || '',
				entId: userInfo.entInfo.entId,
				placeName: pms.placeName,
				placeDescription: pms.placeDescription,
				placeLongitude: pms.placeLongitude,
				placeLatitude: pms.placeLatitude,
				placeArea: pms.placeArea,
				contactName: pms.contactName,
				contactNumber: pms.contactNumber,
				placeCategory: pms._placeCategory
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
	
	
}(mui, window.api = {}));