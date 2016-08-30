package com.rideshare.tags;

import java.io.IOException;
import java.io.StringWriter;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.SimpleTagSupport;

public class TextInput extends SimpleTagSupport {
	String name;
	String size;
	String value;
	String cssClass;
	StringWriter sw = new StringWriter();

	public void doTag() throws JspException, IOException // render custom tag
	{
		JspWriter out = getJspContext().getOut();
		String val = (value==null||"".equals(value))?"":value;
		out.write(String.format("<input type='text' id='%s' name='%s' size='%s' value='%s' class='%s' />", name, name, size, val,cssClass));
	}

	public String getName() {
		return name; 
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getCssClass() {
		return cssClass;
	}

	public void setCssClass(String cssClass) {
		this.cssClass = cssClass;
	}

}
