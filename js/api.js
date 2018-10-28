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
	 * 获取数据字典
	 **/	
	owner.getDictionary = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		if (pms.type === 1) {
			// 基地类别
			var url = URL + '/ent_main_produce_place/initPage';			
			$.ajax(url, {
				dataType: 'json',
				type: 'get',
				timeout: TIMEOUT,
				error: function (xhr, type, errorThrown) {
					wait.close();
					plus.nativeUI.toast(type);
				},
				success: function (data) {
					wait.close();
					filterCode(data);
					if (data.code !== 0) {
						plus.nativeUI.toast(data.msg);
					} else {
						callback && callback(data.ret.placeCategory);
					}
				}
			});
		} else if (pms.type === 2) {
			// 施肥方式	
			var url = URL + '/ent_batch_doc_feed_plant/initPage';
			$.ajax(url, {
				dataType: 'json',
				type: 'get',
				timeout: TIMEOUT,
				data: {
					entId: userInfo.entInfo.entId
//					profileType: pms.profileType
				},
				error: function (xhr, type, errorThrown) {
					wait.close();
					plus.nativeUI.toast(type);
				},
				success: function (data) {
					wait.close();
					filterCode(data);
					if (data.code !== 0) {
						plus.nativeUI.toast(data.msg);
					} else {
						callback && callback(data.ret);
					}
				}
			});
		} else if (pms.type === 3) {
			// 农药名称、用药方式	
			var url = URL + '/ent_batch_doc_drug/initPage';
			$.ajax(url, {
				dataType: 'json',
				type: 'get',
				timeout: TIMEOUT,
				data: {
					entId: userInfo.entInfo.entId,
					profileType: pms.profileType
				},
				error: function (xhr, type, errorThrown) {
					wait.close();
					plus.nativeUI.toast(type);
				},
				success: function (data) {
					wait.close();
					filterCode(data);
					if (data.code !== 0) {
						plus.nativeUI.toast(data.msg);
					} else {
						callback && callback(data.ret);
					}
				}
			});
		} else if (pms.type === 4) {
			// 收获单位
			var url = URL + '/ent_batch_doc_harvest/initPage';
			$.ajax(url, {
				dataType: 'json',
				type: 'get',
				timeout: TIMEOUT,
				data: {
					docId: pms.docId
				},
				error: function (xhr, type, errorThrown) {
					wait.close();
					plus.nativeUI.toast(type);
				},
				success: function (data) {
					wait.close();
					filterCode(data);
					if (data.code !== 0) {
						plus.nativeUI.toast(data.msg);
					} else {
						callback && callback(data.ret);
					}
				}
			});
		} else if (pms.type === 5) {
			// 原料来源
			var url = URL + '/ent_batch_doc_make/initPage';
			$.ajax(url, {
				dataType: 'json',
				type: 'get',
				timeout: TIMEOUT,
				data: {
					docId: pms.docId
				},
				error: function (xhr, type, errorThrown) {
					wait.close();
					plus.nativeUI.toast(type);
				},
				success: function (data) {
					wait.close();
					filterCode(data);
					if (data.code !== 0) {
						plus.nativeUI.toast(data.msg);
					} else {
						callback && callback(data.ret);
					}
				}
			});
		} else if (pms.type === 6) {
			// 
			var url = URL + '/ent_batch_doc_check/initPage';
			$.ajax(url, {
				dataType: 'json',
				type: 'get',
				timeout: TIMEOUT,
				data: {
					entId: userInfo.entInfo.entId,
					docId: pms.docId
				},
				error: function (xhr, type, errorThrown) {
					wait.close();
					plus.nativeUI.toast(type);
				},
				success: function (data) {
					wait.close();
					filterCode(data);
					if (data.code !== 0) {
						plus.nativeUI.toast(data.msg);
					} else {
						callback && callback(data.ret);
					}
				}
			});
		} else if (pms.type === 7) {
			var url = URL + '/ent_batch_trace_code_info/initPage';
			$.ajax(url, {
				dataType: 'json',
				type: 'get',
				timeout: TIMEOUT,
				data: {
//					entId: userInfo.entInfo.entId,
					docId: pms.docId
				},
				error: function (xhr, type, errorThrown) {
					wait.close();
					plus.nativeUI.toast(type);
				},
				success: function (data) {
					wait.close();
					filterCode(data);
					if (data.code !== 0) {
						plus.nativeUI.toast(data.msg);
					} else {
						callback && callback(data.ret);
					}
				}
			});
		} else if (pms.type === 8) {
			// 饲养记录相关数据字典
			var url = URL + '/ent_batch_doc_feed_animal/initPage';
			$.ajax(url, {
				dataType: 'json',
				type: 'get',
				timeout: TIMEOUT,
				data: {
					entId: userInfo.entInfo.entId
				},
				error: function (xhr, type, errorThrown) {
					wait.close();
					plus.nativeUI.toast(type);
				},
				success: function (data) {
					wait.close();
					filterCode(data);
					if (data.code !== 0) {
						plus.nativeUI.toast(data.msg);
					} else {
						callback && callback(data.ret);
					}
				}
			});
		} else if (pms.type === 9) {
			// 拌料记录相关数据字典
			var url = URL + '/ent_batch_doc_feed_mushroom/initPage';
			$.ajax(url, {
				dataType: 'json',
				type: 'get',
				timeout: TIMEOUT,
				data: {
					entId: userInfo.entInfo.entId
				},
				error: function (xhr, type, errorThrown) {
					wait.close();
					plus.nativeUI.toast(type);
				},
				success: function (data) {
					wait.close();
					filterCode(data);
					if (data.code !== 0) {
						plus.nativeUI.toast(data.msg);
					} else {
						callback && callback(data.ret);
					}
				}
			});
		} else if (pms.type === 10) {
			// 农资品相关数据字典
			var url = URL + '/ent_material_info/initPage';
			$.ajax(url, {
				dataType: 'json',
				type: 'get',
				timeout: TIMEOUT,
				data: {
					entId: userInfo.entInfo.entId
				},
				error: function (xhr, type, errorThrown) {
					wait.close();
					plus.nativeUI.toast(type);
				},
				success: function (data) {
					wait.close();
					filterCode(data);
					if (data.code !== 0) {
						plus.nativeUI.toast(data.msg);
					} else {
						callback && callback(data.ret);
					}
				}
			});
		} else if (pms.type === 11) {
			// 生产档案相关数据字典
			var url = URL + '/ent_batch_doc/initPage';
			$.ajax(url, {
				dataType: 'json',
				type: 'get',
				timeout: TIMEOUT,
				data: {
					entId: userInfo.entInfo.entId,
					profileType: pms.profileType || 1
				},
				error: function (xhr, type, errorThrown) {
					wait.close();
					plus.nativeUI.toast(type);
				},
				success: function (data) {
					wait.close();
					filterCode(data);
					if (data.code !== 0) {
						plus.nativeUI.toast(data.msg);
					} else {
						callback && callback(data.ret);
					}
				}
			});
		}
	}
	
	/**
	 * 获取附件
	 **/
	owner.getAttachUrls = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/base_attachment/getByAttachIds';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				attachIds: pms.attachIds
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
	};
	
	/**
	 * 用户登录
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
	 * 删除 生产基地信息
	 **/
	owner.getDelScjdData = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_main_produce_place/delete';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				pplaceId: pms.pplaceId
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
	 * 新增|编辑生产基地信息
	 **/
	owner.saveUpdateScjdInfo = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_main_produce_place/saveOrUpdate';
//		var url = URL + '/ent_main_produce_place/saveOrUpdate' + urlEncode({
//			pplaceId: pms.pplaceId,
//			entId: userInfo.entInfo.entId,
//			placeName: pms.placeName,
//			placeDescription: pms.placeDescription,
//			placeLongitude: pms.placeLongitude,
//			placeLatitude: pms.placeLatitude,
//			placeArea: pms.placeArea,
//			contactName: pms.contactName,
//			contactNumber: pms.contactNumber,
//			placeCategory: pms.placeCategory
//		});
//		console.log(JSON.stringify({
//			placeId: pms.placeId,
//			entId: userInfo.entInfo.entId,
//			placeName: pms.placeName,
//			placeDescription: pms.placeDescription,
//			placeLongitude: pms.placeLongitude,
//			placeLatitude: pms.placeLatitude,
//			placeArea: pms.placeArea,
//			contactName: pms.contactName,
//			contactNumber: pms.contactNumber,
//			placeCategory: pms.placeCategory
//		}));
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
//			headers: {'Content-Type':'application/json'},
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
	 * 获取 追溯凭证列表数据
	 **/
	owner.getZspzDataList = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_trace_code_info/fuzzyQuery';
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
	owner.getSaveZtxxInfo = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_main_sub_info/saveOrUpdate' + urlEncode({
			entId: userInfo.entInfo.entId,
			entDescription: pms.entDescription,
			entWebsite: pms.entWebsite,
			attachIds: pms.attachIds
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
				filterCode(data);
				callback && callback(data);
				if (data.code !== 0) {
					plus.nativeUI.toast(data.msg);
				}
			}
		});
	}
	
	/**
	 * 获取 企业荣誉信息
	 **/
	owner.getQyryDataInfo = function(callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_main_honor/getList';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				entId: userInfo.entInfo.entId,
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
	 * 获取生产档案列表
	 **/
	owner.getGetScdaDataList = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc/getList' + urlEncode({
			entId: userInfo.entInfo.entId,
			// 档案分类:1种植档案,2养殖档案',3食用菌
			profileType: pms.type || 1,
			status: 1,
			page: 1,
			size: 1000
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
				callback && callback({});
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
	 * 新增|编辑生产档案
	 **/
	owner.saveUpdateScda = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc/saveOrUpdate';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'post',
			timeout: TIMEOUT,
			data: {
				docId: pms.docId || '',
				entId: userInfo.entInfo.entId || '',
				profileType: pms._profileType || '',
				productName: pms.productName || '',
				industryType: pms._industryType || '',
				pplaceId: pms.pplaceId || '',
				scaleNum: pms.scaleNum || '',
				scaleUnit: pms.scaleUnit || '',
				beginDate: pms.beginDate || '',
				certId: pms._certId || '',
				remark: pms.remark || ''
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
	 * 获取 施肥记录
	 **/
	owner.getSfDataList = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc_feed_plant/getAllInfo';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				docId: pms.docId
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
	 * 新增|编辑施肥记录
	 **/
	owner.getSaveUpdateSfInfo = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc_feed_plant/saveOrUpdate';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'post',
			timeout: TIMEOUT,
			data: {
				docId: pms.docId || '',
				entId: userInfo.entInfo.entId || '',
				feedId: pms.feedId || '',
				materialInfo: pms.materialInfo,
				materialId: pms.materialId,
				feedNum: pms.feedNum,
				feedType: pms._feedType,
				feedUserName: pms.feedUserName,
				feedStartDate: pms.feedStartDate || '',
				feedEndDate: pms.feedEndDate || '',
				remark: pms.remark || ''
			},
//			headers: {'Content-Type':'application/json'},
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
	 * 获取 农药记录
	 **/
	owner.getNyDataList = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc_drug/getAllInfo';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				docId: pms.docId
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
	 * 新增|编辑农药记录
	 **/
	owner.getSaveUpdateNyInfo = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc_drug/saveOrUpdate';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'post',
			timeout: TIMEOUT,
			data: {
				docId: pms.docId || '',
				entId: userInfo.entInfo.entId || '',
				drugId: pms.drugId || '',
				mediUnit: pms.mediUnit || '',
				mediNum: pms.mediNum || '',
				materialId: pms.materialId || '',
				drugConcentration: pms.drugConcentration || '',
				useType: pms._useType,
				userName: pms.userName || '',
				useDate: pms.useDate || '',
				remark: pms.remark || ''
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
	 * 获取 农事活动记录
	 **/
	owner.getNshdDataList = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc_work/getAllInfo';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				docId: pms.docId
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
	 * 新增|编辑农事活动
	 **/
	owner.getSaveUpdateNshdInfo = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc_work/saveOrUpdate';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'post',
			timeout: TIMEOUT,
			data: {
				docId: pms.docId || '',
				entId: userInfo.entInfo.entId || '',
				workId: pms.workId || '',
				workTitle: pms.workTitle || '',
				workDescription: pms.workDescription || '',
				userName: pms.userName || '',
				workDate: pms.workDate || '',
				workDateEnd: pms.workDateEnd || ''
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
	 * 获取 收获记录
	 **/
	owner.getShDataList = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc_harvest/getAllInfo';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				docId: pms.docId
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
	 * 新增|编辑收获记录
	 **/
	owner.getSaveUpdateShInfo = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc_harvest/saveOrUpdate';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'post',
			timeout: TIMEOUT,
			data: {
				docId: pms.docId || '',
				entId: userInfo.entInfo.entId || '',
				harvId: pms.harvId || '',
				harvUnit: pms.harvUnit || '',
				harvType: pms._harvType || '',
				harvNum: pms.harvNum || '',
				userName: pms.userName || '',
				harvDate: pms.harvDate || '',
				remark: pms.remark || ''
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
	 * 获取 加工记录
	 **/
	owner.getJgDataList = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc_make/getAllInfo';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				docId: pms.docId
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
	 * 新增|编辑加工记录
	 **/
	owner.saveUpdateJgInfo = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc_make/saveOrUpdate';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'post',
			timeout: TIMEOUT,
			data: {
				docId: pms.docId || '',
				entId: userInfo.entInfo.entId || '',
				makeId: pms.makeId || '',
				makeTitle: pms.makeTitle || '',
				content: pms.content || '',
				unit: pms.unit || '',
				produceNum: pms.produceNum || '',
				userName: pms.userName || '',
				harvDate: pms.harvDate || '',
				hasMakeMaterial: pms.hasMakeMaterial || 0,
				mmId: pms.mmId || '',
				materialFrom: pms.materialFrom || '',
				material: pms.material || '',
				brand: pms.brand || '',
				scale: pms.scale || '',
				useNum: pms.useNum || '',
				unit: pms.unit || '',
				producer: pms.producer || '',
				batchNo: pms.batchNo || '',
				productDate: pms.productDate || '',
				provider: pms.provider || '',
				buyDate: pms.buyDate || '',
				buyNo: pms.buyNo || '',
				remark: pms.remark || ''
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
	 * 获取 质保方式记录
	 **/
	owner.getZbfsDataList = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc_check/getAllInfo';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				docId: pms.docId
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
	 * 新增|编辑质保方式
	 **/
	owner.saveUpdateZbfsInfo = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc_check/saveOrUpdate';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'post',
			timeout: TIMEOUT,
			data: {
				docId: pms.docId || '',
				entId: userInfo.entInfo.entId || '',
				checkId: pms.checkId || '',
				qualityType: pms._qualityType || '',
				checkType: pms._checkType || '',
				checkResult: pms.checkResult || '',
				inspectionNo: pms.inspectionNo || '',
				checkDate: pms.checkDate || '',
				inspectionName: pms.inspectionName || '',
				attachIds: pms.attachIds || 0,
				certId: pms._certId || '',
				promiseDate: pms.promiseDate || ''
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
	 * 获取 准出赋码登记记录
	 **/
	owner.getZcfmDataList = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_trace_code_info/getListByDocId';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				docId: pms.docId
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
	 * 新增|编辑溯源赋码方式
	 **/
	owner.saveUpdateSyfmInfo = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_trace_code_info/createTraceCode';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'post',
			timeout: TIMEOUT,
			data: {
				docId: pms.docId || '',
				entId: userInfo.entInfo.entId || '',
//				checkId: pms.checkId || '',
				harvestDate: pms.harvestDate || '',
				harvId: pms.harvId || '',
				measurementUnit: pms.measurementUnit || '',
				productType: pms._productType || '',
				exportNum: pms.exportNum || '',
				remark: pms.remark || '',
				tagType: pms._tagType || '',
				checkIds: pms._checkType || '',
				saleId: pms.saleId || ''
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
	 * 新增 购货方
	 **/
	owner.saveUpdateGhfInfo = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_material_provider/saveOrUpdate';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'post',
			timeout: TIMEOUT,
			data: {
				category: '3',
				entId: userInfo.entInfo.entId || '',
				providerId: '',
				provider: pms.provider || '',
				unicode: pms.unicode || '',
				address: pms.address || '',
				contactName: pms.contactName || '',
				tel: pms.tel || '',
				mobile: pms.mobile || '',
				email: pms.email || ''
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
	 * 获取 饲养记录
	 **/
	owner.getSyDataList = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc_feed_animal/getAllInfo';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				docId: pms.docId
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
	 * 新增|修改 饲养记录
	 **/
	owner.saveUpdateSyInfo = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc_feed_animal/saveOrUpdate';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'post',
			timeout: TIMEOUT,
			data: {
				docId: pms.docId || '',
				entId: userInfo.entInfo.entId || '',
				feedId: pms.feedId || '',
				materialInfo: pms.materialInfo || '',
				materialId: pms.materialId || '',
				producer: pms.producer || '',
				batchNo: pms.batchNo || '',
				provider: pms.provider || '',
				buyNo: pms.buyNo || '',
				productDate: pms.productDate || '',
				feedStartDate: pms.feedStartDate || '',
				feedEndDate: pms.feedEndDate || '',
				remark: pms.remark || ''
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
	 * 获取 拌料记录
	 **/
	owner.getBlDataList = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc_feed_mushroom/getAllInfo';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				docId: pms.docId
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
	 * 新增|修改 拌料记录
	 **/
	owner.saveUpdateBlInfo = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_batch_doc_feed_mushroom/saveOrUpdate';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'post',
			timeout: TIMEOUT,
			data: {
				docId: pms.docId || '',
				entId: userInfo.entInfo.entId || '',
				feedId: pms.feedId || '',
				materialInfo: pms.materialInfo || '',
				materialNpk: pms.materialNpk || '',
				feedUserName: pms.feedUserName || '',
				feedStartDate: pms.feedStartDate || '',
				feedEndDate: pms.feedEndDate || '',
				remark: pms.remark || ''
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
	 * 获取 农资品管理列表数据
	 **/
	owner.getNzpglDataList = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_material_info/fuzzyQuery';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		if (pms.type === 5) {
			pms.type = 9;
		}
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data: {
				entId: userInfo.entInfo.entId,
				// 农资分类id 1 农肥 2 农药 3 饲料 4 兽药 9 其他农资
				mcatId: pms.type || 1,
			},
			error: function (xhr, type, errorThrown) {
				wait.close();
				plus.nativeUI.toast(type);
				callback && callback({});
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
	 * 新增 农资品
	 **/
	owner.saveUpdateNzpInfo = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_material_info/saveOrUpdate';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'post',
			timeout: TIMEOUT,
			data: {
				docId: pms.docId || '',
				entId: userInfo.entInfo.entId || '',
				materialId: pms.materialId || '',
				mcatId: pms._mcatId || '',
				material: pms.material || '',
				batchNo: pms.batchNo || '',
				scale: pms.scale || '',
				providerId: pms.providerId || '',
				buyNo: pms.buyNo || '',
				inNum: pms.inNum || '',
				unit: pms._unit || '',
				producer: pms.producer || '',
				drugHoliday: pms.drugHoliday || '',
				productDate: pms.productDate || '',
				expDate: pms.expDate || ''
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
	 * 新增 购买商店
	 **/
	owner.saveUpdateGmsd = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/ent_material_provider/saveOrUpdate';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'post',
			timeout: TIMEOUT,
			data: {
				category: '1',
				entId: userInfo.entInfo.entId || '',
				providerId: '',
				provider: pms.provider || '',
				unicode: pms.unicode || '',
				address: pms.address || '',
				contactName: pms.contactName || '',
				tel: pms.tel || '',
				mobile: pms.mobile || '',
				email: pms.email || ''
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
	 * 获取 栏目分类
	 **/
	owner.getLmTypeDataList = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/news_article/getColumnList';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
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
	 * 获取 指定栏目列表数据
	 **/
	owner.getLmDataList = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/news_article/getInfoList';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				title: '',
				columnId: pms.columnId,
				startTime: pms.startTime || '',
				endTime: pms.endTime || '',
				page: 1,
				size: 1000
			},
			error: function (xhr, type, errorThrown) {
				wait.close();
				plus.nativeUI.toast(type);
				callback && callback({});
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
	 * 获取 指定栏目详情
	 **/
	owner.getLmDataInfo = function(pms, callback) {
		var userInfo = owner.getUserInfo();
		var url = URL + '/news_article/getArticleInfo';
		var wait = plus.nativeUI.showWaiting(WAIT_TEXT);
		$.ajax(url, {
			dataType: 'json',
			type: 'get',
			timeout: TIMEOUT,
			data:{
				recId: pms.recId
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