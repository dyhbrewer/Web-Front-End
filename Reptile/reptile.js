var request = require('request');//引入request
var cheerio = require('cheerio');//引入cheerio
var path = require('path');//引入path模块
var fs = require('fs');//引入文件系统

var requr1 = 'http://www.mzitu.com/share/comment-page-1';
request(requr1,function(error,response,body){
	if(!error && response.statusCode == 200){
		//console.log(body);//返回请求页面的HTML
		acquireData(body);
	}
});

function acquireData(data) {
	var $ = cheerio.load(data);//cheerio解析data

	var meizi = $('li img').toArray();//将所有的img放到数组
	console.log(meizi.length);
	var len = meizi.length;
	for (var i=0; i<len; i++) {
		var imgsrc = meizi[i].attribs.src;//用循环获取每个图片地址
		//console.log(imgsrc);
		var filename = parseUrlForFileName(imgsrc);//生成文件名
		downloadImg(imgsrc,filename,function(){
			console.log(filename+' done');
		});
	}
}

//调用path模块中的basename方法解析文件名
function parseUrlForFileName(address) {
	var filename = path.basename(address);
	return filename;
}

//request模块的head方法来下载，请求到图片再调用fs文件系统模块中的createWriteStream来下载到本地目录
var downloadImg = function(url,filename,callback){
	request.head(url,function(err,res,body){
		//console.log('content-type:',res.headers['content-type']);//返回图片类型
		//console.log('content-length:',res.headers['content-length']);//返回图片大小
		if(err){
			console.log('err:'+err);
			return false;
		}
		//console.log('res:'+res);
		request(url).pipe(fs.createWriteStream('images/'+filename)).on('close',callback);//使用pipe下载到images文件夹下
		});
}