
// Declare single global object with same name as js file name.
// This object will have just one public method for now, but more later...
var cars = {};

cars.display = function (id) {
    var content = `
        <style>
            p {float:right;}
        </style>
        <p style="background-color: #F8AC3C"> Add a car 
            <a href="#/carInsert"><img  title="add" src="icons/insert_H18.png" alt="plus"></a>
        </p>
        <div id="listHere" class="clickSort"></div>
    `;
    var contentDOM = document.getElementById(id);
    contentDOM.innerHTML = content;

    // invoke ajax function to read cars.json and if the call was successful, 
    // run function processJSON, otherwise, put an error message in the DOM element 
    // that has id "listHere".
    ajax({
            url: "webAPIs/listCarsAPI.jsp",
            successFn: processData, 
            errorEle: "listHere"
        });

    function processData(list) {
        //if an error occurred, put the message in the dom and return
        if (list.dbError.length > 0) {
            contentDOM.innerHTML += "Database Error Encountered: " + list.dbError;
            return;
        }
        
        console.log(list);  // car list as an array of objects
        
        var headerDiv = document.createElement("div");
        headerDiv.style.textAlign = "center";
        document.getElementById("listHere").appendChild(headerDiv);

        //headerDiv is just a div for the title and searchbox
        headerDiv.innerHTML = `
            <h2>Car List</h2>
            Search Filter:
        `;

        //add the search box
        var searchBox = document.createElement("input");
        searchBox.setAttribute("type", "text");
        headerDiv.appendChild(searchBox);

        //add the div that will be the table
        var tableDiv = document.createElement("div");
        document.getElementById("listHere").appendChild(tableDiv);
        
        //format the JSON data before injecting the table into the page
        var dataList = list.carList;    //ONLY the car list, without DBError

        for (var i = 0; i < dataList.length; i++) {
            dataList[i].carImg = "<img  src='" + list.carList[i].carImg + "'>";
             
            //add the update button for the user record   
            dataList[i].update = "<img class='icon' src='" + CRUD_icons.update 
                    + "' alt='update icon' onclick='cars.updateUI(" + dataList[i].carId + ", `" + id + "` )' />";
                
            dataList[i].delete = "<img class='icon' src='" + CRUD_icons.delete 
                    + "' alt='delete icon' onclick='cars.delete(" + dataList[i].carId + ", `" + id + "`,this)' />";
        }
        
        // Making a DOM object, nothing shows yet... 
        tableBuilder.build({
            list: dataList,
            target: tableDiv,
            style: "data",
            orderPropName: "carId",
            searchKeyElem: searchBox,
            reverse: false,
            imgWidth: "50px"
        });
    }    
};

cars.insertUI = function (targetId) {
    console.log("cars.insertUI function - targetId is " + targetId);
    createInsertUpdateArea(false, targetId)

}; // cars.insertUI


cars.insertSave = function () {

    console.log("cars.insertSave was called");
    window.location.hash = "#/carInsert";
    
    // create a car object from the values that the user has typed into the page.
    var myData = getUserDataFromUI();

    ajax({
        url: "webAPIs/insertCarsAPI.jsp?jsonData=" + myData,
        successFn: processInsert,
        errorEle: "recordError"
    });

    function processInsert(jsonObj) {

        // the server prints out a JSON string of an object that holds field level error 
        // messages. The error message object (conveniently) has its fiels named exactly 
        // the same as the input data was named. 

        if (jsonObj.errorMsg.length === 0) { // success
            jsonObj.errorMsg = "Record successfully inserted !!!";
        }

        writeErrorObjToUI(jsonObj);
    }
};

cars.updateUI = function (carId, targetId) {

    // This is needed to "reset" the application's perception of the "current" link. 
    // Otherwise, when the user tries to click on "user list" after doing a user list -> update
    // operation, there will be no response (because link would not change). 
    // Setting window.location.hash is like auto-clicking for the user (in code). 
    // But also in index.html, you have to add a routing rule for this link and associate 
    // it will a null function (a do nothing function) - to avoid a routing error.
    window.location.hash = "#/carUpdate";
    createInsertUpdateArea(true, targetId); // first param is isUpdate (boolean)
    
    ajax({
        url: "webAPIs/getCarWithUsersAPI.jsp?id=" + carId,
        successFn: proceed,
        errorEle: "targetId"
    });
    
    function proceed(obj) { // obj is what got JSON.parsed from Web API's output
        dbDataToUI(obj);
    }
};

cars.updateSave = function () {

    console.log("cars.updateSave was called");

    // create a user object from the values that the user has typed into the page.
    var myData = getUserDataFromUI();    
    ajax({
        url: "webAPIs/updateCarAPI.jsp?jsonData=" + myData,
        successFn: processUpdate,
        errorEle: "recordError"
    });

    function processUpdate(jsonObj) {

        // the server prints out a JSON string of an object that holds field level error 
        // messages. The error message object (conveniently) has its fiels named exactly 
        // the same as the input data was named. 

        if (jsonObj.errorMsg.length === 0) { // success
            jsonObj.errorMsg = "Record successfully updated !!!";
        }

        writeErrorObjToUI(jsonObj);
    }

};

cars.delete = function (carId, targetId, icon) {
    if (confirm("Do you really want to delete car " + carId + "? ")) {
        console.log("icon that was passed into JS function is printed on next line");
        console.log(icon);

        // TODO: HERE YOU HAVE TO CALL THE DELETE API and the success function should run the 
        // following (delete the row that was clicked from the User Interface).

        //get the "data" div made by the table builder to put the error msg
        ajax({
            url: "webAPIs/deleteCarAPI.jsp?deleteId=" + carId,
            successFn: proceed,
            errorEle: targetId
        });

        function proceed(obj) { // obj is what got JSON.parsed from Web API's output
            console.log(obj);

            // icon's parent is cell whose parent is row 
            var dataRow = icon.parentNode.parentNode;
            var rowIndex = dataRow.rowIndex - 1; // adjust for oolumn header row?
            var dataTable = dataRow.parentNode;
            dataTable.deleteRow(rowIndex);

            alert("The car has been deleted.");
        }
    }
};

// a private function
function getUserDataFromUI() {

    var pickList = document.getElementById("UserIdPickList");
    
    //adding code to trim the $ off the dollar amt
    var dollaramt = document.getElementById("carPrice").value.toString();
    if(dollaramt !== null){
        dollaramt = dollaramt.replace("$", "");
        dollaramt = dollaramt.replace(",", "");
    }
    
    // create a car object from the values that the user has typed into the page.
    var carInputObj = {
        "carId": document.getElementById("carId").value,
        "carTitle": document.getElementById("carTitle").value,
        "carImg": document.getElementById("carImg").value,
        "carDesc": document.getElementById("carDesc").value,
        "carPrice": dollaramt,
        "webUserId": pickList.options[pickList.selectedIndex].value,
        "carDate": document.getElementById("carDate").value
    };

    console.log(carInputObj);

    // JSON.stringify converts the javaScript object into JSON format 
    // (the reverse operation of what gson does on the server side).
    // 
    // Then, you have to encode the car's data (encodes special characters 
    // like space to %20 so the server will accept it with no security error. 
    return encodeURIComponent(JSON.stringify(carInputObj));
}

function dbDataToUI(obj) {
    var idList = obj.webUserIds.idList;
    
    document.getElementById("carId").value = obj.car.carId;
    document.getElementById("carTitle").value = obj.car.carTitle;
    document.getElementById("carImg").value = obj.car.carImg;
    document.getElementById("carDesc").value = obj.car.carDesc;
    document.getElementById("carPrice").value = obj.car.carPrice;
    document.getElementById("carDate").value = obj.car.carDate;
    console.log("selected user id is " + obj.car.webUserId);
    
    Utils.makePickList({
        id: "UserIdPickList", // id of <select> tag in UI
        list: idList, // JS array that holds objects to populate the select list
        valueProp: "webUserId", // field name of objects in list that hold the values of the options
        keyProp: "webUserId", // field name of objects in list that hold the keys of the options
    });
};

// pull out common code (between insert UI and update UI).
function createInsertUpdateArea(isUpdate, targetId) {

    // set variables as if it will be insert...
    var carIdRowStyle = ' style="display:none" '; // hide row with webUserId
    var saveFn = "cars.insertSave()";

    // change variables for update
    if (isUpdate) {
        carIdRowStyle = ""; // don't hide row with webUserId 
        saveFn = "cars.updateSave()";
    }

    var html = `
        <div id="insertArea">
            <br/>
            <table>
                <tr>
                    <tr ${carIdRowStyle}>
                        <td>Car Id</td>
                        <td><input type="text"  id="carId" disabled /></td>
                        <td id="carIdError" class="error"></td> 
                    </tr>
                    <td>Car Title: </td>
                    <td><input type="text"  id="carTitle" /></td>
                    <td id="carTitleError" class="error"></td> 
                </tr>
                <tr>
                    <td>Car Image: </td>
                    <td><input type="text"  id="carImg" /></td>
                    <td id="carImgError" class="error"></td>
                </tr>
                <tr>
                    <td>Car Desc: </td>
                    <td><input type="text" id="carDesc" /></td>
                    <td id="carDescError" class="error"></td>
                </tr>
                <tr>
                    <td>Car Price</td>
                    <td><input type="text" id="carPrice" /></td>
                    <td id="carPriceError" class="error"></td>
                </tr>
                <tr>
                    <td>Date Aquired: </td>
                    <td><input type="text" id="carDate" /></td>
                    <td id="carDateError" class="error"></td> 
                </tr>
                <tr>
                    <td>Web user id: </td>
                    <td>
                        <select id="UserIdPickList">
                        <!-- JS code will make ajax call to get all the roles 
                        then populate this select tag's options with those roles -->
                        </select>
                    </td>
                    <td id="userIdError" class="error"></td>
                </tr>
                <tr>
                    <!-- make sure button references the js file -->
                    <td><button onclick="${saveFn}">Save</button></td>
                    <td id="recordError" class="error"></td>
                    <td></td>
                </tr>
            </table>
        </div>
    `;
    document.getElementById(targetId).innerHTML = html;
}

function writeErrorObjToUI(jsonObj) {
    console.log("here is JSON object (holds error messages.");
    console.log(jsonObj);

    document.getElementById("carTitleError").innerHTML = jsonObj.carTitle;
    document.getElementById("carImgError").innerHTML = jsonObj.carImg;
    document.getElementById("carDescError").innerHTML = jsonObj.carDesc;
    document.getElementById("carPriceError").innerHTML = jsonObj.carPrice;
    document.getElementById("carDateError").innerHTML = jsonObj.carDate;
    document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
}