
/**
 * 用户中心接口
 */
function UApi(){

	var apiUrl    = G.apiUrl;
	var cookieKey = G.cookieKey || '';
	var authKey   = 'authOO11lll1ll1llll11OOO00OO00O0OO00OOO0O0O0';
	var publicKey = G.publicKey || '';

	var api = function(param){

		param.data.request_time = new Date().getTime();
		//param.data.auth = $.cookie(authKey);

	  $.ajax({
        type     : 'POST',
        dataType : 'jsonp',
		cache    : false,
        url      : apiUrl + param.url.leftSlash(),
        data     : param.data,
        success  : param.success,
        error    : function(http,msg,obj){console.log({h:http,m:msg,o:obj});}
      });
	};

	var setCookie = function(data){
		//$.cookie(cookieKey, data, {expires:7,path:'/',domain:G.cookieDomain});
		//$.cookie(cookieKey, data, {expires:7,path:'/'});
		//$.cookie(authKey, data, {expires:7,path:'/'});
	};
	var delCookie = function(data){
		//$.cookie(cookieKey, null);
		//$.cookie(authKey, null);
	};

	var cmdEncrypt = function(str){
      setMaxDigits(131);
      var key = new RSAKeyPair("10001", '', publicKey);
      return encryptedString(key, str);
    };

	// 用户注册
	this.register = function(){

		var username      = $('#form-username').val();
		var password      = $('#form-password').val();
		var yes_password  = $('#form-yes_password').val();
		var email         = $('#form-email').val();
		var nickname      = $('#form-nickname').val();
		var mobile        = $('#form-mobile').val();
		var authcode      = $('#form-authcode').val();

		if('' == username || username.length < 5 || username.length > 80){
			alert('用户名不能为空，且长度在5~80个字符之间');
			return false;
		}
		if('' == password || password.length < 6){
			alert('密码不能为空，且长度不能少于六位');
			return false;
		}
		if(password != yes_password){
			alert('确认密码错误');
			return false;
		}
		if('' == email){
			alert('邮箱不能为空');
			return false;
		}
		if('' == authcode){
			alert('验证码错误');
			return false;
		}

	  api({
        url     : '/user/register/',
        data    : {
			'username':username,
			'password':cmdEncrypt(password),
			'yes_password':cmdEncrypt(yes_password),
			'email':email,
			'nickname':nickname,
			'mobile':mobile,
			'authcode':authcode
		},
        success : function(data){
			if(1 == data.code){
				setCookie(data.data.auth);
				alert('恭喜您已注册成功');
				window.location.href = G.cubeUrl + 'ucenter/';
			}else{
				$('#img-authcode').attr('src',G.apiUrl+'index/showcode/'+new Date().getTime());
				alert(data.msg);
			};
			console.log(data); //JSON.stringify(param.data)
		}
      });
	};

	// 登录
	this.login = function(){
		
		var username      = $('#form-username').val();
		var password      = $('#form-password').val();
		var authcode      = $('#form-authcode').val();

		if('' == username || username.length < 5 || username.length > 80){
			alert('用户名错误');
			return false;
		}
		if('' == password || password.length < 6){
			alert('密码错误');
			return false;
		}
		if('' == authcode){
			alert('验证码错误');
			return false;
		}

	  api({
        url     : '/user/login/',
        data    : {
			'username':username,
			'password':cmdEncrypt(password),
			'authcode':authcode
		},
        success : function(data){
			if(1 == data.code){
				setCookie(data.data.auth);
				alert('您已登录成功');
				window.location.href = G.cubeUrl + 'ucenter/';
			}else{
				$('#img-authcode').attr('src',G.apiUrl+'index/showcode/'+new Date().getTime());
				alert(data.msg);
			};
			console.log(data);
        }
      });
	};
	
	// 退出登录
	this.logout = function(){
	  api({
        url     : '/user/logout/',
        data    : {},
        success : function(data){
			if(1 == data.code){
				delCookie();
				alert('您已退出登录');
				window.location.href = G.cubeUrl;
			}else{
				alert(data.msg);
			};
			console.log(data);
        }
      });
	};
	
	// 重置密码
	this.resetPassword = function(){

		var email         = $('#form-email').val();
		var password      = $('#form-password').val();
		var yes_password  = $('#form-yes_password').val();
		var authcode      = $('#form-authcode').val();

		if('' == email){
			alert('邮箱不能为空');
			return false;
		}
		if('' == password || password.length < 6){
			alert('新密码不能为空，且长度不能少于六位');
			return false;
		}
		if(password != yes_password){
			alert('确认密码错误');
			return false;
		}
		if('' == authcode){
			alert('验证码错误');
			return false;
		}

	  api({
        url     : '/user/resetpassword/',
        data    : {
			'email':email,
			'password':cmdEncrypt(password),
			'yes_password':cmdEncrypt(yes_password),
			'authcode':authcode
		},
        success : function(data){
			if(1 == data.code){
				alert('重置密码成功，我们已发送确认邮件到您的邮箱，请进入邮箱点击激活链接');
			}else{
				alert(data.msg);
			};
			console.log(data);
        }
      });
	};
	
	// 修改信息
	this.editInfo = function(){

		var email         = $('#form-email').val();
		var nickname      = $('#form-nickname').val();
		var name          = $('#form-name').val();
		var mobile        = $('#form-mobile').val();

		if('' == email){
			alert('邮箱不能为空');
			return false;
		}
		if('' == nickname){
			alert('昵称不能为空');
			return false;
		}

	  api({
        url     : '/user/editinfo/',
        data    : {
			'email':email,
			'nickname':nickname,
			'name':name,
			'mobile':mobile
		},
        success : function(data){
			if(1 == data.code){
				alert('修改信息成功');
			}else{
				alert(data.msg);
			};
			console.log(data);
        }
      });
	};
	
	// 修改密码
	this.editPassword = function(){

		var curr_password = $('#form-curr_password').val();
		var password      = $('#form-password').val();
		var yes_password  = $('#form-yes_password').val();

		if('' == curr_password || curr_password.length < 6){
			alert('当前密码错误');
			return false;
		}
		if('' == password || password.length < 6){
			alert('新密码不能为空，且长度不能少于六位');
			return false;
		}
		if(password != yes_password){
			alert('确认密码错误');
			return false;
		}

	  api({
        url     : '/user/editpassword/',
        data    : {
			'curr_password':cmdEncrypt(curr_password),
			'password':cmdEncrypt(password),
			'yes_password':cmdEncrypt(yes_password)
		},
        success : function(data){
			if(1 == data.code){
				alert('修改密码成功');
			}else{
				alert(data.msg);
			};
			console.log(data);
        }
      });
	};
	
	// 修改用户名
	this.editUsername = function(){

		var username = $('#form-username').val();

		if('' == username || username.length < 5 || username.length > 80){
			alert('用户名不能为空，且长度在5~80个字符之间');
			return false;
		}

	  api({
        url     : '/user/editusername/',
        data    : {
			'username':username
		},
        success : function(data){
			if(1 == data.code){
				alert('修改用户名成功');
			}else{
				alert(data.msg);
			};
			console.log(data);
        }
      });
	};

	// 意见反馈
	this.feedback = function(){

		var username = $('#form-username').val();

		if('' == username || username.length < 5 || username.length > 80){
			alert('用户名不能为空，且长度在5~80个字符之间');
			return false;
		}

	  api({
        url     : '/user/feedback/',
        data    : {
			'username':username
		},
        success : function(data){
			if(1 == data.code){
				alert('您的意见我们已经收到，感谢您的反馈！');
			}else{
				alert(data.msg);
			};
			console.log(data);
        }
      });
	};

};
var UserApi = new UApi();

$(document).ready(function(){

	// 验证码 看不清 换一张
	$('#btn-authcode,#img-authcode').click(function(){
		$('#img-authcode').attr('src',G.apiUrl+'index/showcode/'+new Date().getTime());
	});
	// 注册
	$('#btn-register').click(function(){
		UserApi.register();
	});
	// 登录
	$('#btn-login').click(function(){
		UserApi.login();
	});
	// 退出
	$('#btn-logout').click(function(){
		UserApi.logout();
	});
	// 重置密码
	$('#btn-resetpassword').click(function(){
		UserApi.resetPassword();
	});
	// 修改信息
	$('#btn-editinfo').click(function(){
		UserApi.editInfo();
	});
	// 修改密码
	$('#btn-editpassword').click(function(){
		UserApi.editPassword();
	});
	// 修改用户名
	$('#btn-editusername').click(function(){
		UserApi.editUsername();
	});
	// 意见反馈
	$('#btn-feedback').click(function(){
		UserApi.feedback();
	});

});