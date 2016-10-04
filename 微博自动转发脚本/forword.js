//转发微博，并评论
function forwardWweibo(content,retcode){
	var formData = new FormData();
	formData.append('pic_src','');
	formData.append('pic_id','');
	formData.append('appkey','');
	formData.append('mid','4026102294673377');
	formData.append('style_type','1');
	formData.append('mark','');//mark need
	formData.append('reason',content);
	formData.append('location','v6_content_home');
	formData.append('pdetail','');
	formData.append('module','');
	formData.append('page_module_id','');
	formData.append('refer_sort','');
	formData.append('rank','0');
	formData.append('rankid','');
	formData.append('_t','0');
	formData.append('retcode',retcode || '')

	var xhr = new XMLHttpRequest();
	xhr.timeout = 3000;
	xhr.responseType = "text";
	xhr.open('POST','http://weibo.com/aj/v6/mblog/forward?ajwvr=6&domain=3692314137&__rnd=1475562816984')
	xhr.onload = function(e){
		if (this.status == 200 || this.status ==304) {
			var data = JSON.parse(this.responseText);
			if (data.code == "100000") {
				//转发微博成功
				console.log(content);
			}else if (data.code == "100027"){
				//转发微博失败，需要回答图片验证码的问题
				console.log(data);
			}else {
				console.log(data);
			}
		};
	}
	xhr.send(formData);
}
//每5秒转发一次
var count = 35000;
setInterval(function(){
	forwardWweibo(count++);
},10000);