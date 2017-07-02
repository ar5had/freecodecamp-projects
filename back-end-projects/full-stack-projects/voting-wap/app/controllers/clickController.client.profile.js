`use strict`;

// this file will be added via script tag

(function(){
    var deleteAccountBtn = document.querySelector("#deleteAccBtnFinal"),
        deleteProfileUrl = appUrl + '/profile';
    
    deleteAccountBtn.addEventListener("click", function() {
        ajaxFunctions.pseudoAjaxRequest('DELETE', deleteProfileUrl, function(success) {
            if (success) {
                window.location.href = '/';
            } else {
                console.error('Profile deletion failed on the server!');
            }
        });
    });
})();