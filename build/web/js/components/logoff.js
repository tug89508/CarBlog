/* 
 * Program name: logoff.js
 * Programmer:   Alex St.Clair
 * Program Desc: function that is called when a user clicks on the logoff button
 */

function logoff(id){
    
    //call the logoff API
    ajax({
            url: "webAPIs/logoffAPI.jsp",
            successFn: success, 
            errorEle: "id"
        });

    function success(obj) {
        if (!obj) {
            document.getElementById(id).innerHTML = "logoff.js: log out failed";
            return;
        }
        
        document.getElementById(id).innerHTML = "You have successfully been logged out.";
    }
}