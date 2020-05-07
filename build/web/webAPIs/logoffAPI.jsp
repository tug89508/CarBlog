<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData emptyUser = new StringData();
    
    // This object (from the GSON library) can to convert between JSON <-> POJO (plain old java object) 
    Gson gson = new Gson();
    
    if(session.getAttribute("webUser") == null){
        emptyUser.errorMsg = "No profile was found";
    }else{
        session.invalidate();
        emptyUser.errorMsg = "You have been logged out.";
    }
    
    out.print(gson.toJson(emptyUser).trim());
%>
