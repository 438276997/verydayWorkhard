(function($){
	function Dialog(options){
		options = options || {};
		var defaults = {
			width:options.width || 'auto',
			height:options.height || 'auto',
			title:options.title || '这是一个弹框',
			content:options.content || '这是一个弹框,请写内容',
		}
		$("#drag").html("<h2>"+defaults.title+"</h2><div>"+defaults.content+"</div><input class='lefts' type='button' value='确定'><input class='rights' type='button' value='取消'>")
		$("#drag").css({
			width:defaults.width,
			height:defaults.height
		})
		//#drag ,下面的input
		$("#drag input").on("click",function(){
			$("#drag").hide()
			$("#mask").hide()
		})
	}
	$.fn.dialog = function (options){
		
		new Dialog(options);
	}
})(jQuery)