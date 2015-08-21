/**
 * @require ../../common/js/zepto.js
 * @require ../../common/js/touch.js
*/

(function(){

	var myCanvas = document.getElementById('myCanvas');

	var gray = myCanvas.getContext('2d');
	var _img = document.getElementById('_img');



	// gray.beginPath();
	// gray.fillStyle = "#999";
	// gray.fillRect(0,0,320,180);
	// gray.closePath();
	gray.drawImage(_img,0,0,320,180);
	gray.globalCompositeOperation="destination-out";

	var num = 0;
		var datas = gray.getImageData(0,0,320,400);
		for (var i = 0; i < datas.data.length; i++) {
			if (datas.data[i] == 0) {
				num++;
			};
		};
	myCanvas.addEventListener('touchstart', function (e) {
		myCanvas.addEventListener('touchmove', function(e){
			e.preventDefault();
			var x = e.targetTouches[0].clientX + document.body.scrollLeft - myCanvas .offsetLeft-20,
				y = e.targetTouches[0].clientY + document.body.scrollTop - myCanvas .offsetTop-20;
			// gray.clearRect(x,y, 30, 30);
			gray.beginPath();
			gray.fillStyle = "#f00";
			gray.arc(x,y, 40, 0, Math.PI*2);
			gray.fill();
			gray.closePath();
		});
	});
	myCanvas.addEventListener('touchend', function(e){
		var num = 0;
		var datas = gray.getImageData(0,0,320,180);
		for (var i = 0; i < datas.data.length; i++) {
			if (datas.data[i] == 0) {
				num++;
			};
		};
		if (num >= datas.data.length * 0.7) {	
			gray.fillRect(0,0,320,180);
		};
	});
})();




