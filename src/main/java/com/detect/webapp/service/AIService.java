package com.detect.webapp.service;

import java.io.IOException;
import java.util.List;

import com.detect.webapp.repository.CustomClass;
import com.detect.webapp.repository.FileResponseDTO;
import org.springframework.web.multipart.MultipartFile;

public interface AIService {
	public FileResponseDTO detect(MultipartFile file, String type, String polygonJson) throws IOException;
}
