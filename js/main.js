$(function() {

    function resize() {
        var winWidth = $(window).width();
        var isSmallScreen = winWidth > 768;


        $(".carousel-inner img").each(function(i, img) {
            var img_src = $(img).data(isSmallScreen ? "lg" : "xs");
            $img = $(img);
            $img.attr("src", img_src);
            $img.css({
                "height": isSmallScreen ? "410px" : "auto",
                "width": "100%"
            });
        });
    }

    $(window).on("resize", resize).trigger("resize");

    //  初始化工具弹出框
    $('[data-toggle="tooltip"]').tooltip();


	function onScroll(){
		// 动态获取屏幕宽度
		var winWidth = $(window).width();
		//  获取包裹选项卡的宽度
	    var width = 30 //初始化宽度，将padding,border的值估算在内
	    $(".nav-tabs").children().each(function(index, element) {
	        width += element.clientWidth;
	    });
	    // 如果当前宽度超过屏幕宽度，设置滚动条
	    if (width > winWidth) {

	        $(".nav-tabs").css("width", width).parent().css("overflow-x","scroll");
	    }else{
			$(".nav-tabs").css("width",$(".container").width()).parent().css("overflow-x","");
		}
	}

	$(window).on("resize",onScroll).trigger("resize");

	// 切换新闻标题
	$("#news .nav-pills a").on("click",function(){
		var title = $(this).data("title");
		$("#news .title").text(title);
	});


	// 控制轮播图的左右滑动
	// 1、获取手指滑动开始的坐标
	var startX = 0;
	$(".carousel").on("touchstart",function(event){

		startX = event.originalEvent.touches[0].clientX;
	});
	// 2、获取手指离开屏幕前的坐标
	var endX = 0;
	$(".carousel").on("touchmove",function(event){
		endX = event.originalEvent.touches[0].clientX;
	});

	// 3、定义手指横向滑动的距离阈值
	var distance = 50;

	// 4、判断左右滑动
	$(".carousel").on("touchend",function(){
		var offset = Math.abs(endX - startX);
		if(distance < offset){
			$(this).carousel(startX > endX? "next":"prev");
		}
	});

});
