<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%!
String base_href ="http://localhost:8080/MyRideShare/" ;
%>
<!-- base_href : <%=base_href %> -->
<!-- <base href="${fn:replace(req.requestURL, fn:substring(uri, 0, fn:length(uri)), req.contextPath)}" /> -->
<base href="<%=base_href %>" /> 
