package com.rideshare.tags;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.SimpleTagSupport;

public class RadioInput extends SimpleTagSupport {

	String name;
	HashMap<String, String> options = new HashMap<String, String>();;
	String checked;
	StringWriter sw = new StringWriter();

	public void doTag() throws JspException, IOException // render custom tag
	{
		JspWriter out = getJspContext().getOut();
		Iterator it = options.entrySet().iterator();
		while (it.hasNext()) {
			Map.Entry pair = (Map.Entry) it.next();
			// System.out.println(pair.getKey() + " = " + pair.getValue());
			if (checked.equals(pair.getValue())) {
				out.write(String.format("<input type='radio' name='%s' value='%s' checked> %s <br>", name, pair.getKey(),
						pair.getValue()));
			} else {
				out.write(
						String.format("<input type='radio' name='%s' value='%s'> %s <br>", name, pair.getKey(), pair.getValue()));
			}

		}

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public HashMap<String, String> getOptions() {
		return options;
	}

	public void setOptions(HashMap<String, String> options) {
		this.options = options;
	}

	public String getChecked() {
		return checked;
	}

	public void setChecked(String checked) {
		this.checked = checked;
	}

}
