/**
 * @require common/js/zepto.js
 * @require common/js/touch.js
*/

(function(){
	var BANNER_m = function(ele,data,width,height){
		this.box = ele;
		this.data = data;
		this.width = width;
		this.height = height;
		this.positiionArry = [];
		this.cnt = 0;
		this.dx = 0;
		this.init();
	};
	BANNER_m.prototype = {
		init:function(){
			this.createEle();
			this.addImgEle();
			this.loadImg(0);
			this.loadImg(1);
			this.events();
		},
		createEle:function(){
			this.conBox = $("<div />");
			this.conUl  = $("<ul />");
			this.conUl.addClass("clear");
			this.conUl.attr({"id":"target"});
			this.conBox.append(this.conUl);
			this.box.append(this.conBox);
			this.conBox.addClass("box");
			this.conBox.css({"width":this.width+"px","height":this.height+"px"});
			this.conUl.css({"width":this.width*this.data.length,"height":this.height+"px"});
		},
		addImgEle:function(){
			var len = this.data.length;
			var that = this;
			var tem = function(link,img){
				var _li = $("<li />");
				_li.attr({"loaded":"no"})
				_li.html('<a href="'+link+'"><img _src="'+img+'"></a>');
				_li.css({"width":that.width+"px","height":that.height+"px"});
				return _li;
			};
			for(var i = 0 ; i<len ; i++){
				this.positiionArry.push(i*this.width)
				var _li = tem(this.data[i].link,this.data[i].img);
				this.conUl.append(_li);
			}
			this.positiionArry.push(len*this.width)
		},
		loadImg:function(cnt){
			var li = this.conUl.find("li").eq(cnt);
			if(li.attr("loaded") == "no"){
				var imgSrc = li.find("img").attr("_src");
				li.find("img").attr({"src":imgSrc});
				li.attr({"loaded":"yes"});
			}
		},
		slide:function(ele,cnt){
			var that = this;
			if(cnt<0){
				cnt = 0;
			}
			if(cnt>this.data.length-1){
				cnt = this.data.length-1;
			}
			this.cnt = cnt;
			var offx = -this.positiionArry[cnt];
			this.conUl.addClass("ani");
			ele.style.webkitTransform = "translate3d(" + offx + "px,0,0)";
			that.dx  = offx;
			//加载图片
			if(cnt<this.data.length-1){
				this.loadImg(cnt+1);
			}
		},
		events:function(){
			var that = this;
			touch.on('#target', 'touchstart', function(ev){
				ev.preventDefault();
			});
			var target = this.conUl[0];
			touch.on('#target', 'drag', function(ev){

				that.dx  = that.dx  || 0;
				var offx = that.dx + ev.x + "px";
				that.conUl.removeClass("ani");
				target.style.webkitTransform = "translate3d(" + offx + ",0,0)";
			});
			touch.on('#target', 'dragend', function(ev){
				// dx += ev.x;
				// console.log(dx);
				if(Math.abs(ev.x)>=50){
					var cnt2 = that.cnt;
					if(ev.x>0){
						cnt2--;
					}else{
						cnt2++;
					}
					that.slide(target,cnt2);
				}else{
					that.slide(target,that.cnt);
				}
			});
			// touch.on(target, 'swiperight', function(ev){
			// 		console.log(ev.distanceX)
			// 		setTimeout(function(){
			// 			var cnt2 = that.cnt-1;
			// 			that.slide(target,cnt2);
			// 		},100);
			// });
			// touch.on(target, 'swipeleft', function(ev){
			// 		console.log(ev)
			// 		setTimeout(function(){
			// 			var cnt2 = that.cnt+1;
			// 			that.slide(target,cnt2);
			// 		},100);
			// });
		}
	};
	window.BANNER_m = BANNER_m;
})();

var banner_data = [
	{
		link:"#",
		img:"./testimages/pic_hd_3.png"
	},
	{
		link:"#",
		img:"./testimages/pic_hd_2.png"
	},
	{
		link:"#",
		img:"./testimages/pic_hd_1.png"
	}
];

var _w = $(window).width(),
	_h = _w*180/320;
var banner = new BANNER_m($(".banner_m"),banner_data,_w,_h);







