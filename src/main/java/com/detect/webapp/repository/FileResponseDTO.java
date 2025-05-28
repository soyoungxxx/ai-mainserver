package com.detect.webapp.repository;

import lombok.Data;

import java.util.Map;

@Data
public class FileResponseDTO {
    private String output;
    private Map<String, Float> data;
}
