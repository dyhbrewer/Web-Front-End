$(document).ready(function(){  //等待DOM加载完毕，得加上

	$(".addBtn").click(function(){
		var num=$("input").val();
		var pay=num*195;
		var img="<img src='cart-icon.jpg'/>"
		$("#right").append("<div id='pay'>"+img+"<span id='cartNum'>Cart- "+num+"item</span>"+"<span id='numPay'>$"+pay+"</span></div>");
	});
});