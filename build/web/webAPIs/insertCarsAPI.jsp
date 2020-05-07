<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.DbConn" %>
<%@page language="java" import="model.car.*" %>
<%@page language="java" import="model.webUser.StringData" %>

<%@page language="java" import="com.google.gson.*" %>



<%

    // This is the object we get from the GSON library.
    // This object knows how to convert betweeb these two formats: 
    //    POJO (plain old java object) 
    //    JSON (JavaScript Object notation)
    Gson gson = new Gson();

    DbConn dbc = new DbConn();
    CarStringData errorMsgs = new CarStringData();

    String jsonInsertData = request.getParameter("jsonData");
    if (jsonInsertData == null) {
        errorMsgs.errorMsg = "Cannot insert -- no data was received";
        System.out.println(errorMsgs.errorMsg);
    } else {
        System.out.println("jsonInsertData is " + jsonInsertData);
        errorMsgs.errorMsg = dbc.getErr();
        if (errorMsgs.errorMsg.length() == 0) { // means db connection is ok
            System.out.println("insertUserAPI.jsp ready to insert");
            
            // Must use gson to convert JSON (that the user provided as part of the url, the jsonInsertData. 
            // Convert from JSON (JS object notation) to POJO (plain old java object).
            CarStringData insertData = gson.fromJson(jsonInsertData, CarStringData.class);
            // now we need to get the logged-on web user, retrieve their web_user_id, and 
            // set the webUserId attribute in insertData to that ID.
            if((StringData)session.getAttribute("webUser") == null){
                errorMsgs.errorMsg = "You must be logged in to insert a car";
            }
            else{
                String webUserId = ((StringData) session.getAttribute("webUser")).webUserId;  
                System.out.println("webUserId: " + webUserId);
                insertData.webUserId = webUserId;

                // this method takes the user's input data as input and outputs an error message object (with same field names).
                errorMsgs = DbMods.insert(insertData, dbc); // this is the form level message
            }
        }
    }

    out.print(gson.toJson(errorMsgs).trim());
    dbc.close();
%>

