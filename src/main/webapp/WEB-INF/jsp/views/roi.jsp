<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <link rel="stylesheet" href="/css/common.css">
  <link rel="stylesheet" href="/css/detect.css">
  <link rel="stylesheet" href="/css/roi.css">
</head>
<body>
<%@ include file="/WEB-INF/jsp/common/header.jsp" %>

<main class="main-content">
  <div class="container">
    <section class="roi-section">
      <h2>ROI Detection</h2>
      <p>관심 영역(Region of Interest)을 설정하여 특정 구역만 탐지할 수 있습니다.</p>

      <div class="roi-container">
        <!-- 이미지 업로드 영역 -->
        <div class="upload-section">
          <div class="upload-box" id="roiUploadBox">
            <div class="upload-content">
              <div class="upload-icon">📁</div>
              <p>이미지를 업로드하여 ROI를 설정하세요</p>
              <input type="file" id="roiImageInput" accept="image/*" style="display: none;">
              <button class="btn btn-primary" onclick="$('#roiImageInput').click()">
                파일 선택
              </button>
            </div>
          </div>
        </div>

        <!-- ROI 설정 영역 -->
        <div class="roi-workspace" id="roiWorkspace" style="display: none;">
          <div class="roi-controls">
            <h3>ROI 설정</h3>
            <div class="control-buttons">
              <button class="btn btn-warning" onclick="clearAllROI()">모든 ROI 삭제</button>
              <button class="btn btn-success" onclick="startROIDetection()" id="roiDetectBtn" disabled>
                ROI Detection 시작
              </button>
              <button class="btn btn-warning" onclick="clearROIImage()">이미지 재선택</button>
            </div>
            <div class="roi-info">
              <p>이미지를 클릭하여 점을 찍고, 우클릭으로 종료하여 관심 영역을 설정하세요.</p>
              <p>설정된 ROI 개수: <span id="roiCount">0</span></p>
            </div>
          </div>

          <div class="image-canvas-container">
            <canvas id="roiCanvas" width="800" height="600"></canvas>
            <div class="canvas-overlay" id="canvasOverlay"></div>
          </div>
        </div>

        <!-- ROI 목록 -->
        <div class="roi-list-section" id="roiListSection" style="display: none;">
          <h3>설정된 ROI 목록</h3>
          <div class="roi-list" id="roiList">
            <!-- ROI 목록이 여기에 표시됩니다 -->
          </div>
        </div>

        <!-- 결과 영역 -->
        <div class="roi-results-area" id="roiResultsArea" style="display: none;">
          <h3>ROI Detection 결과</h3>
          <div class="results-tabs">
            <button class="tab-btn active" onclick="showResultTab('summary')">결과</button>
            <button class="tab-btn" onclick="showResultTab('detailed')" style="display: none;">상세</button>
            <button class="tab-btn" onclick="showResultTab('statistics')" style="display: none;">통계</button>
          </div>
          <div class="results-content">
            <div id="summaryTab" class="tab-content active">
              <!-- 요약 결과 -->
            </div>

            <%--                        <div id="detailedTab" class="tab-content">--%>
            <%--                            <!-- 상세 결과 -->--%>
            <%--                        </div>--%>
            <%--                        <div id="statisticsTab" class="tab-content">--%>
            <%--                            <!-- 통계 결과 -->--%>
            <%--                        </div>--%>

          </div>
        </div>
      </div>
    </section>
  </div>
</main>

<script src="/js/roi.js"></script>
</body>
</html>
