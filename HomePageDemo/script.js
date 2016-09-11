$(document).ready(function(){
	$("#play").click(function(){
		$("#videoShow").removeClass("hide");
	});
	$("#close").click(function(){
		$("#videoShow").addClass("hide");
	});

	$("#signin,button").click(function(){
		var sHeight = $(document).height();
		var sWidth = $(document).width();
		var wheight = $(window).height();
		var divMask = $("<div></div>");
		$("body").append(divMask);
		divMask.attr("id","mask").css({
			"background": "#000",
			"opacity": "0.75",
			"filter": "alpha(opacity=75)",
			"height": sHeight,
			"width": sWidth,
			"z-index": "1000",
			"position": "absolute",
			"left": "0",
			"top": "0"
		});
		
		var loginWindow = $("<div></div>");
		$("body").append(loginWindow);
		loginWindow.attr("id","login_window").css({
			"height": "360px",
			"width": "400px",
			"background-color": "#fff",
			"z-index": "1001",
			"position": "fixed",
			"top": (wheight - 400) / 2,
			"left": (sWidth - 400) / 2
		});
		
		var closeLoginWindow = $("<p>X</p>");
		$("#login_window").append(closeLoginWindow);
		closeLoginWindow.attr("id","close_login_window").css({
			"font-size": "28px",
			"font-weight": "700",
			"margin": "0",
			"position": "absolute",
			"top": "5px",
			"right": "10px",
			"cursor": "pointer"
		});
		
		var loginForm = $("<form></form>");
		var inputUserName = $("<input type='text' placeholder='User name' name='username'>");
		var inputPassword = $("<input  type='password' placeholder='Password' name='password'>");
		var inputSubmit = $("<input type='submit' value='Log in'>");
		
		inputSubmit.attr("id","submit");
		$("#login_window").append(loginForm);
		loginForm.attr("id","login_form").css({
			"padding": "80px 0 0 40px"
		});
		$("#login_form").append(inputUserName);
		inputUserName.css({
			"margin": "5px",
			"width": "300px",
			"height": "30px",
			"display": "block"
		});
		
		$("#login_form").append(inputPassword);
		inputPassword.css({
			"margin": "5px",
			"width": "300px",
			"height": "30px",
			"display": "block"
		});
		
		$("#login_form").append(inputSubmit);
		inputSubmit.css({
			"margin": "5px",
			"display": "block"
		});
		
		$("#login_form").validate({
			//debug: true,
			rules: {
				username: {
					required: true,
					minlength: 2,
					maxlength: 16
				},
				password: {
					required: true,
					minlength: 6,
					maxlength: 16
				}
			},
			
			submitHandler: function(form){
				$.ajax({
					url: "#",
					dataType: "json",
					type: "POST",
					data: $('#login_form').serialize(),
					success:function(data){
						$("#mask").remove();
						$("#login_window").remove();
					}
				})
			}
		});
	});
	$("body").on("click","#mask,#close_login_window",function(){
		$("#mask").remove();
		$("#login_window").remove();
	});
});