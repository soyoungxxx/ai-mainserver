package com.detect.webapp.controller;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import com.detect.webapp.repository.CustomClass;
import com.detect.webapp.repository.FileResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.detect.webapp.service.impl.AIServiceImpl;

@Controller
public class AIController {
	
	@Autowired
	private AIServiceImpl AIServiceImpl;
	
	@PostMapping("/detect/simple")
	@ResponseBody
	public ResponseEntity<FileResponseDTO> detectImage(@RequestParam("file") MultipartFile file, @RequestParam("type") String type) throws IOException {
		FileResponseDTO result = AIServiceImpl.detect(file, type, "");
		return ResponseEntity.ok(result);
	}

	@PostMapping("/detect/roi")
	@ResponseBody
	public ResponseEntity<FileResponseDTO> detectImageROI(@RequestParam("file") MultipartFile file, @RequestParam("polygonJson") String polygonJson) throws IOException {
		System.out.println("good11111");
		FileResponseDTO result = AIServiceImpl.detect(
				file,
				"mix",
				polygonJson);
		System.out.println("good");
		return ResponseEntity.ok(result);
	}
}