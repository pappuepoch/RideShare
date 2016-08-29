package com.rideshare.tags;

import java.io.IOException;
import java.io.StringWriter;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.SimpleTagSupport;

public class TextInput extends SimpleTagSupport {
	String name;
	String size;
	StringWriter sw = new StringWriter();

	public void doTag() throws JspException, IOException // render custom tag
	{
		JspWriter out = getJspContext().getOut();

		out.write(String.format("<input type='text' id='%s' name='%s' size='%s' />", name, name, size));
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

}
