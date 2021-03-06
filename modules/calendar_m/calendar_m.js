/**
 * @require ../../common/js/base.js
*/

(function(){
	function getSolarDay(y, m) {
				return [31, (((y % 4 === 0) && (y % 100 !== 0) || (y % 400 === 0)) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m];
	};
	function formatNum(num){
		if(num<10){
			num = "0"+num;
		}
		return num.toString();
	}
	var today = new Date();
	var todayString = today.getFullYear().toString()+formatNum(today.getMonth()+1)+formatNum(today.getDate());
	// console.log(todayString);


	var CALENDAR = function(ele,year,month,day,festival,limit,num,callback){
		this.box = ele;
		this.year = year;
		this.month = month-1;  //月份 0-11
		this.day = day;
		this.start = limit.start || false ;//时间
		this.end = limit.end || false ;//时间
		this.otherday = limit.otherday || false ;//时间
		this.festival = festival || {};
		this.callback = callback || false;
		this.num = num||6;
		// this.thismonth = thismonth||false;
	};
	CALENDAR.prototype = {
		show:function(){
			var newdate = new Date();
			var _y = newdate.getFullYear(),
				_m = newdate.getMonth();

			for(var i = 0 ; i<this.num ; i++){
					var _m1 = _m+i;
					var _y1 = _y;
					if(_m1>=12){
						_m1 = _m1-12;
						_y1++;
					}
					this.init(_y1,_m1);
					//this.arry[i] =  new CALENDAR(ele,_y,_m,15,festival,limit,thismonth,callback);
			}
			this.events();
		},
		hide:function(){
			this.box.html("");
		},
		init:function(year,month){
			this.topEle = $("<div />");
			this.topEle.addClass("top");

			this.topEle.append('<div class="topYearMonth">--</div>');
			//this.topEle.append(this.preBtn);
			//this.topEle.append(this.nextBtn);

			//WdateDiv
			this.WdateDiv = $("<div />");
			this.WdateDiv.addClass("WdateDiv");


			this.WdateDiv.append(this.topEle);
			this.WdateDiv.append('<table class="WdayTable" width="100%" border="0" cellspacing="0" cellpadding="0"></table>');

			this.tableBody = $("<tbody />");
			this.tableBody.append('<tr class="MTitle" align="center"><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr>');

			this.WdateDiv.find("table").append(this.tableBody);

			this.box.append(this.WdateDiv);

			//
			this.c_day = this.year.toString()+formatNum(parseInt(this.month+1))+formatNum(this.day);
			//console.log(this.c_day);
			this.creatEle(year,month);
			
		},
		events:function(){
			var that = this;
			this.box.on("click",".Wwday",function(){
				if($(this).hasClass("Wselday")){
					return false;
				}
				$(".Wwday").removeClass('Wselday');
				$(this).addClass('Wselday');
				that.c_day = $(this).attr('date_y').toString()+formatNum($(this).attr('date_m'))+formatNum($(this).attr('date_d'));
				if($(this).hasClass("othermonth")){
					that.creatEle($(this).attr("date_y"),parseInt($(this).attr("date_m")-1));
					that.year = $(this).attr("date_y");
					that.month = $(this).attr("date_m")-1;
				}
				that.day = $(this).attr('date_d');
				if(that.callback){
					that.callback(that.year,that.month+1,that.day);
				}
			});
		},
		setday:function(){
			//设置选中时间
		},
		creatEle:function(year,month){
			this.tableBody.find(".con_tr").remove();
			var _y = year,
				_m = month,
				solarday = getSolarDay(year,month),
				pre_solarday = (_m==0)?31:getSolarDay(year,parseInt(_m-1)),//上个月天数
				dateText = 0,
				thismonth = true; //是否这个月
			var newdate = new Date();
			newdate.setYear(_y);
			newdate.setMonth(_m);
			newdate.setDate(1);
			
			this.topEle.find('.topYearMonth').html(year+"年"+parseInt(_m+1)+"月");

			var firstweek = newdate.getDay();

			var _html = "";//日期html

			//确定需要显示上个月几天
			var i = -firstweek+1,	
				len = 42-firstweek,
				week = 0;

			for(i; i <= len ; i++){
				var day = i;
				var month = _m;
				var year = _y;
				thismonth = true;
				if(i<=0){
					day = " ";
					month --;
					if(month==-1){
						month = 11;
						year --;
					}
					thismonth = false;
				}
				if(i>solarday){
					day = " ";
					month ++;
					if(month==12){
						month = 0;
						year ++;
					}
					thismonth = false;
				}
				if(week==0){
					_html += "<tr class='con_tr'>";
				}

				dateText = year.toString()+formatNum(parseInt(month+1))+formatNum(day);

				//设置日期是否可选
				var setclass = "WotherDay";

				if(this.start&&this.end){
					if(parseInt(dateText)>= this.start && parseInt(dateText) <= this.end){
						setclass = "Wwday";
					}
				}else{
					if(this.start){
						if(parseInt(dateText)>= this.start ){
							setclass = "Wwday";
						}
					}
					if(this.end){
						if(parseInt(dateText) <= this.end ){
							setclass = "Wwday";
						}
					}
				}

				if(this.otherday&&this.otherday.length>0){
					var len2 = this.otherday.length;
					for(var i2 = 0 ; i2< len2 ; i2++){
						if(dateText == this.otherday[i2]){
							setclass = "WotherDay";
							break;
						}
					}
				}
				if(!thismonth){
					//setclass = "WotherDay";
				}

				//setday
				var cday = (this.c_day == dateText)?"  Wselday":""; 

				//thismonth
				var thism = (!thismonth)?" othermonth":"";

				//today
				var todayclass = "",
					day2 = day;
				if(todayString == dateText){
					todayclass = " todayclass";
					day2 = "今天";
				}

				//festival

				var festivalhtml ="";
				var festival = this.festival;

				if(festival[year]&&festival[year][parseInt(month+1)]&&festival[year][parseInt(month+1)][day]){
					festivalhtml="<i class='festival'></i>";
				}
				var s = "s";
				if(festival[s][parseInt(month+1)]&&festival[s][parseInt(month+1)][day]){
					festivalhtml="<i class='festival'></i>";
				}


				_html += '<td class="'+setclass+cday+thism+todayclass+'" date_y="'+year+'" date_m="'+parseInt(month+1)+'" date_d="'+day+'">'+day2+festivalhtml+'</td>';

				if(week==6){
					_html += "</tr>";
					week = 0;
				}else{
					week++;
				}
			}
			this.tableBody.append(_html);
		}
	};
	window.CALENDAR = CALENDAR;
})();

//festival
var festival = {
		//通用
		s:{	
			5:{
				1:"劳动节"
			},
			10:{
				1:"国庆节",
				2:"国庆节",
				3:"国庆节"
			},
			12:{
				25:"圣诞节"
			}
		},
		2015:{
			9:{
				26:"中秋节",
				27:"中秋节"
			}
		}
};
var cc = new CALENDAR($(".calendar"),2015,9,15,festival,{
	start:20150915,
	end:20151025,
	otherday:[
		// 20150820,20150821
	]
},6,function(y,m,d){
	//console.log(y+"-"+m+"-"+d);
});
cc.show();
// var CALENDARBOX = function(ele,year,month,day,festival,limit,num,callback){
// 	var num = num;
// 	this.arry = [];
// 	for(var i = 0 ; i<num ; i++){
// 		var _m = month+i;
// 		var _y = year;
// 		if(_m>=13){
// 			_m = _m-12;
// 			_y++;
// 		}
// 		var thismonth = false;
// 		if(i == 0 ){
// 			thismonth = true;
// 		}
// 		this.arry[i] =  new CALENDAR(ele,_y,_m,15,festival,limit,thismonth,callback);
// 	}
// };

// var CALENDARbox = new CALENDARBOX($(".calendar"),2015,9,15,festival,{
// 	start:20150915,
// 	end:20151025,
// 	otherday:[
// 		// 20150820,20150821
// 	]
// },6,function(y,m,d){
// 	//console.log(y+"-"+m+"-"+d);
// });