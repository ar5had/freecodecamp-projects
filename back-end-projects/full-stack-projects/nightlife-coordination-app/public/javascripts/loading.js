window.onload=function() {
	setTimeout(function(){
		document.body.style.overflow = "auto";
		document.getElementById('hideAll').style.opacity = 0;
	}, 100);
	setTimeout(function() {
 		document.getElementById('hideAll').style.display='none';
	}, 400);
};