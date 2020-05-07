<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.car.*" %> 
<%@page language="java" import="view.CarView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    // default constructor creates nice empty CarStringDataList with all fields "" (empty string, nothing null).
    CarStringData car = new CarStringData();
    
    DbConn dbc = new DbConn(); 
    car.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.
    
    String id = request.getParameter("id");
    if(id == null){
        car.errorMsg = "An ID must be specified.";
    }//an id has been specified
    else{
        if (car.errorMsg.length() == 0) { // if got good DB connection,
            System.out.println("*** Ready to call getCarAPI");
            try{
                car = CarView.getCarAPI(dbc, Integer.valueOf(id));
            }catch(Exception e){
                e.printStackTrace();
            }
        }
        
    }
    // PREVENT DB connection leaks:
    dbc.close(); // EVERY code path that opens a db connection, must also close it.

    Gson gson = new Gson();
    out.print(gson.toJson(car).trim()); 
%>