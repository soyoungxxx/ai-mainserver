<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>AI Detecting</title>
<link rel="stylesheet" href="/css/detect.css"/>
<link rel="stylesheet" href="/css/common.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>
<%@ include file="../common/header.jsp" %>
<main class="main-content">
        <div class="container">
            <section class="detection-section">
                <h2>Object Detection</h2>
                <p>어떤 객체를 탐지할지 선택해주세요.</p>
                <div class="btn-container">
	                <button class="btn btn-select" id="object" onclick="selectMenu(this.id)">일반 객체 탐지</button>
	                <button class="btn btn-select" id="water-body" onclick="selectMenu(this.id)">수체 탐지</button>
	                <button class="btn btn-select" id="mix" onclick="selectMenu(this.id)">일반 객체 + 수체 탐지</button>
                </div>
                <div class="detection-container">
                    <div class="upload-area">
                        <div class="upload-box" id="uploadBox">
                            <div class="upload-content">
                                <div class="upload-icon">📁</div>
                                <p>이미지를 드래그하거나 클릭하여 업로드하세요</p>
                                <input type="file" id="imageInput" accept="image/*" style="display: none;" onchange="uploadFile(this.id)">
                                <button class="btn btn-primary" onclick="document.getElementById('imageInput').click()">
                                    파일 선택
                                </button>
                            </div>
                        </div>
                        
                        <div class="image-preview" id="imagePreview" style="display: none;">
                            <img id="previewImg" src="" alt="Preview">
                            <img id="completeImg" src="" alt="Detecting" style="display: none;"/> <br/>
                            <button class="btn btn-danger" onclick="clearImage()">이미지 제거</button>
                        </div>
                    </div>
                    
                    <div class="detection-controls">
                        <button class="btn btn-success" id="detectBtn" onclick="handleImagePredict()" disabled>
                            Detection 시작
                        </button>
                        <button class="btn btn-secondary" onclick="resetDetection()">
                            초기화
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </main>
</body>
    <script src="/js/detect.js"></script>
    <script src="/js/aiHandler.js"></script>
</html>