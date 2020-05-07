<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="com.google.gson.*" %>

<%    
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    
    if(session.getAttribute("webUser") == null){
        //if no web user found, build an empty string data object 
        //and put a message in the errormsg attribute 
        
        StringData emptyUser = new StringData();
        emptyUser.errorMsg = "No profile was found";
        out.print(gson.toJson(emptyUser).trim());
    }else{
        // must use same name for getAttribute as you used for setAttribute in the logon API
        // must type class the object that is extracted.
        StringData loggedOnWebUser = (StringData) session.getAttribute("webUser");  
        out.print(gson.toJson(loggedOnWebUser).trim());
    }
    
%>