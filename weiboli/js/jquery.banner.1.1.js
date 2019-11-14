;(function($){
	"use strict";
	$.fn.extend({
		banner:function(options){
			//这里的this给了banner1 元素 即绑定的dom元素
			// console.log(this);
			//防止重复属性 慎用 给this自定义对象 以供面向使用
			this.obj = {};
			var that = this.obj;
			// console.log(this.obj);
			
			//解析参数
			that.imgs = options.imgs;
			that.list = options.list == false ? false : true;
			that.autoPlay = options.autoPlay == false ? false : true;
			that.delayTime = options.delayTime || 3000;
			that.moveTime = options.moveTime || 300;
			
			//设置索引 假设当前索引为0
			that.index = 0;
			//上一次走的是最后一张
			that.iPrev = that.imgs.length-1;
			
			function btnRight(){
				//判断当前是否是最后一张
				if(that.index == that.imgs.length-1){
					//是最后一张 再点 让当前的index为0 回到第一张
					that.index = 0;
					//刚才走的是是最后一张
					that.iPrev = that.imgs.length-1;
				}else{
					//当前这张不是最后一张 将索引加1即可
					that.index++;
					//走的是 索引减1
					that.iPrev = that.index-1;
				}
				// console.log(that.iPrev,that.index);
				//开始移动 传入方向
				that.btnMove(-1);
			}
			
			that.btnMove = function(t){
				//先走 先设置要走的这个初始位置
				that.imgs.eq(that.iPrev).css({
					left:0
				}).stop().animate({
					//走到一张图片的距离
					left:that.imgs.eq(0).width() * t
				})
				//后一张进来
				that.imgs.eq(that.index).css({
					//先获得初始位置 一张图的距离
					left:-that.imgs.eq(0).width() * t
				}).stop().animate({
					//运动后 的定位值 为0
					left:0
				})
				
				if(that.list){
                    ul.children("li").css({
                        background:"#fff"
                    }).eq(that.index).css({
                        background:"red"
                    })
                }
			}
			
			//绑定左右按钮事件
			function btnLeft(){
				//当前这张是第一张
				if(that.index == 0){
					//再点 让下一张变为最后一张
					that.index = that.imgs.length-1;
					//往左走 走的是第0张
					that.iPrev = 0;
				}else{
					that.index--;
					that.iPrev = that.index+1;
				}
				// console.log(that.iPrev,that.index);
				//开始移动 传入方向
				that.btnMove(1);
			}
				
			//判断是否存在按钮
			// console.log(options.left);
			if(options.left != undefined && options.left.length > 0 && options.right != undefined && options.right.length > 0){
				//这里传参不能加() 加()立即执行 不会等事件
				options.left.click(btnLeft);
				options.right.click(btnRight);
			}
			
			//是否存在小圆点
			if(that.list){
				var str = "";
				for(var i =0;i<options.imgs.length;i++){
					str += `<li></li>`;
				}
				var ul = $("<ul>").html(str);
				this.append(ul);
				ul.css({
					width:"100%",
                    height:30,
                    display:"flex",
                    justifyContent:"center",
                    position:"absolute",
                    left:0,
                    bottom:20,
                    listStyle:"none",
                    margin:0,
                    padding:0,
                    textAlign:"center",
                    lineHeight:"30px"
				}).children("li").css({
					width:20,
                    height:20,
                    borderRadius:"50%",
                    background:"#fff",
                    margin:"0 10px",
                    cursor:"pointer"
				}).eq(that.index).css({
					background:"red"
				});
				
				//给li绑定事件
				ul.children("li").click(function(){
					// console.log($(this).index());
					//点击的图片比当前图片的索引大 
					if($(this).index() > that.index){
						//当前图片往左走
						console.log("左");
						//执行list移动函数
						that.listMove($(this).index(),1)
					}
					//点击的比当前小
					else if($(this).index() < that.index){
						//当前图片往右走
						console.log("右");
						that.listMove($(this).index(),-1)
					}
					
					//点击之后设置当前小圆点样式
					$(this).css({
							background:"red"
						}).siblings().css({
							background:"#fff"
						})
					
					//点击之后 当前点击的索引 就是下一次的当前索引
					that.index = $(this).index();
				})
				
				//list移动函数
				that.listMove = function(iNow,t){
					//当前图片
					options.imgs.eq(that.index).css({
						left:0
					}).stop().animate({
						left:-options.imgs.eq(0).width() * t
					})
					options.imgs.eq(iNow).css({
						left:options.imgs.eq(0).width() * t
					}).stop().animate({
						left:0
					})
				}
			}
			
			//是否需要自动轮播
			if(that.autoPlay){
				//判断鼠标进入前 先开启自动轮播
				that.t = setInterval(()=>{
					// options.right.trigger("click");
					//不能用执行右按钮的事件处理函数 因为调用者可能没有传right这个参数
					btnRight()
				},that.delayTime);
				
				//鼠标进入大框，停止，离开，继续
				//这里的this是大框 banner1 本身就是jq元素 所以不用转
				console.log(this);
				this.hover(function(){
					clearInterval(that.t);
				},function(){
					that.t = setInterval(()=>{
						btnRight();
					},that.delayTime)
				})
			}
		}
	})
})(jQuery)