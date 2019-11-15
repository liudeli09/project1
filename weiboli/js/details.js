$("#header").load("http://localhost/weiboli/html-public/header.html");
$("#footer").load("http://localhost/weiboli/html-public/footer.html");
	
	
	//<!-- details -->
	
	class Detail{
	constructor(options){
		this.url = options.url;
		this.tbody = options.tbody;

		this.load();

		this.addEvent();

	}
	
	load(){
		var that = this;
		ajaxGet(this.url,function(res){
			that.res = JSON.parse(res);
			// 2.读取到cookie
			that.getCookie();
		})
	}
	getCookie(){
		this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
		// 3.拿到cookie中的id与所有商品数据的id做比较
		this.display();
		//console.log(this.goods)
	}
	display(){
		var str = "";
		for(var i=0;i<this.res.length;i++){
			for(var j=0;j<this.goods.length;j++){
				if(this.res[i].id == this.goods[this.goods.length-1].id){
					// 4.相同了，渲染这个数据（就是添加到购物车的商品）
					str += `<h3>${this.res[i].name}</h3>
	<div class="goods-main">
		<div class="goods-l">
			<div id = "wrap">
				<img src="${this.res[i].img.img2}" />
				<img src="${this.res[i].img.img1}" />
				<div class="box"></div>
			</div>
			<div id="bigArea">
				<img class="da" src = "${this.res[i].img.img2}"/>
				<img src = "${this.res[i].img.img1}"/>
			</div>
			<ul>
				<li class="act" ><img src="${this.res[i].img.img2}"/></li>
				<li><img src="${this.res[i].img.img1}"/></li>
			</ul>
		</div>
		<div class="goods-r">
			<h4>${this.res[i].name}</h4>
			<ul class="clear">
				<li>
					<p>限量份数</p>
					<p>${this.res[i].introduce.number}</p>
				</li>
				<li>
					<p>剩余份数</p>
					<p>${this.res[i].introduce.Surplus}</p>
				</li>
				<li>
					<p>剩余时间</p>
					<p class="te">${this.res[i].introduce.time}</p>
				</li>
			</ul>
			<p class="bao">商家已存入担保金 <i>136.50</i> 元请您放心购买！</p>
			<div class="last clear" carindex="${this.res[i].id}">
				<p class="p">折后价:<s>${this.res[i].price}</s><a href="car.html" class="buy">我要抢购</a></p>
				<span>下单价： <i>${this.res[i].price}</i> 元</span>
				<span>优惠金额： <i>${this.res[i].introduce.discount1}</i> 元</span>
				<span>折扣： <i>${this.res[i].introduce.discount2}</i> 折</span>
			</div>
		</div>
	</div>
	`;
	break;
				}
			}
		}
		this.tbody.innerHTML = str;
		
		this.buy = document.querySelector(".buy");
		
		this.card();
		this.da =document.querySelector(".da");
		//console.log(this.da);
		this.mirror();
	}
	
	addEvent(){
		var that = this;
		this.tbody.onclick = function(eve){
			if(eve.target.className == "buy"){
				// 5.记录id
				that.id = eve.target.parentNode.parentNode.getAttribute("carindex");
				console.log(that.id);
				// 6.准备存cookie
				that.setCookie();
			
			}
		}
	}
	
	//存购物车的getCookie
	
	setCookie(){
		this.cars = getCookie("cars") ? JSON.parse(getCookie("cars")) : [];
		if(this.cars.length == 0){
			this.cars.push({
				id:this.id,
				num:1
			})
		}else{
			// 7-3.不为空：不是第一次加入购物车：
			var onoff = true;   //用来记录是否是新商品的状态
			for(var i=0;i<this.cars.length;i++){
				// 7-4.判断当前商品，新还是旧
				if(this.cars[i].id === this.id){
					// 7-5.旧：修改数据,同时修改是否是新商品的状态
					this.cars[i].num++;
					onoff = false;
				}
			}
			if(onoff){
				this.cars.push({
					id:this.id,
					num:1
				})
			}
		}
		// 8.数组的操作结束后，一定要再存回cookie
		setCookie("cars",JSON.stringify(this.cars));
	}
	
	//放大镜
	mirror(){
		var wrap = document.getElementById("wrap");
		var box = document.querySelector(".box");
		var bigArea = document.getElementById("bigArea");
		//var da =document.querySelector(".da");
		//console.log(bigArea);

		var that = this;
		wrap.onmouseenter = function() {
			box.style.display = "block";
			bigArea.style.display = "block";
			var r = (wrap.clientWidth - box.clientWidth) / (800 - bigArea.clientWidth);
			// 绑定mousemove事件
			var _this = that;
			document.onmousemove = function(e) {
				// 计算鼠标在页面中的距离
				var mouseX =  e.pageX;
				var mouseY = e.pageY;
				// 计算元素在视口中的距离
				var elementX = offset(wrap).left;
				var elementY = offset(wrap).top;
				// 计算鼠标在元素中的距离
				var resultX = mouseX - elementX - wrap.clientLeft - box.clientWidth / 2;
				var resultY = mouseY - elementY - wrap.clientTop - box.clientHeight / 2;
				if (resultX < 0) {
					resultX = 0;
				} else if (resultX > wrap.clientWidth - box.clientWidth) {
					resultX = wrap.clientWidth - box.clientWidth;
				}
	
				if (resultY < 0) {
					resultY = 0;
				} else if (resultY > wrap.clientHeight - box.clientHeight) {
					resultY = wrap.clientHeight - box.clientHeight;
				}
				box.style.left = resultX + "px";
				box.style.top = resultY + "px";
				//bigArea.style.backgroundPositionX = -resultX / r + "px";
				//bigArea.style.backgroundPositionY = -resultY / r + "px";
				//console.log(_this.da);
				_this.da.style.left = -resultX / r + "px";
				
				_this.da.style.top = -resultY / r + "px";
				
				
			}
		}
		wrap.onmouseleave = function() {
			box.style.display = "none";
			bigArea.style.display = "none";
		}
		
		
		function offset(dom) {
			// 返回一个对象
			var obj = {
				left: 0,
				top: 0
			}
		
			// 先让这个对象加上 dom的自己得到定位父元素的距离
			obj.left = dom.offsetLeft;
			obj.top = dom.offsetTop;
			// 判定浏览器是否是IE8 
			var isIE8 = window.navigator.userAgent.indexOf("MSIE 8") != -1;
		
		
			// 循环往上走 累加每一个offsetParent的offsetLeft和clientLeft 
			// 加每一个offsetParent的offsetTop和clientTop
			var offsetParent = dom.offsetParent;
			while (offsetParent != document.body) {
				if (isIE8) {
					obj.left += offsetParent.offsetLeft;
					obj.top += offsetParent.offsetTop;
				} else {
					obj.left += offsetParent.offsetLeft + offsetParent.clientLeft;
					obj.top += offsetParent.offsetTop + offsetParent.clientTop;
				}
				offsetParent = offsetParent.offsetParent;
			}
			return obj;
		}
			
	}
	
	card(){
		var that = this;
		$(".goods-l").children("ul").children("li").click(function(){
			//这里的this就是点击的当前元素 相当于e
			$(this).addClass("act").siblings().removeClass("act");
			$("#bigArea").children("img").eq($(this).index()).addClass("da").siblings().removeClass("da");
			console.log(that.da);
			that.da = document.querySelector(".da");
			console.log(that.da);
			$("#wrap").children("img").css("display","none").eq($(this).index()).css("display","block");
			console.log($(this).index());
		})
	}

}

    new Detail({
        url:"http://localhost/weiboli/json/goods.json",
        tbody:document.querySelector("article")
    })
	
	//懒加载功能函数
	var imgs = document.querySelectorAll("img");
	var clientH = document.documentElement.clientHeight;
	var scrollT = document.documentElement.scrollTop;
	
	var arr = [];
	for(var i=0;i<imgs.length;i++){
		arr.push(imgs[i]);
	}
	
	//懒加载的功能函数
	function lazyLoad(elements,cH,sT){
		for(var i=0;i<arr.length;i++){
			if(arr[i].offsetTop < cH + sT){
				arr[i].src = arr[i].getAttribute("data-src");
				arr.splice(i,1);
				i--;
			}
		}
	}
	lazyLoad(imgs,clientH,scrollT);
	
	
	onscroll = function(){
		var scrollT = document.documentElement.scrollTop;
		lazyLoad(imgs,clientH,scrollT);
	}
		