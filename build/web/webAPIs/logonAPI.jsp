<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    StringData user = new StringData();
    
    String email = request.getParameter("userEmail");
    String password = request.getParameter("userPassword");
    
    if (email == null) {
        user.errorMsg = "Cannot search for user - 'Email' must be supplied";
    } else if(password == null){
        user.errorMsg = "Cannot search for user = 'password' must be supplied";
    }else {

        DbConn dbc = new DbConn();
        user.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

        if (user.errorMsg.length() == 0) { // if got good DB connection,
            
            System.out.println("*** Ready to call logonAPI");
            user = DbMods.logonFind(dbc, email, password);  
            session.setAttribute("webUser", user); // make up whatever name you want for 2nd parameter  
        }

        dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
    }
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(user).trim());
%>