(function ($){
	function Drag(element,options){
		this.defaults = {
			limit:false
		}
		$.extend(true,this.defaults,options);
		//自定义的权限要高  x这个属性是一个对象
		if( $.isPlainObject(this.defaults.x) || $.isPlainObject(this.defaults.y) ){
			this.defaults.limit = false;
		}		

		this.element = element;
		//拖拽的目标
		this.target = this.defaults.moveObj && $(this.defaults.moveObj) || this.element;

		this.disX = this.disY = 0;	

		this.dragStatus = 0;  //只调用这个方法，状态为0

		this.init();
	}

	Drag.prototype = {
		constructor:Drag,
		init:function (){
			//要改变this.downFn这个函数中的this指向,指向构造函数中this，
			//把this.downFn中this改变成当前init中的this
			this.element.on("mousedown",$.proxy(this.downFn,this));		
		},
		downFn:function (ev){
			
			//this 指向element
			this.disX = ev.pageX - this.target.offset().left;
			this.disY = ev.pageY - this.target.offset().top;
			this.dragStatus = 1;  //开始拖拽
			this.dragChangeStatusFn();

			$(document).on('mousemove',$.proxy(this.moveFn,this));
			$(document).on('mouseup',$.proxy(this.upFn,this));
			ev.preventDefault();

		},
		moveFn:function (ev){
			this.dragStatus = 2;  //正在拖拽
			this.x = ev.pageX - this.disX;
			this.y = ev.pageY - this.disY;

			if( this.defaults.limit ){ //限制在可视区范围
				
			}
			this.limitFn();

			this.target.css({
				left:this.x,
				top:this.y
			});
			this.dragChangeStatusFn();
		},
		upFn:function (){
			//会把指定绑定的事件所有的事件处理函数全部取消
			//$(document).off('mousemove mouseup');	
			$(document).off('mousemove',this.moveFn);	
			$(document).off('mouseup',this.upFn);	

			this.dragStatus = 3;  //拖拽完成

			this.dragChangeStatusFn();
		},
		dragChangeStatusFn:function (){
			switch( this.dragStatus ){
				case 1:
					this.element.trigger("dragStart");
				break;
				case 2:
					this.element.trigger("dragMove");
				break;
				case 3:
					this.element.trigger("dragOver");
				break;
			}
		},
		limitFn:function (){

			var minX = 0,maxX = 0,minY = 0,maxY = 0;

			if( this.defaults.limit ){
				//可视区宽度
				var clientW = $(window).width();
				var clientH = $(window).height();

				minX = 0;
				minY = 0;
				//元素的宽度
				maxX = clientW - this.element.outerWidth();
				maxY = clientH - this.element.outerHeight();
			}

			if( $.isPlainObject(this.defaults.x) ){
				minX = this.defaults.x.min;
				maxX = this.defaults.x.max;
			}
			if( $.isPlainObject(this.defaults.y) ){
				minY = this.defaults.y.min;
				maxY = this.defaults.y.max;
			}

			if( this.x < minX  ){
				this.x = minX;
			}
			if( this.x > maxX ){
				this.x = maxX;
			}
			if( this.y < minY  ){
				this.y = minY;
			}
			if( this.y > maxY  ){
				this.y = maxY;
			}	
		}
	}

	$.fn.drag = function (options){
		new Drag(this,options);
	}
		
})(jQuery);