(function(){

    var elem = document.querySelector('.locateMe');
    var form = document.getElementById('locateMeForm');
    var searchBtn = document.querySelector('.searchBtn');
    var searchWrapper = document.querySelector(".search");
    var userABWrapper = document.querySelector("header .buttonWrapper > a");
    var userAccBtn = document.querySelector('.userAccBtn');
    var count = 2;
    var width = window.innerWidth;
    elem.addEventListener("click", function() {
        form.submit();    
    });
    var bindvmBtn = function() {
        var vmBtn = document.getElementById('viewMoreBtn');
        if (vmBtn) {
            vmBtn.addEventListener("click", function() {
                
                vmBtn.textContent = "Loading...";
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        if(this.status == 200) {
                           count++;
                           vmBtn.parentNode.removeChild(vmBtn);
                           var wrapper = document.querySelector("main > .container");
                           wrapper.innerHTML += this.responseText; 
                           bindvmBtn();
                           bindAllCountBtns(document.querySelectorAll(".countBtn"));
                        } else {
                            console.log( "error while making request to /results", this.statusText);
                            vmBtn.textContent = "View More";
                        }
                    }
                };
                
                var url = window.location.href;
                var index = url.indexOf('?');
                var usefulStr = url.substr(index);
                xhttp.open("GET", "/results"+ usefulStr +"&type=xhr&page=" + count, true);
                xhttp.send();
            });
        }
    };
    
    var bindCountBtn = function(countBtn) {
        countBtn.addEventListener("click", function() {
            var xhttp = new XMLHttpRequest();
            var id = countBtn.getAttribute('data-id');
            countBtn.disabled = true;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if(this.status == 200) {
                        countBtn.children[1].textContent = this.responseText;
                        countBtn.disabled = false;
                    } else {
                        console.log( "error while making request to /markRestaurant", this.statusText);
                        countBtn.disabled = false;
                    }
                }
            };
            xhttp.open("POST", "/markRestaurant?id=" + id, true);
            xhttp.send();
        });
    };
    
    var bindAllCountBtns = function(btns) {
        // using backward loop so that newly added results btns can be binded first
        // and when already binded btns come then function will return as if 
        // condition will truthy
        // using for loop over forEach h.o. function so that we can return when 
        // if condition is truthy
        for (var i = btns.length-1; i >= 0; i--) {
            if (typeof btns[i].onClick === 'function') {
                return;
            } else {
                bindCountBtn(btns[i]);
            }
        }
    };
    
    
    
    searchBtn.addEventListener('click', function(e) {
        if (!e) var e = window.event
    		e.cancelBubble = true;
    	if (e.stopPropagation) 
    		e.stopPropagation()
    		
    	if(userABWrapper.style.visibility === "visible")	
            userABWrapper.style.visibility = "hidden";
            
        if(document.querySelector(".search").style.visibility === "visible")
            document.querySelector(".search").style.visibility = "hidden"
        else
            document.querySelector(".search").style.visibility = "visible"; 
    });
    
    userAccBtn.addEventListener('click', function(e) {
        if (!e) var e = window.event
    		e.cancelBubble = true;
    	if (e.stopPropagation) 
    		e.stopPropagation()
    		
    	if(document.querySelector(".search").style.visibility === "visible")
            document.querySelector(".search").style.visibility = "hidden"
    		
    	if(userABWrapper.style.visibility === "visible")	
            userABWrapper.style.visibility = "hidden";
        else
            userABWrapper.style.visibility = "visible";
    });
    
    searchWrapper.addEventListener('click', function(e) {
        if (!e) var e = window.event;
    		e.cancelBubble = true;
    	if (e.stopPropagation) 
    		e.stopPropagation();
    });
    
    // fallback for mobiles
    
    document.getElementById('searchBar').addEventListener('click', function(e) {
        if (!e) var e = window.event;
    		e.cancelBubble = true;
    	if (e.stopPropagation) 
    		e.stopPropagation();
    });
    
    window.addEventListener("click", function() {
        if (window.innerWidth <= 550)
            document.querySelector(".search").style.visibility = "hidden",
            userABWrapper.style.visibility = "hidden";
            
    });
    
    // Note: On mobile, when keyboard draws up then there is vertical resize 
    // so only add event to horizontal resizes
    
    if(window.attachEvent) {
        window.attachEvent('onresize', function() {
            if(window.innerWidth !== width) {
                if(window.innerWidth > 550) {
                    document.querySelector(".search").style.visibility = "visible";
                    userABWrapper.style.visibility = "visible";
                } else {
                    document.querySelector(".search").style.visibility = "hidden";
                    userABWrapper.style.visibility = "hidden";
                }  
                width = window.innerWidth;
            }
        });
    }
    else if(window.addEventListener) {
        window.addEventListener('resize', function() {
            if (window.innerWidth !== width) {    
                if(window.innerWidth > 550) {
                    document.querySelector(".search").style.visibility = "visible";
                    userABWrapper.style.visibility = "visible";
                } else {
                    document.querySelector(".search").style.visibility = "hidden";
                    userABWrapper.style.visibility = "hidden";
                }
                width = window.innerWidth;
            }
        }, true);
    }
    
    bindAllCountBtns(document.querySelectorAll(".countBtn"));
    bindvmBtn();
})();

