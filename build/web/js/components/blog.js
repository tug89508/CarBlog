function blog(id) {

// ` this is a "back tick". Use it to define multi-line strings in JavaScript.
var content = `  
    <style>
    h2 {
      margin-left:-1em;
    }
    </style>

    <div style="margin-left:2em;padding-top: 40px;">
        <h2>HW 1 Home Page</h2>
        <p>
            I started this semester with little to no knowledge on web development.
            I took this class with the hopes of gaining some web development experience,
            to see whether or not this may be a field I want to pursue after graduating.
            I was able to take a short course during high school on HTML, so I came into
            this class with minimal knowledge on the inner-workings of HTML and CSS.
        </p>
        <p>
            In this homework I learned how to set up and style a web page in HTML and CSS. 
            The parts that I found easy were deciding on a color theme, choosing a photo, and designing the actual page.
            The part that I found hard or confusing was getting used to the workflow of HTML and CSS, and the 
            generalities of front-end development.
        </p>
    
        <h2>HW 2 DB &amp; JavaScript Routing</h2>
        <p>
            I had no database experience prior to this assignment. I have merely heard of SQL
            and knew that it was for database programming, but that was the extent of my knowledge.
        </p>
        <p>
            In the database part of the homework I learned how to set up a database within a website, 
            how to form relationships between tables of data, and how to filter and search the data within.
            The parts that I found easy were navigating MySQLWorkbench, implementing the weekly source code into
            my existing codebase. 
            The parts that I found hard or confusing was using proper SQL syntax when doing the select queries. 
            Click <a href="week2caps.docx">here</a> to see my database work.
        </p>
        <p>
            In the website part of the homework I learned how to reuse portions of the User Interface 
            with a home grown "Routing Framework". I also got more practice with modifying the codebase
            to implement new changes. 
            The part that I found easy was implementing the additional JS files into the web folder and
            referencing them properly. 
            The part that I found hard or confusing was getting the dropdown framework to work with 
            the routing framework.
        </p>
    
        <h2>HW 3 Display Data</h2>
        <p>
            In this homework, I learned about JSON and how it is used to format Java objects. I also
            learned about AJAX and how it is used to retreive Javscript files. The part that I found easy
            in this assignment was obviously hard-coding the JSON data with fields from our database.
            The part that I found difficult was combining the pieces of a click-sortable table and 
            a filtered table to create an object that does both. 
        </p>
        <p>
            To check out the new tables, click on the search menu icon and go to either the users or cars tab.
            These tables are not only click-sortable but also are filterable with the text box at the top.
        </p>

        <h2>HW 4 Slide Show</h2>
        <p>
            In this homework I learned about how to use slideshows as a way to display my site's image data. 
            The part that I found easy was implementing an adaptable JS object to pass to my MakeSlideShow function, 
                so that I could use it for both slideshows. 
            The part that I struggled with was combining the code for multiple slideshows with the code that uses
                the AJAX call, which parses the JSON files, to get the image URL. 
        </p>
        
        <p>
            To see my slide show, click the last entry under the search icon.
        </p>
    
        <h2>HW 5 Web APIs</h2>
        <p>
            In this homework I learned how to create web APIs for data that exists in my database.
            The part that I found easy were creating the SQL select statements that would contain elements of my tables.
            The part that I found hard or confusing was getting the link of the new jsp file to work with the ajax function. 
        </p>
        <ul>
            <li>
                Click <a href="week5errors.docx">here</a> to see my document about java DB access errors
            </li>
            <li>
                To invoke my user list Web API, click <a target="_blank" href="webAPIs/listUsersAPI.jsp">here</a>.
            </li>
            <li>
                To invoke my car list Web API, click <a target="_blank" href="webAPIs/listCarsAPI.jsp">here</a>.
            </li>
        </ul>

        <h2>HW 6 Log On</h2>
        <p>
            In this homework I learned how to write APIs for logging in to the website by putting user data in the session.
            The part that I found easy was the back-end API code. 
            what I found hard was getting the front end of the logon and logoff features to work properly.
        </p>
        <ul>
            <li>
                To see how my Log On code works, click on these items under the 
                account icon: "Log On", "Profile", and "Log Off". You'll only see 
                the profile information if you are logged on.
            </li>
        </ul>

        <h2>HW 7 Insert or Tutorial</h2>

        <p>
            In the insert homework  I learned how to write an API to insert a record into a SQL database 
            The part that I found easy was writing the actual API piece. 
            The part that I found hard or confusing was the Javascript component, and getting the URL
            tampering to work properly. 
        </p>
        <ul>
            <li>
                To see how insert user works, click on the plus sign at the top of the 
                user listing page -OR- click on the "register" item under the account icon. 
            </li>
            <li>
                To see how insert [other] works, click on the plus sign at the top of the 
                [other] data display page.
            </li>
        </ul>    

        <h2>HW 8 Update</h2>
        <p>
            In this homework I learned how to update records in our SQL databases. 
            The parts that I found easy were writing the API and testing the URLS. 
            The part that I found hard or confusing was implementing the necessary 
            javascript to incorportate it into the site. 
        </p>
        <ul>
            <li>
                To run this code, click to list the data (under the search icon from the nav bar)
                then click the update icon next to the row you want to update. 
            </li>
        </ul>
        
        <h2>HW 9 Delete</h2>
        <p>
            In this homework I learned how to delete a record from our SQL databases. 
            For this assignment, I did not have very much difficulty with any of the process. 
            The most challenging part was honestly getting the syntax correct when setting up 
            the onClick functionality for the delete icons. 
        </p>
        <ul>
            <li>
                To run this code, click to list the data (under the search icon from the nav bar) 
                then click the delete icon next to the record you want to delete.  
            </li>
        </ul>
    </div>
    `;
    document.getElementById(id).innerHTML = content;
}