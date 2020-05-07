function slideShows(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
        <style>
            .slideShow{
                float: left; 
                box-sizing: border-box; 
                width: 33.3%;
            }
            .slideShow img {
                width: 75%;
            }
        </style>
        <p></p>
    
    `;
    
    var contentArea = document.getElementById(id);
    contentArea.innerHTML = content;
    
    
    //SLIDESHOW 1
    var ssDiv1 = document.createElement("div"); //creates the div for the first slideshow
    contentArea.appendChild(ssDiv1);    //appends this div to the content area
    
    //call the ajax file which gets the JSON file and converts it to a js ojbect
    ajax({
                url: "json/users.json",
                successFn: success,
                errorEle: document.getElementById(id)
            });

            function success(userList) {
                console.log(userList);

                var ss1 = MakeSlideShow({
                    slideShowEle: ssDiv1, // id in which to render slideshow,
                    objList: userList,    // array of objects with image and caption
                    picPropName: "image",
                    captPropName: "userEmail"
                });
                // Example showing why you need to get the ss reference, so the HTML page can invoke 
                // any public methods that may be available from the returned slide show object.
                ss1.goToLast();
            }   //END SLIDESHOW 1

    //SLIDESHOW 2
    var ssDiv2 = document.createElement("div"); //creates the div for the first slideshow
    contentArea.appendChild(ssDiv2);    //appends this div to the content area
    
    //call the ajax file which gets the JSON file and converts it to a js ojbect
    ajax({
                url: "json/cars.json",
                successFn: success2,
                errorEle: document.getElementById(id)
            });

            function success2(carList) {
                console.log(carList);
                var ss2 = MakeSlideShow({
                    slideShowEle: ssDiv2, // id in which to render slideshow,
                    objList: carList,    // array of objects with image and caption
                    picPropName: "carImg"
                });
                // Example showing why you need to get the ss reference, so the HTML page can invoke 
                // any public methods that may be available from the returned slide show object.
                ss2.goToLast();
            }   //END SLIDESHOW 2
           
    // create second slideshow object
    //var otherPicList = ["pic4.png", "pic5.png", "pic6.png"];
    //var ssDiv2 = document.createElement("div");
    //contentArea.appendChild(ssDiv2);
    //var ss2 = MakeSlideShow(ssDiv2, myFolder, otherPicList);
}