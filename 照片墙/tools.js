var tools = {

	//////////////////  给数组排序 冒泡排序 ///////////////////////////

	bubbleSort:function (arr){
	 	/*arr	传入一个数组*/
		var middleNum;
		for (var j = 0; j < arr.length; j++) {
			var onOff = true;
			for (var i = 0; i < arr.length; i++) { //每循环一次，找到一个最大数
				if(arr[i] > arr[i+1]){
					middleNum = arr[i+1];
					arr[i+1] = arr[i];
					arr[i] = middleNum;
					onOff = false;
				}
			}
			if(onOff){		//如果onOff为true，则证明没有走入上面的if里，证明没有能更换位置的元素了
				break;
			}
		}
		return arr;
	},

	//////////////////  获取元素 ///////////////////////////

	$:function (sle,con){
		con = con || document;
		var str0 = sle.charAt(0);
		var sle1 = sle.substring(1);
		if(str0 === "#"){
			return document.getElementById(sle1);
		}else if(str0 === "."){
			return con.getElementsByClassName(sle1);
		}else{
			return con.getElementsByTagName(sle);
		}
	},

	//////////////////  获取元素的某个样式  ///////////////////////////

	getStyle:function (obj,attr){
		if( obj.currentStyle ){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj)[attr];
		}	
	},

	//////////////////  查找 class ///////////////////////////

	hasClass:function (element,classNames) {		
		/*
		element ：元素对象	(Object)
		classNames：需要被查找的class	（String）
		如果有，返回true，如果没有返回false
		*/
		var classAll = 	element.className.split(" ");  	//获取到element所有的class，并切割成数组
		for( var i = 0; i < classAll.length; i++ ){		//遍历class数组	
			if( classAll[i] === classNames ){			//如果class数组中存在classNames
				return true;							//则返回true
			}
		}
		return false;									//否则返回false
	},

	//////////////////  删除 class ///////////////////////////

	removeClass:function (element,classNames){
		/*
		element ：元素对象	(Object)
		classNames：需要被查找的class	（String）
		*/
		if( tools.hasClass(element,classNames) ){  			//如果element中有classNames
			var classAll = element.className.split(" "); 	//获取到element所有的class，并切割成数组
			for( var i = 0; i < classAll.length; i++ ){		//遍历class数组
				if( classAll[i] === classNames ){			//如果class数组的第i个数据等于classNames
					classAll.splice(i,1);					//则删除class数组中这个classNames
					i--;									//当删除了一个数据后，数组少一个数据，所有i同时减1
				}
			}
			if( classAll.length === 0 ){					//如果这个数组为空
				element.removeAttribute("class");			//删除标签上的class这个属性
			}else{
				element.className = classAll.join(" ");		//否则element的class等于被删除后的数组转为class
			}
			

		}
	},

	//////////////////  添加 class ///////////////////////////

	addClass:function (element,classNames){
		/*
		element ：元素对象	(Object)
		classNames：需要被查找的class	（String）
		*/
		var classAll = element.className;  					//获取到element的所有class
		if( !tools.hasClass(element,classNames) ){			//如果className不存在
			classAll += " " + classNames;					//则在classAll中添加新的classNames
		}
		element.className = classAll.trim();				//赋值给元素的class时，去掉首尾空格
	},

	//////////////////  转换 class ///////////////////////////

	toggleClass:function (element,classNames){	
		/*
		element ：元素对象	(Object)
		classNames：需要被查找的class	（String）
		如果是删除，返回false
		如果是添加，返回true
		*/			
		if( tools.hasClass(element,classNames) ){			//如果element中有classNames
			tools.removeClass(element,classNames);			//则删除这个classNames
			return false;									//返回false
		}else{
			tools.addClass(element,classNames);				//否则添加这个classNames
			return true;									//返回true
		}	
	},

	//////////////////  在某元素后插入元素 ///////////////////////////

	insertAfter: function(newElement,targetElement){
		var parent = element.parentNode;							//获取到element的父节点
		if( targetElement === parent.lastElementChild ){			//如果目标元素为最后一个元素节点
			parent.appendChild(newElement)							//则在父级下的末尾追加一个子节点newElement
		}else{
			parent.insertBefore(newElement,targetElement.nextElementSibling);	//否则，在目标元素的下一个兄弟元素前插入newElement
		}
	},

	//////////////////  获取页面被卷曲的、宽度 ///////////////////////////

	scroll: function(){
		return {
			H: document.documentElement.scrollTop || document.body.scrollTop,
			W: document.documentElement.scrollLeft || document.body.scrollLeft
		}
	},

	//////////////////  获取滚动条的宽度 ///////////////////////////

	scrollW: function (ele){
		/*ele 需要获取滚动条宽度的元素*/
		var div = document.createElement("div");
		div.style.overflow = "scroll";
		ele.appendChild(div);
		var w = ele.clientWidth - div.clientWidth; 	//父级的内容宽度-div的内容宽度
		ele.removeChild(div);
		return w;
	},

	//////////////////  获取视口的宽度、高度 ///////////////////////////
	
	view: function (){
		return {
			W:document.documentElement.clientWidth,
			H:document.documentElement.clientHeight
		}
	},

	//////////////////  获取视口的宽度、高度 ///////////////////////////
	
	mouseWheel: function (element,upFn,downFn){
		/*
		element ：元素对象	(Object)
		upFn：滚轮向上触发的函数	
		downFn：滚轮向下触发的函数
		*/	
		element.onmousewheel = wheelFn;			//鼠标中键滚动时 （适用ie 、chrome）
		if(element.addEventListener){			//当条件满足时，排除了ie低版本
			element.addEventListener("DOMMouseScroll",wheelFn,false);	//鼠标中键滚动时 （适用火狐）
		}
		function wheelFn(ev){										
			var direction = true;			//声明一个变量记录方向，true为上，false为下
			if(ev.wheelDelta){				//如果满足条件，证明在ie高版本 、chrome下
				direction = ev.wheelDelta > 0 ? true : false;
			}else if(ev.detail){			//如果满足条件，证明在FF下
				direction = ev.detail < 0 ? true : false;
			}
			if(direction){
				typeof upFn === "function" && upFn.call(element,ev);
			}else{
				typeof downFn === "function" && downFn.call(element,ev);
			}
			ev.preventDefault();
		} 
	},

	//////////////////  检测碰撞 ///////////////////////////
	
	duang: function (moveEle, fixedEle){
		/*
		moveEle ：移动的元素	(Object)
		fixedEle：被碰撞的元素	(Object)
		返回值： 
		true： 被碰撞上
		false： 未被碰撞
		*/	
		moveEle.boxObj = moveEle.getBoundingClientRect();
		fixedEle.boxObj = fixedEle.getBoundingClientRect();
		
		if(moveEle.boxObj.right < fixedEle.boxObj.left || moveEle.boxObj.left > fixedEle.boxObj.right || moveEle.boxObj.bottom < fixedEle.boxObj.top || moveEle.boxObj.top > fixedEle.boxObj.bottom ){
			return false;
		}else{
			return true;
		}
	}

}