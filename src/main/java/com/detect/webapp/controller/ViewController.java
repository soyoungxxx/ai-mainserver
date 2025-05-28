package com.detect.webapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ViewController {
	@GetMapping("/")
	public String root() {
		return "redirect:/home";
	}
	
	@GetMapping("/{page}")
	public String forwardPage(@PathVariable String page) {
		return page;
	}
}