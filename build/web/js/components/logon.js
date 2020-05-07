/* 
 * Program name: logon.js
 * Programmer:   Alex St.Clair
 * Program Desc: creates global variable 'logon' and handles both
 *              building the UI for the logon process as well as 
 *              finding the specified user in the database
 */

var logon = {};

logon.UI = function (id) {
    var content = `
        <div class='logon'>
            <br/>
            Email Address <input type="text" id="logonEmailAddress"/>
            &nbsp;
            Password <input type="password" id="logonPassword"/>
            &nbsp;
            <input type="button" value="Submit" onclick="logon.findUser('logonEmailAddress','logonPassword','msgArea')"/>
            <br/> <br/>
            <div id="msgArea" align="center"></div>
        </div>
    `; // closing back tick
    document.getElementById(id).innerHTML = content;
};

//make ajax call to the logon API (params are ids to divs)
logon.findUser = function (emailId, pwId, msgId) {
    
    //get data to pass into the API
    var email = escape(document.getElementById(emailId).value);
    var pw = escape(document.getElementById(pwId).value);
    
    if(!email){
        document.getElementById(msgId).innerHTML = "User must enter an email.";
        return;
    }
    
    if(!pw){
        document.getElementById(msgId).innerHTML = "User must enter a password.";
        return;
    }
    
    var logonURL = "webAPIs/logonAPI.jsp?userEmail="+email+"&userPassword="+pw;
    
    // invoke ajax function to read email and password and if the call was successful, 
    // run function success, otherwise, put an error message in the DOM element 
    // that has id "msgArea".
    ajax({
            url: logonURL,
            successFn: success, 
            errorEle: "msgId"
        });

    function success(list) {
        //if an error occurred, put the message in the dom and return
        if (!list) {
            document.getElementById(msgId).innerHTML = "Username/password combination not found. Please try again.";
            return;
        }
        else if (list.errorMsg.length > 0) {
            document.getElementById(msgId).innerHTML = "Error: " + list.errorMsg;
            return;
        }
                
        var infoDiv = document.createElement("div");
                
        //build a string for the user's data
        var msgString = "Welcome web user " + list.webUserId + 
                        "<br />Birthday: " + list.birthday + 
                        "<br />Membership Fee: " + list.membershipFee+
                        "<br />User Role: " + list.userRoleId;
                
        console.log(msgString);
        //set the HTML in the msgArea div to the found information about the user
        infoDiv.innerHTML = msgString;              
        document.getElementById(msgId).appendChild(infoDiv);

    }
};