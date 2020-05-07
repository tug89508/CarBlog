/* 
 * Program name: profile.js
 * Programmer:   Alex St.Clair
 * Program Desc: function that is called when a user clicks on the profile button
 */

function profile(id){    
    
    //call the getProfileAPI
    ajax({
            url: "webAPIs/getProfileAPI.jsp",
            successFn: success, 
            errorEle: "id"
        });

    function success(obj) {
        if (!obj) {
            document.getElementById(id).innerHTML = "Profile not found. Please try logging in again.";
            return;
        }
        
        //build a string for the user's data
        var msgString = "Welcome web user " + obj.webUserId + 
                        "<br />Birthday: " + obj.birthday + 
                        "<br />Membership Fee: " + obj.membershipFee+
                        "<br />User Role: " + obj.userRoleId+
                        "<br />Error Msg: " + obj.errorMsg;
                
        console.log(msgString);
        //set the HTML in the msgArea div to the found information about the user
        document.getElementById(id).innerHTML = msgString;              
    }
}