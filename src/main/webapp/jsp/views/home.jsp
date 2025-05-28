<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<head>
<title>AI Detecting</title>
<!-- 실시간 탐지
<script src="http://192.168.0.32:8088/players/js/srs.sdk.js"></script>
<script src="https://ossrs.net/srs.release/4.0/rtc-player.js"></script>
-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<script src="/js/aiHandler.js"></script>

<link rel="stylesheet" href="/css/common.css">
<link rel="stylesheet" href="/css/home.css">

</head>

<body>
	<%@ include file="/jsp/common/header.jsp"%>
	<main class="main-content">
        <div class="container">
            <section class="hero-section">
                <h2>AI Detection 시스템에 오신 것을 환영합니다</h2>
                <p>다양한 AI Detection 기능을 체험해보세요.</p>
                
                <div class="feature-grid">
                    <div class="feature-card">
                        <h3>Simple Detection</h3>
                        <p>간단한 객체 탐지 기능</p>
                        <a href="detect" class="btn btn-primary">Detection 시작</a>
                    </div>
                    
                    <div class="feature-card">
                        <h3>관심 영역 설정</h3>
                        <p>관심 영역 설정 후, 해당 범위 내에서만 객체 탐지</p>
                        <a href="roi" class="btn btn-primary">Detection 시작</a>
                    </div>
                    
                    <div class="feature-card">
                        <h3>배치 처리</h3>
                        <p>여러 이미지를 한번에 처리할 수 있습니다.</p>
                        <button class="btn btn-secondary" onclick="showComingSoon()">준비중</button>
                    </div>
                </div>
            </section>

            <section class="stats-section" style="display:none;">
                <h3>시스템 현황</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-number">1,234</span>
                        <span class="stat-label">총 처리된 이미지</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">98.5%</span>
                        <span class="stat-label">정확도</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">0.3초</span>
                        <span class="stat-label">평균 처리 시간</span>
                    </div>
                </div>
            </section>
        </div>
    </main>
	<!--
	<h2>실시간 영상</h2>
	<video id="rtc-container" autoplay playsinline muted style="width: 960px; height: 540px; background: black;"></video>

	<script>
	document.addEventListener('DOMContentLoaded', async () => {
		  const streamUrl = "webrtc://localhost/live/livestream";
		  const domVideo = document.getElementById("rtc-container");

		  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
		  await delay(3000); // 1초 대기

		  const player = new SrsRtcPlayerAsync();

		  try {
		    await player.play(streamUrl);
		    const internalVideo = player.video;

		    if (!internalVideo || !internalVideo.srcObject) {
		      console.error("❌ stream 없음 (video or srcObject가 없음)");
		      return;
		    }

		    domVideo.srcObject = internalVideo.srcObject;
		    await domVideo.play();

		    console.log("✅ 연결 성공");
		  } catch (e) {
		    console.error("❌ WebRTC 연결 실패:", e);
		  }
		});

	</script>
	-->
</body>
</html>
