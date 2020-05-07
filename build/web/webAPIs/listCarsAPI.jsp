<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.car.*" %> 
<%@page language="java" import="view.CarView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%    
    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    CarStringDataList list = new CarStringDataList();
    
    DbConn dbc = new DbConn();
    list.dbError = dbc.getErr(); // returns "" if connection is good, else db error msg.

    if (list.dbError.length() == 0) { // if got good DB connection,

        System.out.println("*** Ready to call allUsersAPI");
        list = CarView.allUsersAPI(dbc);
    }

    dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.

    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    out.print(gson.toJson(list).trim());
%>