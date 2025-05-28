package com.detect.webapp.service.impl;

import java.io.IOException;
import java.util.Currency;
import java.util.List;

import com.detect.webapp.repository.CustomClass;
import com.detect.webapp.repository.FileResponseDTO;
import com.detect.webapp.service.AIService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.detect.webapp.service.infra.AIRequestSender;

@Service()
public class AIServiceImpl implements AIService {
	private final AIRequestSender aiRequestSender;
	
	public AIServiceImpl(AIRequestSender aiRequestSender) {
        this.aiRequestSender = aiRequestSender;
    }
	
	@Override
	public FileResponseDTO detect(MultipartFile file, String type, String polygonJson) throws IOException {
		return aiRequestSender.sendMultipart(type, file, polygonJson);
	}
}