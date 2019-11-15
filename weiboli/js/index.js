//主轮播图
		$(".banner-main").banner({
			imgs:$(".banner-main").find("img"),  //必传
			// left:$(".banner-main").find("#left"),  //左按钮 可选
			// right:$(".banner1").find("#right"),  //右按钮 可选
			list:true,  //轮播图下的小圆点 可选 默认要
			autoPlay:true, //是否自动轮播 可选 默认要
			delayTime:2000//可选 图片播放时间间隔
		})
		
		//轮播图3
		$(".lunbo3").banner({
			imgs:$(".lunbo3").find("li"),  //必传
			// left:$(".banner-main").find("#left"),  //左按钮 可选
			// right:$(".banner1").find("#right"),  //右按钮 可选
			list:false,  //轮播图下的小圆点 可选 默认要
			autoPlay:true, //是否自动轮播 可选 默认要
			delayTime:2000, //可选 图片播放时间间隔
			moveTime:200 //可选 图片移动的时间
		})
		
		//轮播图2
		$(".lunbo2").banner({
			imgs:$(".lunbo2").find("li"),  //必传
			// left:$(".banner-main").find("#left"),  //左按钮 可选
			// right:$(".banner1").find("#right"),  //右按钮 可选
			list:false,  //轮播图下的小圆点 可选 默认要
			autoPlay:true, //是否自动轮播 可选 默认要
			delayTime:2000, //可选 图片播放时间间隔
			moveTime:2000 //可选 图片移动的时间
		})
		
		//导航列表
		$(".menubox").children(".list1").children("li").hover(function(){
			//这里的this就是点击的当前元素 相当于e
			$(this).addClass("active").siblings().removeClass("active");
			$(this).children("dl").css("display","none").eq($(this).index()).css("display","block");
			$(this).children("dl").css("display","block");
		},function(){
			$(this).removeClass("active").siblings().removeClass("active");
			$(this).children("dl").css("display","none").eq($(this).index()).css("display","none");
			$(this).children("dl").css("display","none");
		})
		
		//登录
		$(".notice").children("ul").children("li").click(function(){
			$(this).addClass("active-notice").siblings().removeClass("active-notice");
			$(".cont").children("p").css("display","none").eq($(this).index()).css("display","block")
		})

	//<!-- 商品选项卡 -->
		//潮流穿搭
		$(".dress-title").children("ul").children("li").click(function(){
			$(this).addClass("active").siblings().removeClass("active");
			$(".goods-dress").children("div").css("display","none").eq($(this).index()).css("display","block")
		})
		
		//居家生活
		$(".live-title").children("ul").children("li").click(function(){
			$(this).addClass("active").siblings().removeClass("active");
			$(".goods-live").children("div").css("display","none").eq($(this).index()).css("display","block")
		})
		
		//母婴育儿
		$(".baby-title").children("ul").children("li").click(function(){
			$(this).addClass("active").siblings().removeClass("active");
			$(".goods-baby").children("div").css("display","none").eq($(this).index()).css("display","block")
		})

	
	//<!-- 渲染商品列表 -->
	
		class List{
			constructor(options) {
				this.url = options.url;
				this.goods = options.goods;
				this.imgs = options.imgs;
				this.i = options.start;
				this.num = options.num;
				
				this.load();
			}
			load(){
				var that = this;
				ajaxGet(this.url,function(res){
					that.res = JSON.parse(res);
					that.display();
				})
			}
			display(){
				var str = "";
				for(var i = this.i;i<this.num;i++){
					str += `<dd>
								<a href="">
									<img src="${this.res[i].img.img1}" />
									<i>${this.res[i].name}</i>
									<p>
										<span>￥${this.res[i].price}</span>&nbsp;&nbsp;
										<i>原价：￥${this.res[i].introduce.priceold}</i>
									</p>
								</a>
							</dd>
							`;
				}
				str =`<dt><a><img src="${this.imgs}"/></a></dt>` + str;
				this.goods.innerHTML = str;
			}
		}
		//女装
		new List({
			url:"http://localhost/weiboli/json/goods.json",
			goods:document.querySelector(".goods1"),
			imgs:"imgs/11.png",
			start:0,
			num:8
		})
		//男装
		new List({
			url:"http://localhost/weiboli/json/goods.json",
			goods:document.querySelector(".goods2"),
			imgs:"imgs/11.png",
			start:2,
			num:10
		})
		//鞋包
		new List({
			url:"http://localhost/weiboli/json/goods.json",
			goods:document.querySelector(".goods3"),
			imgs:"imgs/11.png",
			start:3,
			num:11
		})
		//配饰
		new List({
			url:"http://localhost/weiboli/json/goods.json",
			goods:document.querySelector(".goods4"),
			imgs:"imgs/11.png",
			start:4,
			num:12
		})
		//美食特产
		new List({
			url:"http://localhost/weiboli/json/goods.json",
			goods:document.querySelector(".live1"),
			imgs:"imgs/hotbag.png",
			start:5,
			num:13
		})
		//数码家电
		new List({
			url:"http://localhost/weiboli/json/goods.json",
			goods:document.querySelector(".live2"),
			imgs:"imgs/hotbag.png",
			start:6,
			num:14
		})
		//家居日用
		new List({
			url:"http://localhost/weiboli/json/goods.json",
			goods:document.querySelector(".live3"),
			imgs:"imgs/hotbag.png",
			start:7,
			num:15
		})
		//美容护肤
		new List({
			url:"http://localhost/weiboli/json/goods.json",
			goods:document.querySelector(".live4"),
			imgs:"imgs/hotbag.png",
			start:8,
			num:16
		})
		//母婴育儿
		new List({
			url:"http://localhost/weiboli/json/goods.json",
			goods:document.querySelector(".baby1"),
			imgs:"imgs/baby.png",
			start:4,
			num:12
		})
		//综合商品
		new List({
			url:"http://localhost/weiboli/json/goods.json",
			goods:document.querySelector(".baby2"),
			imgs:"imgs/baby.png",
			start:3,
			num:11
		})
		
	
	//<!-- 楼层 -->
	
		$(".building").children("p").click(function(){
				$("html").animate({
					scrollTop:$(".build").eq($(this).index()).offset().top
				})
			})