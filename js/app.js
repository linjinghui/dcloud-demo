(function($, owner) {
	// 公用参数配置
	owner.option = {
		// 页面初始化事件名称
		pageInitEventName: 'ready',
		// 页面入场动画
		pageInAnimt: 'pop-in',
		// 页面出场动画
		pageOutAnimt: 'pop-out'
	};
	//  路由页面
	owner.pages = {
		'main': './main.html',
		'place': '/components/place.html',
		'select': '/components/select.html',
		// 子页面数组
		'subpage': ['./pages/sub-1.html', './pages/sub-2.html', './pages/sub-3.html', './pages/sub-4.html', './pages/sub-5.html']
	};
	// 二次确认退出
	var backButtonPress = 0;
	owner.confirmQuitApp = function () {
		$.back = function(event) {
			backButtonPress++;
			if(backButtonPress > 1) {
				plus.runtime.quit();
			} else {
				plus.nativeUI.toast('再按一次退出应用');
			}
			setTimeout(function() {
				backButtonPress = 0;
			}, 1000);
			return false;
		};
	}	
	/**
	 * 预加载页面
	 * @param {String} id - 页面ID
	 * @param {Function} callback 页面加载完成后回调
	 * @return {Object} 返回页面对象
	 */
	owner.preload = function (id, callback) {
		var url = owner.pages[id];
//		var page = plus.webview.getWebviewById(id);
//		if (!page) {
//			page = mui.preload({ 'id': id, 'url': url });
//		} else {
//			callback && callback();
//		}
		page = mui.preload({ 'id': id, 'url': url });
		page.addEventListener('loaded', function () {
			callback && callback();
		});
		return page;
	}
	/**
	 * 打开预加载页面，并向页面发送一个自定义事件
	 * @param {String} id - 页面ID
	 * @param {Object} params - 传递给页面的参数对象
	 */
	owner.openPreload = function (id, params) {
		setTimeout(function () {
			var page = plus.webview.getWebviewById(id);
			page.show(owner.option.pageInAnimt);
			$.fire(page, owner.option.pageInitEventName, params || '');
		}, 50);
	}
	/**
	 * 预加载子页面
	 */
	owner.preloadSubpage = function () {
		var subpage_style = { top: 0, bottom: 51 },
		subpages = owner.pages.subpage,
		self = plus.webview.currentWebview(),
		temp = {};
			
		//兼容安卓上添加titleNView 和 设置沉浸式模式会遮盖子webview内容
		if(mui.os.android) {
			if(plus.navigator.isImmersedStatusbar()) {
				subpage_style.top += plus.navigator.getStatusbarHeight();
			}
			if(self.getTitleNView()) {
				subpage_style.top += 40;
			}			
		}		
		for(var i = 0, len = subpages.length; i < len; i++) {
			if(!plus.webview.getWebviewById(subpages[i])) {
				var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
				//隐藏子页面
				sub.hide();
				// append到当前父webview
				self.append(sub);
			}
		}
	},
	/**
	 * 切换子页面 , 并进行初始化事件通知
	 */
	owner.changeSubpage = function(targetPage, activePage, aniShow) {
		if (targetPage === activePage) {
			return;
		}
		//若为iOS平台或非首次显示，则直接显示
		if(mui.os.ios || aniShow[targetPage]) {
			plus.webview.show(targetPage);
		} else {
			//否则，使用fade-in动画
			plus.webview.show(targetPage, 'fade-in', 300);
		}
		$.fire(targetPage, owner.option.pageInitEventName);
		//隐藏当前 除了第一个父窗口
		if(activePage !== plus.webview.getLaunchWebview()) {
			plus.webview.hide(activePage);
		}
	}
	/**
	 * 关闭页面 - 默认关闭当前页面
	 * @param {String} id - 页面ID
	 */
	owner.closePage = function(id) {
		var page = plus.webview.getWebviewById(id) || plus.webview.currentWebview();
		page.hide(owner.option.pageOutAnimt);
	}
	
	/**
    * 保存数据到localStorage
    * @param {string} key 键
    * @param {object} data 值
    */
    owner.lsgSaveData = function (key, data) {
      if (!key || !data) {
        return;
      }
      data = JSON.stringify(data);
      localStorage.setItem(key, data);
    }
    
    /**
    * 从 localStorage 获取数据
    * @param {string} key 键
    */
    owner.lsgGetData = function (key) {
      if (!key) {
        return;
      }
      var data = localStorage.getItem(key);
      return JSON.parse(data);
    }
    /**
    * 从 localStorage 获取数据后删除记录
    * @param {string} key 键
    */
    owner.lsgGetDataDel = function (key, time) {
      if (!key) {
        return;
      }
      if (!time) {
        time = 0;
      }
      var data = lsgGetData(key);
    
      setTimeout(function () {
        lsgDeleteData(key);
      }, time);
      return data;
    }
    /**
    * 删除 localStorage 中的数据 key 为空则清空 localStorage
    * @param {string} key 键
    */
    owner.lsgDeleteData = function (key) {
      if (!key) {
        localStorage.clear();
      } else {
        localStorage.removeItem(key);
      }
    }
    owner.dataFormat = function (date, fmt) {
	  if (!date || (date + '' === 'Invalid Date') || !fmt) {
	    return "";
	  }
	  var o = {
	    "M+": date.getMonth() + 1, //月份
	    "d+": date.getDate(), //日
	    "h+": date.getHours(), //小时
	    "m+": date.getMinutes(), //分
	    "s+": date.getSeconds(), //秒
	    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
	    "S": date.getMilliseconds() //毫秒
	  };
	
	  if (/(y+)/.test(fmt)) {
	    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	  }
	
	  for (var k in o) {
	    if (new RegExp("(" + k + ")").test(fmt)) {
	      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    }
	  }
	  return fmt;
	}
    owner.captureImage = function (callback) {
        var cmr = plus.camera.getCamera();
        var res = cmr.supportedImageResolutions[0];
        var fmt = cmr.supportedImageFormats[0];
        cmr.captureImage(function(e) {
            plus.io.resolveLocalFileSystemURL(e, function (entry) {
                var src = entry.toLocalURL();
                callback && callback(src);
            }, function(e) {
                plus.nativeUI.toast('拍照操作失败！');
            });
        }, function( error ) {
            plus.nativeUI.toast(error.message);
        }, {
            resolution: res,
            format: fmt
        });
    }
}(mui, window.app={}));