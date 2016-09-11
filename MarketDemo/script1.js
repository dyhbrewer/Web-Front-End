var i=0;
//每1000毫秒调用一个func()函数
$(function(){
	var x=10;
	var y=20;
	var myInterval = setInterval("func()",2*1000);
	$("a.bigItems").mouseover(function(e){
		var tooltip="<div id='bigItems'><img src='"+this.href+"'</div>";
		$("body").append(tooltip);
		$("#bigItems")
			.css({
				"top":(e.pageY+x)+"px",
				"left":(e.pageX+y)+"px"
			}).show("fast");
	}).mouseout(function(){
		$("#bigItems").remove();
	}).mousemove(function(e){
		$("#bigItems")
			.css({
				"top":(e.pageY+x)+"px",
				"left":(e.pageX+y)+"px"
			});
	});

	$("ol li").click(function(){
		i=$(this).index();
		$(this).parent().children().removeClass("current");
		$(this).addClass("current");
		// var img=$(this).parent().parent().children("ul");
		// $(img).children().hidden();
		// $(img).children("li").eq(index).show();
		$("#img1").attr("src","pic-"+getIndex(i)+".jpg");
	});

});
function getIndex(index){
	if (index>=3) {
		return index % 3;
	}
	else{
		return index;
	}
}
function func(){
	//利用attr对image的src属性进行修改
	$("#img1").attr("src","pic-"+getIndex(i)+".jpg");

	$("ol").find("li").eq(getIndex(i)).addClass("current").siblings().removeClass("current");
	i++;
	
}