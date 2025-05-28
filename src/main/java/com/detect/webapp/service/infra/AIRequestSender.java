package com.detect.webapp.service.infra;

import com.detect.webapp.repository.CustomClass;
import com.detect.webapp.repository.FileResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Objects;

@Component
public class AIRequestSender {

    private final WebClient webClient;

    @Value("${AI_SERVER}")
    private String AI_SERVER;

    public AIRequestSender(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(AI_SERVER).build();
    }

    public FileResponseDTO sendMultipart(String type, MultipartFile file, String polygonJson) throws IOException {
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        String fileName = new String(Objects.requireNonNull(file.getOriginalFilename()).getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8);
        builder.part("file", file.getResource())
                .filename(fileName)
                .contentType(MediaType.APPLICATION_OCTET_STREAM);

        builder.part("polygon_json", polygonJson)
                .contentType(MediaType.TEXT_PLAIN);

        return webClient.post()
                .uri(AI_SERVER + "predict/{type}", type)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(BodyInserters.fromMultipartData(builder.build()))
                .retrieve()
                .bodyToMono(FileResponseDTO.class)
                .onErrorResume(e -> {
                    e.printStackTrace();
                    return Mono.empty(); // 예외 발생 시 null 반환
                })
                .block(); // 동기 방식으로 결과 받기
    }
}
