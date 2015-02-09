jQuery.fn.extend({
	serialize: function() {
		var arr = this.serializeArray();
		arr.push({name:'_validatekey', value:this.attr('name')});
		return jQuery.param(arr);
	}
});
//
$.ajaxSetup({
	cache: false
});
// 校验失败后退出
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
	if (originalOptions.type === 'post') {
		var match = /_validatekey=([^&]*)/.exec(originalOptions.data);
		if (match != null) {
			var valid = true, fn = match[1], selector = 'form[name="' + fn + '"] .validate';
			$(selector).validate('validate');
			$(selector).each(function() {
				if (false == $(this).validate('valid')) {
					valid = false;
					//
					if (this.tagName === 'TEXTAREA') {
						$(this).parent().addClass('area_error');
					} else {
						$(this).parent().addClass('txt_error');
					}
				}
			});
			if (!valid) {
				jqXHR.abort();
			}
		} else {
			//$.error('必须给FORM设置NAME属性', this);
		}
	}
});
/**
 * Example Plugin
 */
(function($) {
	var dataKey = 'example';
	// 默认选项
	var defaults = {};
	// 不可覆盖选项
	var internalData = {};
	var methods = {
		init: function(options) {
			// handle params
			options = (typeof options === "object") ? options : {};
			//
			var $this = $(this),
				data = $this.data(dataKey);
				
			// If the plugin has not been initialized yet
			if (!data) {
				data = $.extend({target: $this}, defaults, options, internalData);
				$this.data(dataKey, data);
			}
			
			return this.each(function(){
				var $this = $(this),
					data = $this.data(dataKey);
				
				// If the plugin has not been initialized yet
				if (!data) {
					$this.data(dataKey, {
						target: $this,
						other: 'othervalue'
					});
				}
			});
		},
		
		func1: function() {
			
		}
	};
	
	$.fn.example = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method' + method + ' does not exist on jQuery.example');
		}
	};
	
})(jQuery);

/**
 * Validate Plugin
 */
(function($) {
	var dataKey = 'validate';
	var defaults = {
		errorBoxCls: 'validate_errors'
	};
	var internalData = {};
	var methods = {
		init: function(options) {
			// handle params
			options = (typeof options === "object") ? options : {};
			// 
			return this.each(function(){
				var $this = $(this),
					data = $this.data(dataKey);
				
				// If the plugin has not been initialized yet
				if (!data) {
					$this.data(dataKey, $.extend({target: $this}, defaults, options, internalData, {}));
					data = $this.data(dataKey);
				}
				
				//
				$this.addClass('validate');
			});
		},
		//
		validate: function() {
			return this.each(function(){
				var $this = $(this),
					data = $this.data(dataKey);
				if (data.rules) {
					if ($.isFunction(data.condition)) {
						if (!data.condition.call($this)) {
							return;
						}
					}
					var valid = true;
					$(data.rules).each(function(){
						var r = new RegExp(this.regex, "g");
						if (!r.test($this.val())) {
							valid = false;
							//
							$('.' + data.errorBoxCls).append('<div>' + this.msg + '</div>');
							//
							$this.trigger('invalid');
						};
					});
					$this.data(dataKey, $.extend(data, {valid:valid}));
				} else {
					$.error('必须设定rules');
				}
			});
		},
		//
		valid: function() {
			var $this = $(this),
				data = $this.data(dataKey),
				valid = data.valid;
			return valid;
		}
	};
	
	$.fn.validate = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method' + method + ' does not exist on jQuery.validate');
		}
	};
	
})(jQuery);

/**
 * $.parseParams - parse query string paramaters into an object.
 * var obj = $.parseParams('?a=1&b=2');
 */
(function($) {
	var re = /([^&=]+)=?([^&]*)/g;
	var decodeRE = /\+/g; // Regex for replacing addition symbol with a space
	var decode = function(str) {
		return decodeURIComponent(str.replace(decodeRE, " "));
	};
	$.parseParams = function(query) {
		if (query.indexOf('?') != -1) {
			query = query.split('?')[1] || '';
		}
		var params = {}, e;
		while (e = re.exec(query)) {
			var k = decode(e[1]), v = decode(e[2]);
			if (k.substring(k.length - 2) === '[]') {
				k = k.substring(0, k.length - 2);
				(params[k] || (params[k] = [])).push(v);
			} 
			else
				params[k] = v;
		}
		return params;
	};
})(jQuery);

/**
 * Showtime
 */
(function($) {
	var dataKey = 'showTime';
	
	var defaults = {
		timestamp: 0,
		updateIntval: 1000
	};
	
	var internalData = {
		isTimerStarted: false
	};
	
	var methods = {
		init: function(options) {
			// handle params
			options = (typeof options === "object") ? options : {};
			//
			var $this = $(this),
				data = $this.data(dataKey);
				
			// If the plugin has not been initialized yet
			if (!data) {
				data = $.extend({target: $this}, defaults, options, internalData);
				$this.data(dataKey, data);
			}
			return this.each(function() {
				//
				if (!data.isTimerStarted) {
					data.isTimerStarted = true;
					// update immedialy
					methods._update.call($this);
					// update intval
					setInterval(function() {
						methods._update.call($this);
					}, data.updateIntval);
				}
			});
		},
		_update: function() {
			var $this = $(this),
				data = $this.data(dataKey);
			var now = new Date(data.timestamp);
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var day = now.getDate();
			var hour = now.getHours();
			var minute = now.getMinutes();
			var second = now.getSeconds();
			if (minute < 10) {
				minute = "0" + minute;
			}
			if (second < 10) {
				second = "0" + second;
			}
			$this.html(year + "年" + month + "月" + day + "日" + " " + hour + "时" + minute + "分" + second + "秒");
			//
			data.timestamp += data.updateIntval;
		}
	};
	
	$.fn.showTime = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method' + method + ' does not exist on jQuery.showTime');
		}
	};
})(jQuery);

/**
 * cascadeSelect
 */
(function($) {
	var methods = {
		init: function(options) {
			return this.each(function() {
				var $this = $(this);
				var data = $this.data('cascadeSelect');
				if (!data) {
					data = $.extend({}, {});
					$this.data('cascadeSelect', data);
				}
				if (options) {
					data.options = $.extend({
						'emptyOptionText': '请选择',
						'emptyOptionValue': '',
						'useEmptyOption': true,
						'url': '',
						'next': '',
						'params': {},
						'extraParams': {}
					}, options);
				}
				
				$this.change(function() {
					$this.cascadeSelect('loadNextSelect');
				});

				//
				if (data.options.useEmptyOption && $this.find('option').length == 0) {
					$this.append('<option value="' + data.options.emptyOptionValue + '" >' + data.options.emptyOptionText + '</option>');
				}
			});
		},
		//
		load: function(params) {
			var $this = $(this);
			var data = $this.data('cascadeSelect');
			var options = data.options;
			if (options.url !== '') {
				// 清空旧options
				$this.empty();
				//
				//params = jQuery.parseJSON(jsonString);
				params = $.extend({}, options.params, options.extraParams);
				// 从服务器读取options
				$.get(options.url, params, function(response) {
					if (options.useEmptyOption) {
						$this.append('<option value="' + options.emptyOptionValue + '" >' + options.emptyOptionText + '</option>');
					}
					$.each(response.data, function(idx, item) {
						$this.append('<option value="' + item.value + '" >' + item.label + '</option>');
					});
					// trigger success
					$this.trigger('success');
					//
					$this.cascadeSelect('loadNextSelect');
				});
			}
		},
		//
		loadNextSelect: function() {
			var $this = $(this);
			var data = $this.data('cascadeSelect');
			if (data.options.next !== '') {
				var next = $(data.options.next);
				var selected = $this.find('option:selected').val();
				if (selected) {
					var paramName = $this.attr("name");
					var jsonString = '{"' + paramName + '":"' + selected + '"}';
					params = jQuery.parseJSON(jsonString);
					$.extend(next.data('cascadeSelect').options.params, params);
					next.cascadeSelect('load');
				}
			}
		}
	};
	
	$.fn.cascadeSelect = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method' + method + ' does not exist on jQuery.cascadeSelect');
		}
	};
})(jQuery);

/**
 * grid
 */
(function($) {

	var dataKey = 'grid';
	
	var defaults = {
		// 加载窗体HTML地址
		url: '',
		// 行模版样式名称
		rowTplClass: 'g-tpl-row',
		// 实际行样式名称
		rowClass: 'g-row',
		// 行容器
		rowContanerClass: 'g-rowcontainer',
		// 每页数据条数控件选择器
		pageSizeSelector: '.g-pagesize',
		// 是否自动加载
		autoLoad: true,
		// 偶数行样式
		oddClass: 'odd',
		// 基数行样式
		evenClass: 'even',
		// 持久参数
		params: {'pageSize': 20},
		// 动态参数, 会覆盖params中同名的变量
		extraParams: {},
		// PageSize Options Cls
		pageSizeSelectCls: 'g-pagesizes',
		// 在Options中显示的页数
		pageSizeSelect: [20,40,60,80,100],
		// 表格自增变量名 
		seqName: '_INDEX_',
		// 判断是否调整弹出层位置
		isPosition: false,
		// 如调整弹出层，设置调整的差值
		moveTop: 0,
		// 载入数据成功后执行操作
		loadFunction: null
	};
	
	var internalData = {
		// 最后响应
		response: null
	};
	
	var methods = {
		init: function(options) {
			// handle params
			options = (typeof options === "object") ? options : {};
				// 
			var $this = $(this);
			//
			var data = $this.data(dataKey);
			if (!data) {
				data = $.extend({target: $this}, defaults, options, internalData);
				// 行容器
				var $rowContainer = $this.find('.' + data.rowContanerClass);
				var $rowTemplate = $rowContainer.children();
				
				// 模版
				data.templates = $.extend({}, {
					row: $($rowTemplate[0].outerHTML).removeClass('g-row-tpl')[0].outerHTML
				});
				//
				$this.data(dataKey, $.extend(data, {$rowContainer: $rowContainer}));
				
				// 第一页
				$this.find('.g-link-firstPage').on('click', function(e) {
					e.preventDefault();
					data.params = $.extend(data.params, {page: 1});
					$this.grid('load');
				});
				// 前一页
				$this.find('.g-link-prePage').on('click', function(e) {
					e.preventDefault();
					var n = Math.max(1, data.response.page - 1);
					data.params = $.extend(data.params, {page: n});
					$this.grid('load');
				});
				$this.find('.g-link-nextPage').on('click', function(e) {
					e.preventDefault();
					var n = Math.min(data.response.totalPages, data.response.page + 1);
					data.params = $.extend(data.params, {page: Math.max(1,n)});
					$this.grid('load');
				});
				$this.find('.g-link-lastPage').on('click', function(e) {
					e.preventDefault();
					data.params = $.extend(data.params, {page: Math.max(1,data.response.totalPages)});
					$this.grid('load');
				});
				$this.find('.g-link-goto').on('click', function(e) {
					e.preventDefault();
					var f = $('.g-field-goto', $this);
					var v = f.val();
					f.val("");
					if (f.length != 0 && $.isNumeric(v)) {
						v = Math.max(v, 1); // cannot less than 1
						v = Math.min(v, data.response.totalPages); // cannot more than totalpages
						data.params = $.extend(data.params, {page: Math.max(1,v)});
						$this.grid('load');
					}
				});
				//
				
				//
				if (data.autoLoad) {
					$this.grid('load');
				}
			}
			
			return this.each(function() {
				// 
				$('.' + data.pageSizeSelectCls).each(function(){
					var html = '',
						optionshtml = '';
					$.each(data.pageSizeSelect, function(){
						optionshtml += '<option value="' + this + '">' + this + '</option>';
					});
					html = '<select name="pageSize">' + optionshtml + '</select>';
					var sel = $(html);
					$(this).append(sel);
					//
					sel.on('change', function(){
						var selVal = $(this).find(':selected').val();
						data.params = $.extend(data.params, {'pageSize': selVal});
						methods.load.call($this);
					});
				});
			});
		},
		//
		extraParams: function(params) {
			var $this = $(this);
			var data = $this.data(dataKey);
			data.extraParams = params;
			return $this;
		},
		//
		load: function(params) {
			var $this = $(this),
				data = $this.data(dataKey);
			
			//
			if (params) {
				methods.extraParams.call($this, params);
			}
			
			//
			if (data.url !== '') {
				// 设置参数
				params = $.extend({}, data.params, data.extraParams);
				// 从服务器读取options
				$.getJSON(data.url, params, function(response) {
					// 当请求的页数大于服务器上实际数据页数时,需要按最大实际页数重新请求.
					// 否则会出现空页的BUG
					if ($.isNumeric(params.page)) {
						if (params.page > response.totalPages && 0 < response.totalPages) {
							data.params = $.extend(data.params, {page: response.totalPages});
							return methods.load.call($this);
						}
					}
					// 首先替换标签变量
					$this.find('.g-var-page').html(response.page);
					$this.find('.g-var-totalPages').html(response.totalPages);
					//
					var $rowContainer = data.$rowContainer
					// 清空旧rows
					$rowContainer.empty();
					// 
					var idx = 0;
					$.each(response.rows, function(idx, item) {
						var tpl = data.templates.row;
						// seq
						var seq = ++idx;
						if ($.isNumeric(response.page) && $.isNumeric(response.size)) {
							seq = seq + (response.page - 1) * response.size;
						}
						tpl = tpl.replace(new RegExp('\{\{' + data.seqName + '\}\}', "g"), seq);
						
						//
						for (var name in item) {
							if (item[name]) { 
								tpl = tpl.replace(new RegExp('\{\{' + name + '\}\}', "g"), item[name]);
							} else {
								tpl = tpl.replace(new RegExp('\ [a-z=]*\{\{' + name + '\}\}\ ', "ig"), " ");
								tpl = tpl.replace(new RegExp('\{\{' + name + '\}\}', "g"), item[name]);
							}
						}
						var jqTpl = $(tpl, $this);
						if (data.oddClass !== '') {
							if (idx % 2 == 1) {
								jqTpl.addClass(data.oddClass);
							} else {
								jqTpl.addClass(data.evenClass);
							}
						}
						//
						$rowContainer.append(jqTpl);
						//
					});
					
					if( data.isPosition ){
						$(".ui-dialog-content:first").css({
							"top": function(){
								var top = $(window).height()/2 - $(".ui-dialog-content:first").height()/2 + data.moveTop + $(window).scrollTop();
								if( top < 0 ) top = 0;
								return top;
							}
						})
					}
					
					if( data.loadFunction != null ){
						data.loadFunction();
					}
					
					// update response
					data.response = response;
					//
					$this.trigger('success');
				});
			}
		}
	};
	
	$.fn.grid = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method' + method + ' does not exist on jQuery.grid');
		}
	};
})(jQuery);

/**
 * Dialog
 */
(function($) {
	var methods = {
		init: function(options) {
			var $this = $('<div class="ui-dialog"><div class="ui-dialog-overlay"></div><div class="ui-dialog-content"></div></div>').appendTo('body');
			
			return $this.each(function() {
				$(this).dialog(options);
			});
		}
	};
	
	$.dialog = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method' + method + ' does not exist on jQuery.dialog');
		}
	};
})(jQuery);
(function($) {
	
	var dataKey = 'dialog';
	
	var defaults = {
		// 加载窗体HTML地址
		url: '',
		url: '',
		// 加载窗体参数
		params: null,
		// 加载成功后执行的回调
		load: null,
		// 窗口关闭后回调
		close: null,
		// 窗口距离上下的距离误差
		moveTop: 0
	};
	
	var internalData = {
		closeSelector: '.ui-dialog-close'
	};
	
	var methods = {
		init: function(options) {
			// handle params
			options = (typeof options === "object") ? options : {};

			//
			var $this = $(this),
				$overlay = $this.find('.ui-dialog-overlay'),
				$content = $this.find('.ui-dialog-content');
				
			var data = $this.data(dataKey);
			var bodyHeight;
			if($(window).height() > $("body").height()) bodyHeight = $(window).height();
			else bodyHeight = $("body").height();
			
			
			$this.css({'position':"absolute", "width":"100%", "height":"100%", "top":"0", "left":"0", "zIndex":10000});
			$overlay.css({'position':"absolute", "width":"100%", "height":bodyHeight, "top":"0", "left":"0", "background":"#000", "opacity":"0.50"});
			$content.css({'position':"absolute", "top":"100", "left":"0", "zIndex":"10000", "display":"none", "background":"#FFF"});
			
						
			// If the plugin has not been initialized yet
			if (!data) {
				data = $.extend({target: $this}, defaults, options, internalData);
				$this.data(dataKey, data);
			}
			
			return $this.each(function() {
				if (data.load != null && jQuery.isFunction(data.load)) {
					$this.bind('load', data.load);
				}
				if (data.close != null && jQuery.isFunction(data.close)) {
					$this.bind('close', data.close);
				}
				//
				if (data.url !== '') {
					methods.load.apply($this);
				}
			});
			
		},
		//
		load: function() {
			var data = this.data(dataKey);
			var $this = data.target;
			if (data.url === '') {
				return $this;
			}
			
			$.ajax({
				url: data.url,
				data: data.params,
				success: function(html) {
					$this.find('.ui-dialog-content').append(html);
					//
					methods._init.apply($this);
					//
					$this.trigger('load');
					
					//
					$this.find('.close').on('click', function(){
						methods.close.call($this);
					});
					
					//
					$this.find('.ui-dialog-content').show();
					
					// dialog left and resize
					var scrollTop = $(window).scrollTop();
					var windowHeight = $(window).height();
					
					var dialogWidth = $this.find('.ui-dialog-content').find("div").eq(0).css("width");
					    dialogWidth = parseInt(dialogWidth);
					var dialogHeight = $this.find('.ui-dialog-content').find("div").eq(0).height();
					    dialogHeight = parseInt(dialogHeight);
					
					
					$this.find('.ui-dialog-content').css({
						"left":function(){
							return Math.floor($(document).width()/2 - dialogWidth/2);
						},
						"display":"block"
					});
					if( dialogHeight > 800 ){
						$this.find('.ui-dialog-content').css({
							"height":800,
							"overflowY":"auto"
						})
						dialogHeight = 800;
					}
					$this.find('.ui-dialog-content').css({
						"top": function(){
							var t = (windowHeight - dialogHeight)/2 + scrollTop + data.moveTop;
							if( t <= 0 ) t = 0;
							return t;
						}
					});
					
					
					
					$(window).resize(function(){
						$this.find('.ui-dialog-content').css({
							"left":function(){
								return Math.floor($(document).width()/2 - dialogWidth/2);
							}
						});
						if($(window).height() >= $("body").height()) bodyHeight = $(window).height();
						else bodyHeight = $("body").height();
						$this.find('.ui-dialog-overlay').css({"height":bodyHeight});
					});
										
					if( $(".ui-dialog-content:first .title:first").length > 0 ){
						$(".ui-dialog-content:first .title:first").mousedown(function(e){
							var that = $(this);
							var x    = e.screenX - that.offset().left;
							var y    = e.screenY - that.offset().top;
							$(document).mousemove(function(event){
								$(".ui-dialog-content:first").css({
									"top": function(){
										return event.screenY - y;
									},
									"left": function(){
										return event.screenX - x;
									}
								})
							});
						});
						$(document).mouseup(function(){
							$(document).unbind("mousemove");
						});
					}
				}
			});
			
			return $this;
		},
		//
		close: function() {
			var $this = $(this);
			//$this.css('display', 'none');
			$this.trigger('close');
			// remove object(swf) or embed hack
			$this.find('object,embed').each(function(){
				this.parentNode.removeChild(this);
			});
			//
			$(".ui-dialog-content:first .title:first").unbind("mousedown");
			$(document).unbind("mousemove");
			$(document).unbind("mouseup");
			$this.remove();
		},
		//
		_init: function() {
			var data = this.data(dataKey),
				$this = data.target;
				
			$this.find(data.closeSelector).click(function(e){
				e.preventDefault = true;
				methods.close.apply($this);
			});
		}
	};
	
	$.fn.dialog = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method' + method + ' does not exist on jQuery.dialog');
		}
	};
})(jQuery);

/**
 * Tree
 * 
 * Events: 
 *   checkStatusChanged 节点选择状态改变
 */
(function($) {
	
	var dataKey = 'tree';
	var nodeDataKey = 'treeNode';
	
	var defaults = {
		// 加载树HTML地址
		url: '',
		// 加载树参数
		params: null,
		// 加载成功后执行的回调
		load: null,
		// 显示列名称
		labelFieldName: 'label',
		// 值列名称
		valueFieldName: 'value',
		// 节点动作
		actions: null,
		// 加载成功后是否自动展开根节点
		expandRoot: true,
		// 根节点
		root: null,
		// 是否是选择树
		checkboxMode: false,
		// 选中的节点ID数组
		values: [],
		// 是否单选
		single: false,
		// 是否显示该节点的checkbox
		showCheckbox: null
	};
	
	var internalData = {
		treeClass: 'ui-tree',
		nodeImgClass: 'node-img',
		collapsedClass: 'collapsed',
		expandedClass: 'expanded',
		fieldIsLeaf: '_isLeaf',
		fieldImage: '_img'
	};
	
	var methods = {
		init: function(options) {
			// handle params
			options = (typeof options === "object") ? options : {};
			// 
			var $this = $(this),
				data = $this.data(dataKey);
				 
			// If the plugin has not been initialized yet
			if (!data) {
				data = $.extend({target: $this}, defaults, options, internalData);
				$this.data(dataKey, data);
			}
			
			$this.addClass(data.treeClass);
			
			return $this.each(function() {
                if ($.isFunction(data.load)) {
                    data.load.call($this);
                }
            });
		},
		//
		load: function() {
			var $this = $(this),
				data = $this.data(dataKey);
				
			if (data.url === '') {
				return $this;
			}
			
			return $this.each(function() {
				$.get(data.url, data.params, function(response) {
					methods._buildHtml.call($this, response);
					methods._initTree.call($this);
					if (data.expandRoot) {
						methods.expand.call($this, $this.find('ul:first li:first'));
					}
					$this.trigger('load');
				});
			});
		},
		// 追加节点
		addChild: function(pNode, o) {
			if (pNode.find('>ul').length == 0) {pNode.append('<ul></ul>');}
			var node = methods._createNodeHtml.call(this, o);
			pNode.find('>ul:first').append(node);
			methods._initNode.call(this, node);
		},
		// 展开指定节点
		expand: function(node) {
			node.removeClass('collapsed').addClass('expanded');
		},
		// 取得选中的数据
		getCheckedData: function() {
			var $this = $(this),
				data = $this.data(dataKey),
				checked = $this.find('li:not(:has(ul))').filter(':has(:checkbox:checked)');
			
			var data = new Array();
			checked.each(function(i, e){
				var dataItem = $(e).data(nodeDataKey);
				data.push(dataItem);
			});
			
			return data;
		},
		// 以form的方式来处理点击事件
		showActionForm: function(node, html, options) {
			var $this = $(this),
				data = $this.data(dataKey);
			
			html.removeClass('hide');
			
			var actionsCt = node
				.find('>.node-box>.actions')
				.css('display', 'none')
				.after(html);
			
			var form = html.find('form');
			form.find('.accept').on('click', function(){
				$.post(options.url, form.serialize(), function(result) {
					if (result.success && $.isFunction(options.success)) {
						options.success(result);
					}
					html.remove();
					actionsCt.css('display', '');
				});
			});
			form.find('.cancel').on('click', function(){
				html.remove();
				actionsCt.css('display', '');
			});
		},
		//
		// 刷新传入的节点(li)
		//
		update: function(node) {
			var $this = $(this),
				data = $this.data(dataKey),
				nodeData = node.data(nodeDataKey);
			
			//
			var params = $.extend({}, nodeData, {children:null});
			delete params.children;
			
			$.get(data.url, params, function(response) {
				if (!$.isArray(response)) {
					$.error('必须返回数组');
				}
				
				// 因为仅针对指定节点更新,所以不能返回多个节点
				if (response.length > 1) {
					$.error('最多只能返回一个顶级节点');
				}
				
				// 处理当前节点被删除的情况
				if (response.length == 0) {
					node.remove();
					return; 
				}
				
				//
				// 更新节点
				// 
				var li = methods._createNodeHtml.call($this, response[0]);
				li.insertAfter(node);
				methods._initNode.call($this, li);
				node.remove();
			});
		},
		//
		_buildHtml: function(response) {
			var $this = $(this),
				data = $this.data(dataKey);
			
			if (!response) {
				$.error("Invalid response");
			}
			
			$this.empty();
			
			var ct = $('<ul></ul>').appendTo($this);
			
			//
			if (data.root) {
				var li = methods._createNodeHtml.call($this, data.root);
				ct.append(li);
				ct = $('<ul></ul>').appendTo(li);
			}
			
			if ($.isArray(response)) {
				$.each(response, function(i, obj){
					var node = methods._createNodeHtml.call($this, obj);
					ct.append(node);
				});
			} else {
				var node = methods._createNodeHtml.call($this, response);
				ct.append(node);
			}
		},
		_createNodeHtml: function(o) {
			// ct is [<ul></ul>]
			var $this = $(this),
				data = $this.data(dataKey),
				li = $('<li><div class="node-box"></div></li>'),
				// 行容器
				rowCt = li.find('div');
			
			// save data
			li.data(nodeDataKey, o);
			
			// node status icon (expanded or collapsed)
			rowCt.append('<span class="status-img"></span>')
			
			// has checkbox 
			if (data.checkboxMode) {
				var cbhtml = '<input type="checkbox" />';
				// 组织编号
				var val = o["organId"];
				// 是否默认选中
				if("undefined" != typeof values) {
					for(var i=0; i<values.length; i++){
						if(values[i]===val){
							cbhtml = '<input type="checkbox" checked="checked" />';
						}
					}
				}
				if (data.showCheckbox != null && $.isFunction(data.showCheckbox)) {
					if (data.showCheckbox.call($this,o) == true) {
						rowCt.append(cbhtml);
					}
				} else {
					rowCt.append(cbhtml);
				}
			}
			
			// image and text
			rowCt.append('<span class="' + data.nodeImgClass + '"></span>')
				.append('<span class="node-text">' + o[data.labelFieldName] + '</span>');
			
			// actions
			if (data.actions && $.isFunction(data.actions)) {
				var div = $('<span class="actions"></span>');
				data.actions.call($this, li, div, o);
				rowCt.append(div);
			}
			
			if (o[data.fieldImage]) {
				rowCt.find('.'+data.nodeImgClass).append('<img src="' + o['_img'] + '" />');
			}
			
			if ($.isArray(o.children)) {
				var childCt = $('<ul></ul>');
				$.each(o.children, function(i, obj){
					var childHtml = methods._createNodeHtml.call($this, obj);
					childCt.append(childHtml);
				});
				li.append(rowCt).append(childCt);
			}
			
			return li;
		},
		//
		// 从根节点开始初始化树
		//
		_initTree: function() {
			var $this = $(this),
				data = $this.data(dataKey),
				root = $this.find('> ul:first > li:first');
			
			// 遍历ROOT节点
			methods._initNode.call($this, root);
		},
		//
		// 为当前节点以及子节点追加样式和事件
		//
		_initNode: function(node) {
			var $this = $(this),
				data = $this.data(dataKey),
				li = $(node),
				nodeData = li.data(nodeDataKey);
			
			//
			// 处理子节点
			//
			li.find('> ul > li').each(function() {
				methods._initNode.call($this, this);
			});
			
			//
			// 处理当前节点
			//
			
			// 移除li样式和事件
			li.removeClass('collapsed expanded');
			li.find('> .node-box > .status-img').off('click');
			
			// 处理有子集的li
			li.has('> ul')
				// 追加收缩样式
				.addClass(data.collapsedClass)
				// 查找直接节点收缩图标div
				.find(' > .node-box > .status-img')
					// 处理图标click事件(先解除bind原事件)
					.on('click', function(e) {
						// 找到容器节点
						var node = $(this).parents('li:first');
						// 变换状态
						node.toggleClass('collapsed expanded');
					});
			// direct checkbox under li
			li.find('>.node-box>:checkbox').change(function() {
				methods._handleCheckboxChange.call($this, this);
			});
		},
		// 处理checkbox的change事件
		_handleCheckboxChange: function(cb) {
			var $this = $(this),
				data = $this.data(dataKey),
				li = $(cb).parents('li:first'); // li
				
			if (data.single) { // 单选模式下直接关闭
				
			} else {
				if (cb.indeterminate) { // 半选
					li.find('>.node-box>:checkbox').each(function(){cb.checked=true;});
				} else {
					if (cb.checked) { 
						// 全选包括自身在内的所有子级
						$(cb).parent().siblings('ul').find(':checkbox').each(function(){this.checked=true;});
						// 循环处理父级checkbox
					} else { 
						// 取消包括自身在内的所有子级
						$(cb).parent().siblings('ul').find(':checkbox').each(function(){this.checked=false;});
					}
					methods._adjustParentCheckboxStatus.call($(this), cb);
				}
			}
			// 
			$this.trigger('checkStatusChanged', li);
		},
		// 处理父级checkbox
		_adjustParentCheckboxStatus: function(cb) {
			var li = $(cb).parents('li:first'), // container li
				pli = li.parents('li:first');
			
			while (pli.length > 0) {
				var cb2 = pli.find('>.node-box>:checkbox');
				if (cb2.length > 0) {
					methods._adjustCheckboxStatus.call($(this), cb2[0]);
				}
				//
				pli = pli.parents('li:first');
			}
		},
		// 设置checkbox状态
		_adjustCheckboxStatus: function(cb) {
			if (!cb) return;
			var li = $(cb).parents('li:first'), // container li
				// 查找子级checkbox
				cbs = li.find('ul li > .node-box > :checkbox');
				
			if (cbs.length >0) {
				var fLen = cbs.filter(':checked').length;
				if (fLen == 0) { // 全没选中
					cb.checked = false;
					cb.indeterminate = false;
				} else if (fLen == cbs.length) { // 全选中
					cb.checked = true;
					cb.indeterminate = false;
				} else { // 部分选中
					cb.indeterminate = true;
				}
			} else { // 最终节点
			}
		}
	};
	
	$.fn.tree = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method' + method + ' does not exist on jQuery.tree');
		}
	};
})(jQuery);

/**
 * FastTree
 * 
 * Events: 
 *   checkStatusChanged 节点选择状态改变
 */
(function($) {
	
	var dataKey = 'fastTree';
	var nodeDataKey = 'fastTreeNode';
	
	var defaults = {
		// 加载树HTML地址
		url: '',
		// 加载树参数
		params: null,
		// 加载成功后执行的回调
		load: null,
		// 显示列名称
		labelFieldName: 'label',
		// 值列名称
		valueFieldName: 'value',
		// 节点动作
		actions: null,
		// 根节点
		root: null,
		// 是否是选择树
		checkboxMode: false
	};
	
	var internalData = {
		treeClass: 'ui-tree',
		nodeImgClass: 'node-img',
		collapsedClass: 'collapsed',
		expandedClass: 'expanded',
		fieldIsLeaf: '_isLeaf',
		fieldImage: '_img'
	};
	
	var methods = {
		init: function(options) {
			// handle params
			options = (typeof options === "object") ? options : {};
			// 
			var $this = $(this),
				data = $this.data(dataKey);
				 
			// If the plugin has not been initialized yet
			if (!data) {
				data = $.extend({target: $this}, defaults, options, internalData);
				if (data.root) {
					data.params = $.extend(data.params, {showRoot: true});
				}
				$this.data(dataKey, data);
			}
			//
			$this.addClass(data.treeClass);
			
			return $this.each(function() {});
		},
		//
		load: function() {
			var $this = $(this),
				data = $this.data(dataKey);
				
			if (data.url === '') {
				return $this;
			}
			
			return $this.each(function() {
				$.get(data.url, data.params, function(response) {
					var tpl = response.tpl,
						html = response.html,
						nodes = response.nodes;
					//
					if (data.root && data.root.text) {
						var rootnode = tpl;
						rootnode = rootnode.replace(/\{\{ID\}\}/g, "");
						rootnode = rootnode.replace(/\{\{CLS\}\}/g, "");
						rootnode = rootnode.replace(/\{\{TEXT\}\}/g, data.root.text);
						rootnode = rootnode.replace(/\{\{CHILDREN\}\}/g, html);
						//
						$this.empty();
						//
						$('<ul></ul>')
							.appendTo($this)
							.append(rootnode);
					} else {
						$this.append(html);
					}
					
					// 绑定数据到节点
					$this.find('li').each(function(){
						var tmp = $(this);
						var id = tmp.attr('id');
						tmp.data(nodeDataKey, nodes[id]);
					});
					
					//
					methods._initTree.call($this);
					//
					if (data.root && data.root.expand) {
						methods.expand.call($this, $this.find('ul li').first());
					}
					//
					if (data.load && $.isFunction(data.load)) {
						data.load.call($this);
					} else {
						$this.trigger('load');
					}
				});
			});
		},
		// 展开指定节点
		expand: function(node) {
			methods._expand.call($(this), node);
		},
		// 取得选中的数据
		getCheckedData: function() {
			var $this = $(this),
				data = $this.data(dataKey),
				checked = $this.find('li:not(:has(ul))').filter(':has(:checkbox:checked)');
			
			var data = new Array();
			checked.each(function(i, e){
				var dataItem = $(e).data(nodeDataKey);
				data.push(dataItem);
			});
			
			return data;
		},
		// 以form的方式来处理点击事件
		showActionForm: function(node, html, options) {
			var $this = $(this),
				data = $this.data(dataKey);
			
			html.removeClass('hide');
			
			var actionsCt = node
				.find('>.node-box>.actions')
				.css('display', 'none')
				.after(html);
			
			var form = html.find('form');
			form.find('.accept').on('click', function(){
				$.post(options.url, form.serialize(), function(result) {
					if (result.success && $.isFunction(options.success)) {
						options.success(result);
					}
					html.remove();
					actionsCt.css('display', '');
				});
			});
			form.find('.cancel').on('click', function(){
				html.remove();
				actionsCt.css('display', '');
			});
		},
		// 刷新传入的节点(li)
		update: function(node) {
			var $this = $(this),
				data = $this.data(dataKey),
				nodeData = node.data(nodeDataKey),
				params = $.extend({}, nodeData);
			//
			$.get(data.url, params, function(response) {
				var tpl = response.tpl,
					html = response.html,
					nodes = response.nodes;
				
				// 绑定数据到节点
				html = $(html);
				html.find('li').each(function(){
					var li = $(this);
					var id = li.attr('id');
					var nd = response.nodes[id];
					li.data(nodeDataKey, nd);
				});
				//
				// 更新节点
				// 
				var li = $('li:first', html);
				li.insertAfter(node);
				methods._initNode.call($this, li);
				methods._initNodeExtra.call($this, li, data);
				node.remove();
				methods._expand.call($this, li);
			});
		},
		// 追加节点
		addChild: function(pNode, o) {
			var $this = $(this);
			if (pNode.find('>ul').length == 0) {pNode.append('<ul></ul>');}
			var node = methods._createNodeHtml.call($this, pNode, o);
			pNode.find('>ul:first').append(node);
			methods._initNode.call($this, node);
		},
		//
		// 从根节点开始初始化树
		//
		_initTree: function() {
			var $this = $(this),
				//data = $this.data(dataKey),
				root = $this.find('> ul:first > li:first');
			
			// 遍历ROOT节点
			methods._initNode.call($this, root);
		},
		//
		// 为当前节点以及子节点追加样式和事件
		//
		_initNode: function(node) {
			var $this = $(this),
				data = $this.data(dataKey),
				li = $(node),
				nodeData = li.data(nodeDataKey);
			//
			// 处理子节点
			//
			li.find('> ul > li').each(function() {
				methods._initNode.call($this, this);
			});
			
			//
			// 处理当前节点
			//
			
			// 移除li样式和事件
			li.removeClass('collapsed expanded');
			li.find('> .node-box > .status-img').off('click');
			
			// 处理有子集的li
			li.has('> ul')
				// 追加收缩样式
				.addClass(data.collapsedClass)
				// 查找直接节点收缩图标div
				.find(' > .node-box > .status-img')
					// 处理图标click事件(先解除bind原事件)
					.on('click', function(e) {
						// 找到容器节点
						var node = $(this).parents('li:first');
						// 变换状态
						methods._toggleExpand.call($this, node);
					});
			// direct checkbox under li
			li.find('>.node-box>:checkbox').change(function() {
				methods._handleCheckboxChange.call($this, this);
			});
		},
		// 为传入的节点创建扩展html
		_initNodeExtra: function(node, data) {
			var $this = $(this),
				nodeData = node.data(nodeDataKey);
			// actions
			if (data.actions && $.isFunction(data.actions)) {
				var div = node.find('>.node-box>.actions');
				if (div.children().length == 0) {
					data.actions.call($this, node, div, nodeData);
				}
			}
		},
		// 切换展开收缩状态
		_toggleExpand: function(node) {
			if (node.hasClass('collapsed')) {
				methods._expand.call($(this), node);
			} else {
				methods._collapse.call($(this), node);
			}
		},
		//
		_expand: function(node) {
			var $this = $(this),
				data = $this.data(dataKey);
			// 追加操作区图标
			var children = node.find('>ul>li');
			$.each(children, function(){
				var child = $(this);
				var childId = child.attr('id');
				var childData = child.data(nodeDataKey);
				// actions
				if (data.actions && $.isFunction(data.actions)) {
					var div = child.find('>.node-box>.actions');
					if (div.children().length == 0) {
						data.actions.call($this, child, div, childData);
					}
				}
			});
			//
			node.removeClass('collapsed').addClass('expanded');
		},
		_collapse: function(node){
			node.removeClass('expanded').addClass('collapsed');
		},
		// 处理checkbox的change事件
		_handleCheckboxChange: function(cb) {
			var $this = $(this),
				li = $(cb).parents('li:first'); // li
			
			if (cb.indeterminate) { // 半选
				li.find('>.node-box>:checkbox').each(function(){cb.checked=true;});
			} else {
				if (cb.checked) { 
					// 全选包括自身在内的所有子级
					$(cb).parent().siblings('ul').find(':checkbox').each(function(){this.checked=true;});
					// 循环处理父级checkbox
				} else { 
					// 取消包括自身在内的所有子级
					$(cb).parent().siblings('ul').find(':checkbox').each(function(){this.checked=false;});
				}
				methods._adjustParentCheckboxStatus.call($(this), cb);
			}
			// 
			$this.trigger('checkStatusChanged', li);
		},
		// 处理父级checkbox
		_adjustParentCheckboxStatus: function(cb) {
			var li = $(cb).parents('li:first'), // container li
				pli = li.parents('li:first');
			
			while (pli.length > 0) {
				var cb2 = pli.find('>.node-box>:checkbox');
				if (cb2.length > 0) {
					methods._adjustCheckboxStatus.call($(this), cb2[0]);
				}
				//
				pli = pli.parents('li:first');
			}
		},
		// 设置checkbox状态
		_adjustCheckboxStatus: function(cb) {
			if (!cb) return;
			var li = $(cb).parents('li:first'), // container li
				// 查找子级checkbox
				cbs = li.find('ul li > .node-box > :checkbox');
				
			if (cbs.length >0) {
				var fLen = cbs.filter(':checked').length;
				if (fLen == 0) { // 全没选中
					cb.checked = false;
					cb.indeterminate = false;
				} else if (fLen == cbs.length) { // 全选中
					cb.checked = true;
					cb.indeterminate = false;
				} else { // 部分选中
					cb.indeterminate = true;
				}
			} else { // 最终节点
			}
		}
	};
	
	$.fn.fastTree = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method' + method + ' does not exist on jQuery.fastTree');
		}
	};
})(jQuery);

/**
 * SimpleTree Plugin
 */
(function($) {
	
	var dataKey = 'simpleTree';
	var nodeDataKey = 'simpleTreeNode';
	
	// 默认选项
	var defaults = {
		// 根节点
		root: {text:'全部'},
		// 是否显示选择框
		checkbox: false
	};
	
	// 不可覆盖选项
	var internalData = {};
	
	// 节点模版
	var nodeHtml = '' +
		'<li class="node">' +
		'<div class="rowbox">' + 
		'  <div class="main">' + 
		'    <div class="rowitem status-img"></div>' + 
		'    <div class="rowitem check-img hide"></div>' + 
		'    <div class="rowitem node-img"></div>' + 
		'    <div class="rowitem text"></div>' + 
		'  </div>' +
		'  <div class="extra"></div>' + 
		'</div>' +
		'<ul class="children"></ul>' +
		'</li>';
	
	// 方法
	var methods = {
		init: function(options) {
			// handle params
			options = (typeof options === "object") ? options : {};
			//
			var $this = $(this),
				data = $this.data(dataKey);
				
			// If the plugin has not been initialized yet
			if (!data) {
				data = $.extend(defaults, options, internalData);
				$this.data(dataKey, data);
			}
			
			//
			$this.addClass('simple-tree');
			
			//
			return this.each(function(){});
		},
		load: function() {
			var $this = $(this),
				data = $this.data(dataKey);
				
			if (data.url === '') {
				return $this;
			}
				
			$.get(data.url, data.params, function(response) {
				//
				$this.empty();
				//
				var rootCt = $('<ul class="root"></ul>').appendTo($this),
					ct = rootCt,
					root = null;
				//
				if (data.root) {
					//
					data.root = $.extend(data.root, {_id:'', _text:data.root.text});
					
					//
					root = methods._createNode.call($this, data.root);
					// 初始化根节点
					methods._initNode.call($this, root);
					// 追加根节点
					rootCt.append(root);
					//
					ct = rootCt.find('.node>.children').first();
				}
				// 为了加快初始化速度, 第一步仅仅构造节点最基本的HTML, 并绑定DATA
				// 进一步处理放在EXPAND事件中
				//
				$.each(response, function(){
					ct.append(methods._createNodeDeep.call($this, this));
				});
				
				// 展开
				if (root) {
					methods.expand.call($this, root);
				}
			});
				
			return $this;
		},
		// 切换节点状态
		switchStatus: function(node) {
			if (node.hasClass('collapsed')) {
				methods.expand.call(this, node);
			} else {
				methods.collapse.call(this, node);
			}
		},
		// 展开节点
		expand: function(node) {
			var me = this,
				$this = $(this),
				nodeData = $(node).data(nodeDataKey);
			//
			node.find('>.children>.node').each(function(){
				var n = $(this),
					d = n.data(nodeDataKey);
				if (!d.hasOwnProperty('_init') || d._init === 'false') {
					methods._initNode.call(me, n);
				}
			});
			//
			node.removeClass('collapsed').addClass('expanded');
		},
		collapse: function(node){
			node.removeClass('expanded').addClass('collapsed');
		},
		// 创建节点(包含子节点)
		_createNodeDeep: function(nodeData) {
			var me = this,
				node = methods._createNode.call(me, nodeData),
				childrenCt = node.find('>.children');
			
			if (nodeData.children) {
				$.each(nodeData.children, function(){
					childrenCt.append(methods._createNodeDeep.call(me, this));
				});
			}
			return node;
		},
		// 取得节点数据
		nodeData: function(node) {
			return node.data(nodeDataKey);
		},
		// 创建节点
		_createNode: function(nodeData) {
			// 构造html
			var node = $(nodeHtml);
			// 绑定data
			$(node).data(nodeDataKey, nodeData);
			//
			return node;
		},
		// 初始化节点,一般在展开时才做该操作,加快树的初始化速度
		_initNode: function(node) {
			var me = this,
				data = this.data(dataKey),
				nodeData = node.data(nodeDataKey);
			//
			if (nodeData.hasOwnProperty('_init') && nodeData._init === 'true') {
				$.error('TreeNode aready initialized.');
			}
			// 初始化为收起状态
			node.addClass('collapsed');
			//
			if (nodeData.hasOwnProperty('_leaf') && nodeData._leaf) {
				node.addClass('leaf');
			}
			// 添加文字
			node.find('>.rowbox>.main>.text').append(nodeData._text);
			// 收起/展开图标
			node.find('>.rowbox>.main>.status-img').on('click', function(){
				methods.switchStatus.call(me, node);
			});
			
			// Checkbox
			if (data.checkbox) {
				node.find('>.rowbox>.main>.check-img')
					.removeClass('hide')
					.on('click', function(){
						methods._checkNode.call(me, node);
					}
				);
			}
			
			// 置为已初始化状态
			node.data(nodeDataKey, $.extend(nodeData, {_init: true}));
		},
		_checkNode: function(node) {
			var me = this;
			if (node.hasClass('checked')) {
				// uncheck self
				node.removeClass('checked');
				// uncheck children
				node.find('.node')
					.removeClass('checked')
					.removeClass('half-checked');
			} else if (node.hasClass('half-checked')) {
				node.removeClass('half-checked')
					.addClass('checked');
				// check all children
				node.find('.node')
					.removeClass('half-checked')
					.addClass('checked');
			} else { // none-checked
				node.addClass('checked');
				// check all children
				node.find('.node')
					.removeClass('half-checked')
					.addClass('checked');
			}
			// parents
			methods._resetParentsCheckStatus.call(me, node);
		},
		_resetParentsCheckStatus: function(node) {
			var me = this;
			node.parentsUntil(me, '.node').each(function(){
				var sel = $(this),
					nodeCnt = sel.find('.node').length,
					checkedCnt = sel.find('.checked').length;
				if (checkedCnt > 0) {
					if (checkedCnt == nodeCnt) {
						sel.removeClass('half-checked').addClass('checked');
					} else {
						sel.removeClass('checked').addClass('half-checked');
					}
				} else {
					sel.removeClass('checked')
						.removeClass('half-checked');
				}
			});
		}
	};
	
	$.fn.simpleTree = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method' + method + ' does not exist on jQuery.simpleTree');
		}
	};
	
})(jQuery);

/**
 * File Upload
 * 
 * Events: 
 */
(function($) {
	
	var dataKey = 'fileUpload';
	
	var defaults = {
		// 上传批号
		key: '',
		filePostName: 'file',
		flash: "js/swfupload/swfupload.swf",
		flash9: "js/swfupload/swfupload_fp9.swf",
		uploadButtonId: 'uploadButton',
		buttonImageUrl: 'images/upload.gif',
		buttonWidth: 90,
		buttonHeight: 30,
		success: function(swfupload, file, response) {},
		fileQueued: function(swfupload, file){}
	};
	
	var internalData = {
		swfupload: null
	};
	
	var methods = {
		init: function(options) {
			// handle params
			options = (typeof options === "object") ? options : {};
			//
			var $this = $(this),
				data = $this.data(dataKey);
				 
			// If the plugin has not been initialized yet
			if (!data) {
				data = $.extend({target: $this}, defaults, options, internalData);
				
				// init swf 
				data = $.extend(data, {
					swfupload: new SWFUpload({
						upload_url: data.url,
						flash_url: data.flash,
						flash9_url: data.flash9,
						button_placeholder_id: data.uploadButtonId,
						button_image_url: data.buttonImageUrl,
						button_width: data.buttonWidth,
						button_height: data.buttonHeight,
						button_text: "<span class='text'>上传</span>",
						button_text_style : ".text { color: #FFFFFF; font-size: 14px; }",
						button_text_left_padding : 40,
						button_text_top_padding : 6,
						button_cursor : SWFUpload.CURSOR.HAND,
						button_window_mode : SWFUpload.WINDOW_MODE.OPAQUE,
						file_post_name: data.filePostName,
						post_params: $.extend({}, {key: data.key}),
						upload_success_handler: function(file, server_data, response) {
							data.success.call($this, this, file, JSON.parse(server_data));
						},
						file_dialog_complete_handler: function(selectedCount, queuedCount, totalQueuedCount){
							methods.start.call($this);
						},
						file_queued_handler: function(file) {
							data.fileQueued.call($this, this, file);
						}
					})
				});
				
				$this.data(dataKey, data);
			}
			
			return $this.each(function() {
			});
		},
		key: function(k) {
			var data = this.data(dataKey);
			if (k) {
				this.data(dataKey, $.extend(data, {key: k}));
			} else {
				return data.key;
			}
		},
		// 开始上传
		start: function(fileId){
			var data = this.data(dataKey);
			data.swfupload.startUpload(fileId);
		}
	};
	
	$.fn.fileUpload = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method' + method + ' does not exist on jQuery.fileUpload');
		}
	};
})(jQuery);



/*
table show and hide
*/
(function($) {
	var data = {};
	var defaults = {
		tr_list: "tr.row",
		diplayUI: "a.display:first"
	};
	var methods = {
		init: function(options) {
			options = (typeof options === "object") ? options : {};
			data = $.extend(data, defaults, options);
			
			var that = this;
			that.find(data.tr_list).each(function(){
				$(this).find(data.diplayUI).click(function(){
					var tid  = null;
					var tr  = $(this).parent().parent();
					var lv  = tr.attr("level");
					
					if( $(this).text() == "hide" ){
						tr.nextAll().each(function(i,n){
							if( $(n).attr("level") > lv ){
								if( $(n)[0].style.display != "none" ) $(n).hide();
							}else{
								return false;
							}
						});
						$(this).addClass("td_show");
						$(this).text("show");
					}else{
						for(var i=tr.next().index();i<=that.find("tr").length;i++){
							if( that.find("tr").eq(i).attr("level") > lv ){
								if( tid == null ){
									that.find("tr").eq(i).show();
									if( that.find("tr").eq(i).find(data.diplayUI).text() == "show" ){
										tid = that.find("tr").eq(i).attr("level");
										continue;
									}
								}else{
									if( that.find("tr").eq(i).attr("level") > tid ){
										that.find("tr").eq(i).hide();
									}else{
										that.find("tr").eq(i).show();
										if( that.find("tr").eq(i).find(data.diplayUI).text() == "show" ){
											tid = that.find("tr").eq(i).attr("level");
											continue;
										}
										else tid = null;
									}
								}
							}else{
								break;
							}
						}
						$(this).removeClass("td_show");
						$(this).text("hide");
						
					}
				});
			});
			methods.check.call(that)
		},
		check: function(){
			this.find(data.tr_list).each(function(){
				var l = $(this).attr("level");
				if( l >= $(this).next().attr("level") || !$(this).next().attr("level") ) $(this).find("a.display:first").remove();
			});
		}
	};
	
	$.fn.displayTableChildren = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method' + method + ' does not exist on jQuery.dialog');
		}
	};
})(jQuery);

/* 表格滚动  */
(function($) {
	var data = {};
	var defaults = {
		thead: "thead",
		width: null,
		className: "",
		that: null
	};
	var methods = {
		init: function(options) {
			options = (typeof options === "object") ? options : {};
			data = $.extend(data, defaults, options);
			
			data.that = this;
			var tableDiv = this.find("table:first").parent();
			this.prepend('<div id="table_title" style="position:relative; overflow:hidden;"></div>');
			$("#table_title").css("height",data.height);
			$("#table_title").prepend('<table border="0" cellpadding="0" cellspacing="0" style="position:absolute;"></table>');
			if( data.className != "" ) $("#table_title").attr("class",data.className);
			$("#table_title table:first").prepend(data.that.find("thead:first"));
			$("#table_title table:first").append("<tbody></tbody>");
			$("#table_title table:first tbody:first").prepend(tableDiv.find("tbody:first").find("tr:first").clone());
			$("#table_title table:first").css("width",data.width);
			
			/*
			tableDiv.scroll(function(){
				$("#table_title")[0].scrollLeft = $(this).scrollLeft();
			})*/
			
			tableDiv.scroll(function(){
				$("#table_title table:first").css({
					"left": function(){
						return -(tableDiv.scrollLeft());
					}
				});
			})
		}
	};
	
	$.fn.tableTitleScroll = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method' + method + ' does not exist on jQuery.dialog');
		}
	};
})(jQuery);

/*
 * jQuery 9-Grid Scaling Plugin 0.9.3
 */
(function ($) {

    var supportsBorderImage = false;
    var borderImageStyle;

    // TODO: we should check webkit's version as well
	if($.browser){
		if ($.browser.safari) {
			supportsBorderImage = true;
			borderImageStyle = '-webkit-border-image';
		} else if ($.browser.mozilla
				// requires firefox 3.1 or greater
			&& $.browser.version.substr(0, 3) == "1.9"
			&& parseFloat($.browser.version.substr(3)) > 1.0) {
			supportsBorderImage = true;
			borderImageStyle = '-moz-border-image';
		}
	}

    $.fn.extend({

        scale9Grid: function (settings) {

            var gridTop = settings.top || 0;
            var gridBottom = settings.bottom || 0;
            var gridLeft = settings.left || 0;
            var gridRight = settings.right || 0;

            return $(this).each(function () {

                var $target = $(this);

                if ($target.data('layoutGrid')) {
                    $target.remove9Grid();
                }

                var backgroundImage = $target.css('background-image');
                var match = /url\("?([^\(\)"]+)"?\)/i.exec(backgroundImage);
                if (!match || match.length < 2) {
                    return;
                }
                var backgroundUrl = match[1];

                // ie6 breaks on a floated child with a staticly positioned parent
                if ($.browser.msie && $.browser.version < 7 && $target.css('float') != 'none' && $target.css('position') == 'static') {
                    $target.css('position', 'relative');
                }

                $target.wrapInner('<div class="s9gwrapper"></div>');
                var $wrapper = $target.find('.s9gwrapper');
                $wrapper.css({
                    'padding-left': $target.css('padding-left'),
                    'padding-right': $target.css('padding-right'),
                    'padding-top': $target.css('padding-top'),
                    'padding-bottom': $target.css('padding-bottom'),
                    'text-align': $target.css('text-align'),
                    'position': 'relative',
                    'z-index': '2',
                    'display': 'block',
                    'background-color': 'transparent',
                    'background-image': 'none'
                });

                $target.css({
                    'background-color': 'transparent',
                    'background-image': 'none',
                    'border-color': 'transparent',
                    'padding': '0',
                    'text-align': 'left'
                });

                var backgroundElement = document.createElement('div');
                $target.prepend(backgroundElement);
                var $background = $(backgroundElement);
                $background.css({
                    'position': 'relative',
                    'width': '0px',
                    'height': '0px',
                    'z-index': '0',
                    'display': 'block'
                });
                $background.addClass('s9gbackground');

                if (supportsBorderImage) {
                    var cssProperties = {
                        'border-width': gridTop + 'px ' + gridRight + 'px ' + gridBottom + 'px ' + gridLeft + 'px ',
                        'position': 'absolute'
                    }
                    cssProperties[borderImageStyle] = backgroundImage + ' ' + gridTop + ' ' + gridRight + ' ' + gridBottom + ' ' + gridLeft + ' stretch stretch';
                    $background.css(cssProperties);
                }

                var imageWidth;
                var imageHeight;

                var lastWidth = 0;
                var lastHeight = 0;

                var cells = new Array();

                var layoutGrid = function () {
                    var width = $target.innerWidth();
                    var height = $target.innerHeight();

                    if (width < gridLeft + gridRight || height < gridTop + gridBottom
                        || (width == lastWidth && height == lastHeight)) {
                        return;
                    }

                    if (supportsBorderImage) {
                        $background.css({
                            'width': width - gridLeft - gridRight + 'px',
                            'height': height - gridTop - gridBottom + 'px'
                        })
                        return;
                    }

                    lastWidth = width;
                    lastHeight = height;

                    var cellIndex = 0;
                    var existingCells = cells.length;

                    for (var y = 0; y < height;) {
                        var cellHeight;
                        var verticalPosition;
                        if (y == 0) {
                            verticalPosition = "top";
                            cellHeight = Math.min(imageHeight - gridBottom, height - gridBottom);
                        }
                        else if (y + imageHeight - gridTop >= height) {
                            verticalPosition = "bottom";
                            cellHeight = height - y;
                        }
                        else {
                            verticalPosition = "center";
                            cellHeight = Math.min(imageHeight - gridTop - gridBottom, height - y - gridBottom);
                        }

                        for (var x = 0; x < width; cellIndex++) {
                            var $cell;
                            if (cellIndex < existingCells) {
                                $cell = cells[cellIndex];
                            }
                            else {
                                cellElement = document.createElement('div');
                                $background.append(cellElement);
                                $cell = $(cellElement);
                                $cell.css({
                                    'position': 'absolute',
                                    'background-image': backgroundImage
                                });
                                cells.push($cell);
                            }

                            var cellWidth;
                            var horizontalPosition;
                            if (x == 0) {
                                horizontalPosition = "left";
                                cellWidth = Math.min(imageWidth - gridRight, width - gridRight);
                            }
                            else if (x + imageWidth - gridBottom >= width) {
                                horizontalPosition = "right";
                                cellWidth = width - x;
                            }
                            else {
                                horizontalPosition = "center";
                                cellWidth = Math.min(imageWidth - gridLeft - gridRight, width - x - gridRight);
                            }

                            $cell.css({
                                'left': x + 'px',
                                'top': y + 'px',
                                'width': cellWidth + 'px',
                                'height': cellHeight + 'px',
                                'background-position': verticalPosition + ' ' + horizontalPosition
                            });

                            x += cellWidth;
                        }
                        y += cellHeight;
                    }
                    for (var i = cellIndex; i < existingCells; i++) {
                        cells[i].remove();
                    }
                    cells.splice(cellIndex, cells.length - cellIndex);
                };

                var image = new Image();
                $(image).load(function () {
                    if (image.width < gridLeft + gridRight || image.height < gridTop + gridBottom) {
                        return; //invalid inputs
                    }
                    imageWidth = image.width;
                    imageHeight = image.height;
                    layoutGrid();
                    // TODO: should resize when the text size is changed also
                    // TODO: this event should be removed if the element is removed from the DOM
                    $(window).resize(layoutGrid);
                }).attr('src', backgroundUrl);

                $target.data('layoutGrid', layoutGrid);

            });
        },

        remove9Grid: function () {

            return $(this).each(function () {

                var $target = $(this);

                if (!$target.data('layoutGrid'))
                    return;

                $(window).unbind('resize', $target.data('layoutGrid'));

                // TODO: is there a better way to do this?
                $target.removeAttr('style');

                var content = $target.find('.s9gwrapper').contents();
                $target.prepend(content);

                $target.find('.s9gwrapper').remove();
                $target.find('.s9gbackground').remove();

                $target.removeData('layoutGrid');
            });
        }

    });

})(jQuery);




  function Unit(value){
	var val = value.toString();
	if(val.indexOf(",") != -1) {
		val = val.replace(/\,/g, "");
	}
	var pattern = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/i;
	if(pattern.test(val)) {
		return;
	}
	if(val != "") {
		//负号
		var minus = "";
		//整数部分
		var integer;
		if(val.indexOf(".") > 0) {
			if(minus != "") {
				integer = val.substr(1, val.indexOf(".") - 1);
			}else {
				integer = val.substr(0, val.indexOf("."));
			}
		}else {
			if(minus != "") {
				integer = val.substr(1);
			}else {
				integer = val.substr(0);
			}
		}
		
		//小数部分
		var decimals = "";

		//判断值是否含有小数点
		if(val.indexOf(".") == -1) {
			decimals = ".";
			for(var i = 0; i < 2; i++) {
				decimals += "0";
			}
		}else if(val.substr(val.indexOf(".")+1).length < 2) {
			var size;
			decimals = val.substr(val.indexOf("."));
			if(val.substr(val.indexOf(".")).length > 1) {
				size = 2 - val.substr(val.indexOf(".")+1).length;
			}else {
				size = 2 - val.substr(val.indexOf(".")+1).length;
			}
			for(var i = 0; i < size; i++) {
				decimals = decimals + "0";
			}
		}else if(val.substr(val.indexOf(".")+1).length == 2) {
			decimals = val.substr(val.indexOf("."));
		}
		
		
		//用来存储加,后的整数部分
		var commaStr = "";

		var allZero = true;
		//计数器
		var counter = 0;
		//整数长度
		var length = integer.length;
		for(var i = 0; i < length; i++) {
			if(integer[i] != "0") { 
				allZero = false;
			}
		}
		//
		if(allZero) {
			integer = "0";
		}
		for(var i = length-1; i >= 0; i--) {
			commaStr = integer.charAt(i) + commaStr;
			counter++;
			if(counter == 3) {
				counter = 0;
				if(i != 0) {
					commaStr = "," + commaStr;
				}
			}
		}
		val = minus + commaStr + decimals;

		return val;
	}
}
