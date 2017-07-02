(function(){
	var menuIcon = document.querySelector("#menuIcon"),
		sidebar = document.querySelector(".sidebarWrapper");
		
	var openSidebar = function() {
		sidebar.classList.toggle("open");
		setTimeout(function() {sidebar.classList.toggle("visible");}, 200);
		menuIcon.classList.toggle("open");
	}
	
	var closeSidebar = function() {
		sidebar.classList.toggle("visible");
		setTimeout(function() {sidebar.classList.toggle("open");}, 200);
		menuIcon.classList.toggle("open");
	}
	
	menuIcon.addEventListener("click", function(e) {
		if (!e) var e = window.event
    		e.cancelBubble = true;
    	if (e.stopPropagation) 
    		e.stopPropagation()
    	openSidebar();
	});
	
	window.addEventListener("click", function(){
    	if (sidebar.classList.contains("open") && (window.innerWidth > 960)) {
    		closeSidebar();
    	}
	});
	
	function logout () {
        var form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', window.location.origin + "/logout");
        form.style.display = 'hidden';
        document.body.appendChild(form)
        form.submit();
    }
    
    Array.prototype.forEach.call(document.querySelectorAll(".logout"), function(elem) {
    	elem.addEventListener("click", logout);
    });
    
    var modal = document.querySelector(".modalWrapper"),
		hider = document.querySelector("#bkdHider"),
		openModalBtn = document.querySelector(".openModalBtn"),
		closeModalBtn = document.querySelector(".closeModalBtn");
	
	if (openModalBtn && closeModalBtn) {
		openModalBtn.addEventListener("click", openModal);
		closeModalBtn.addEventListener("click", closeModal);
	}
	
	function openModal() {
		//document.body.style.overflow = "hidden";
		modal.classList.toggle("open");
		hider.classList.toggle("open");
		setTimeout(function() {
			modal.classList.toggle("visible");
			hider.classList.toggle("visible");
		}, 200);
	}
	
	function closeModal() {
		//document.body.style.overflow = "auto";
		modal.classList.toggle("visible");
		hider.classList.toggle("visible");
		setTimeout(function() {
			modal.classList.toggle("open");
			hider.classList.toggle("open");
		}, 200);
	}
})();