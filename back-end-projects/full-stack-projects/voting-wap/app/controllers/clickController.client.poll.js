`use strict`;

// this file will be added via script tag

(function(){
    var deletePollBtn    = document.querySelector(".deletePollBtn");
    var pollPath         = deletePollBtn.getAttribute("data-reqUrl").toString();
    var addOptUrl        = appUrl + pollPath;
        
    
    deletePollBtn.addEventListener("click", function() {
        ajaxFunctions.pseudoAjaxRequest('DELETE', addOptUrl, function(success) {
            if (success) {
                window.location.href = '/';
            } else {
                console.error('Poll deletion by author failed on the server!');
            }
        });
    });
})();