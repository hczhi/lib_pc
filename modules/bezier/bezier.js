/**
 * @require ../../common/js/zepto.js
 * @require ../../common/js/touch.js
*/

(function(){
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(20,20);
	ctx.bezierCurveTo(50,100,200,100,200,20);
	ctx.stroke();
})();




