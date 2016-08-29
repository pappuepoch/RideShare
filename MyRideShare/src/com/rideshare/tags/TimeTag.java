package com.rideshare.tags;

import java.io.IOException;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.SimpleTagSupport;

public class TimeTag extends SimpleTagSupport {
	String color;
	String size;
	StringWriter sw = new StringWriter();

	public void doTag() throws JspException, IOException // render custom tag
	{
		JspWriter out = getJspContext().getOut();
		Date dNow = new Date();
		SimpleDateFormat format = new SimpleDateFormat("E yyyy.MM.dd 'at' hh:mm:ss a zzz");
		String date = format.format(dNow);
		System.out.println(size + " => " + color);
		// if (color != null && size != null)
		out.write(String.format("<span style='color:%s; font-size:%s' >%s</span>", color, size, date));
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

}
