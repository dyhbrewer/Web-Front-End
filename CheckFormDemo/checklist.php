<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>获取值</title>
	</head>
	<body>
		<?php 
			$username=$_POST["username"];
			$password=$_POST["password"];
			$password2=$_POST["password2"];
			$city=$_POST["city"];
			$sex=$_POST["sex"];
			$like=$_POST["like"];
			echo "用户名是：".username."<br/>";
			echo "密码是：".password."<br/>";
			echo "确认密码：".password2."<br/>";
			echo "所在城市：".city."<br/>";
			echo "性别：".sex."<br/>";
			echo "爱好：".like."<br/>";
		?>
	</body>
</html>
