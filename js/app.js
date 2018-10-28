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
		
		'ztxxgl': '/pages/ztxx/ztxxgl/index.html',
		'zzxx': '/pages/ztxx/zzxx/index.html',
		'rzxx': '/pages/ztxx/rzxx/index.html',
		'rzxxDetail': '/pages/ztxx/rzxx/detail.html',
		'scjd': '/pages/ztxx/scjd/index.html',
		'scjdDetail': '/pages/ztxx/scjd/detail.html',
		'dslj': '/pages/ztxx/dslj/index.html',
		'dsljDetail': '/pages/ztxx/dslj/detail.html',
		'ztxx': '/pages/ztxx/ztxx/index.html',
		'qyry': '/pages/ztxx/qyry/index.html',
		'zspz': '/pages/ztxx/zspz/index.html',
		
		'tsxxDetail': '/pages/tsxx/detail.html',
		
		'scdanew': '/pages/scda/new.html',
		'sfjl': '/pages/scda/sf/index.html',
		'sfnew': '/pages/scda/sf/new.html',
		'nyjl': '/pages/scda/ny/index.html',
		'nynew': '/pages/scda/ny/new.html',
		'nshd': '/pages/scda/nshd/index.html',
		'nshdnew': '/pages/scda/nshd/new.html',
		'sh': '/pages/scda/sh/index.html',
		'shnew': '/pages/scda/sh/new.html',
		'cjg': '/pages/scda/cjg/index.html',
		'cjgnew': '/pages/scda/cjg/new.html',
		'zbfs': '/pages/scda/zbfs/index.html',
		'zbfsnew': '/pages/scda/zbfs/new.html',
		'fm': '/pages/scda/fm/index.html',
		'fmnew': '/pages/scda/fm/new.html',
		'ghf': '/pages/scda/ghf/index.html',
		'ghfnew': '/pages/scda/ghf/new.html',
		'sy': '/pages/scda/sy/index.html',
		'synew': '/pages/scda/sy/new.html',
		'sl': '/pages/scda/sl/index.html',
		'shouyao': '/pages/scda/shouyao/index.html',
		'shouyaonew': '/pages/scda/shouyao/new.html',
		'cl': '/pages/scda/cl/index.html',
		'clnew': '/pages/scda/cl/new.html',
		'bl': '/pages/scda/bl/index.html',
		'blnew': '/pages/scda/bl/new.html',
		'banliao': '/pages/scda/banliao/index.html',
		
		'nzpnew': '/pages/nzp/new.html',
		'gmsd': '/pages/nzp/gmsd/index.html',
		'gmsdnew': '/pages/nzp/gmsd/new.html',
		
		'tsjb': '/pages/w/tsjb.html',
		
		// 子页面数组
		'subpage': ['./pages/ztxx/index.html', './pages/scda/index.html', './pages/nzp/index.html', './pages/tsxx/index.html', './pages/w/index.html']
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
		var page = plus.webview.getWebviewById(id);
		if (!page) {
			page = mui.preload({ 'id': id, 'url': url });
			page.addEventListener('loaded', function () {
				callback && callback();
			});
		} else {
			callback && callback();
		}
		return page;
	}
	owner.preloads = function (idarr) {
		var pl = function (index) {
			var id = idarr[index];
			if (id) {
				var url = owner.pages[id];
				var page = plus.webview.getWebviewById(id);
				if (page) {
					pl(index + 1);
				} else {
					page = mui.preload({ 'id': id, 'url': url });
					page.addEventListener('loaded', function () {
						pl(index + 1);
					});
				}	
			}
		}
		pl(0);
	}
	/**
	 * 打开预加载页面，并向页面发送一个自定义事件
	 * @param {String} id - 页面ID
	 * @param {Object} params - 传递给页面的参数对象
	 */
	owner.openPreload = function (id, params) {
		setTimeout(function () {
			var page = plus.webview.getWebviewById(id+'');
			if (page) {
				page.show(owner.option.pageInAnimt);
				$.fire(page, owner.option.pageInitEventName, params || '');
			} else {
				var url = owner.pages[id];
				page = mui.preload({ 'id': id, 'url': url });
				page.addEventListener('loaded', function () {
					page.show(owner.option.pageInAnimt);
					$.fire(page, owner.option.pageInitEventName, params || '');
				});
			}
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
    owner.showImage = function (url) {
    	if (url) {
    		if (url.indexOf('http') === 0) {
    			var wait = plus.nativeUI.showWaiting('图片加载中...');
    			var img = new Image();
				img.src = url;
				img.onload = function () {
					plus.nativeUI.previewImage([url]);
					wait.close();
				};
				img.onerror = function () {
					plus.nativeUI.toast('图片加载失败！');
					wait.close();
				};
    		} else {
    			plus.nativeUI.previewImage([url]);
    		}
    	} else {
    		plus.nativeUI.toast('无效的图片地址！');
    	}
    	
		
		
		
    }
}(mui, window.app={}));