<%@page import="view.WebUserIdView"%>
<%@page import="view.RoleView"%>
<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.car.*" %> 
<%@page language="java" import="view.CarView" %> 
<%@page language="java" import="com.google.gson.*" %>
<%@page import="view.WebUserIdView"%>
<%@page import="view.RoleView"%>
<%

    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    //WebUserWithRoles webUserWithRoles = new WebUserWithRoles();
    CarWithUsers carWithUsers = new CarWithUsers();

    String searchId = request.getParameter("id");
    if (searchId == null) {
        carWithUsers.car.errorMsg = "Cannot search for car - 'id' most be supplied";
    } else {

        DbConn dbc = new DbConn();
        carWithUsers.car.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

        if (carWithUsers.car.errorMsg.length() == 0) { // if got good DB connection,

            System.out.println("*** Ready to call allUsersAPI");
            carWithUsers.car = CarView.getCarAPI(dbc, Integer.valueOf(searchId)); //Get car by Id
            
            carWithUsers.webUserIds = WebUserIdView.getAllRoles(dbc); //Gets all web user ids
        }

        dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
    }
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(carWithUsers).trim());
%>