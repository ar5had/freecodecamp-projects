(function(){

    var elem = document.querySelector('.locateMe');
    var form = document.getElementById('locateMeForm');
    var userABWrapper = document.querySelector("header .buttonWrapper > a");
    var userAccBtn = document.querySelector('.userAccBtn');
    
    elem.addEventListener("click", function() {
        form.submit();    
    });
    
     userAccBtn.addEventListener('click', function(e) {
            if (!e) var e = window.event
        		e.cancelBubble = true;
        	if (e.stopPropagation) 
        		e.stopPropagation()
        		
        	if(userABWrapper.style.visibility === "visible")	
                userABWrapper.style.visibility = "hidden";
            else
                userABWrapper.style.visibility = "visible";
        });
        
       
        
        window.addEventListener("click", function() {
            if (window.innerWidth <= 550)
                userABWrapper.style.visibility = "hidden";
                
        });
        
        
        if(window.attachEvent) {
        window.attachEvent('onresize', function() {
                if(window.innerWidth > 550) {
                    userABWrapper.style.visibility = "visible";
                } else {
                    userABWrapper.style.visibility = "hidden";
                }
        });
        }
        else if(window.addEventListener) {
            window.addEventListener('resize', function() {
                if(window.innerWidth > 550) {
                    userABWrapper.style.visibility = "visible";
                } else {
                    userABWrapper.style.visibility = "hidden";
                }
            }, true);
        }
    
})();