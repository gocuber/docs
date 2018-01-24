
// 导航菜单
$(document).click(function(){
	$('.cube-nav-dropdown-menu').slideUp();
});
$('.cube-nav-dropdown > a').click(function(e){
    e.stopPropagation();
	$('.cube-nav-dropdown-menu').slideToggle();
});
$('.cube-nav-toggle').click(function(){
	$('.cube-navbar').slideToggle();
});
$(window).resize(function() {
	if($(window).width() >= 768){
		$('.cube-navbar').removeAttr('style');
	}
});
// end 导航菜单

// 返回顶部
$(function(){
	$(window).scroll(function(){
		if($(window).scrollTop()>100){
			$('.cube-top').fadeIn(500);
		}else{
			$('.cube-top').fadeOut(500);
		}
	});
	$('.cube-top').click(function(){
		$('body,html').animate({scrollTop:0},500);
	});
});

// 字符串扩充方法
String.prototype.slash = function(){
	return this.replace(/^[\/]+|[\/]+$/g, '');
};
String.prototype.leftSlash = function(){
	return this.replace(/^[\/]+/g, '');
};
String.prototype.rightSlash = function(){
	return this.replace(/[\/]+$/g, '');
};
