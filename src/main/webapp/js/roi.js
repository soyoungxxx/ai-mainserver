// ROI Detection 페이지 JavaScript

let roiCanvas, roiCtx;
let uploadedImage = null;
let isDrawing = false;
let roiCounter = 0;
let polygonPoints = [];
let roiPolygons = [];

let file;


$(function () {
    initializeROI();
})

function initializeROI() {
    const roiImageInput = document.getElementById('roiImageInput');
    const roiUploadBox = document.getElementById('roiUploadBox');

    // 파일 입력 이벤트
    roiImageInput.addEventListener('change', handleROIImageSelect);

    // 드래그 앤 드롭 이벤트
    // roiUploadBox.addEventListener('dragover', handleDragOver);
    // roiUploadBox.addEventListener('drop', handleROIDrop);
    // roiUploadBox.addEventListener('dragleave', handleDragLeave);

    // 캔버스 초기화
    roiCanvas = $('#roiCanvas')[0];
    roiCtx = roiCanvas.getContext('2d');

    // 캔버스 이벤트
    roiCanvas.addEventListener('mousemove', drawPrevPoly);
    roiCanvas.addEventListener('click', drawPoly);
    roiCanvas.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if (polygonPoints.length >= 3) {
            endDrawPoly();
        }
        else alert('3개 이상 선택해주세요');
    });
}

function handleROIImageSelect(event) {
    file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        loadImageToCanvas(file);
    }
}

// function handleROIDrop(event) {
//     event.preventDefault();
//     event.currentTarget.style.backgroundColor = '#f8f9ff';
//
//     const files = event.dataTransfer.files;
//     if (files.length > 0 && files[0].type.startsWith('image/')) {
//         loadImageToCanvas(files[0]);
//     }
// }

function loadImageToCanvas(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // 캔버스 크기 조정
            const maxWidth = 800;
            const maxHeight = 600;
            let { width, height } = img;

            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }
            if (height > maxHeight) {
                width = (width * maxHeight) / height;
                height = maxHeight;
            }

            roiCanvas.width = width;
            roiCanvas.height = height;

            // 이미지 그리기
            roiCtx.drawImage(img, 0, 0, width, height);
            uploadedImage = img;

            // UI 업데이트
            showROIWorkspace();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function showROIWorkspace() {
    $('#roiUploadBox')[0].style.display = 'none';
    $('#roiWorkspace')[0].style.display = 'block';
    updateROIDetectButton();
}

// 폴리곤 그리기 이벤트
function drawPrevPoly(event) {
    if (!isDrawing) return;

    const rect = roiCanvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // 캔버스 다시 그리기
    redrawCanvas();

    // 기존 점들 그리기
    roiCtx.beginPath();
    roiCtx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
    for (let i = 1; i < polygonPoints.length; i++) {
        roiCtx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
    }

    // 마우스 위치까지 선 이어주기
    roiCtx.lineTo(mouseX, mouseY);
    roiCtx.strokeStyle = '#ff6b6b';
    roiCtx.lineWidth = 2;
    roiCtx.setLineDash([5, 5]);
    roiCtx.stroke();
    roiCtx.setLineDash([]);
}

function drawPoly(event) {
    if (!uploadedImage) return;

    const rect = roiCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 점 추가
    polygonPoints.push({ x, y });
    redrawCanvas();
}

function endDrawPoly(event) {
    const roi = {
        id: ++roiCounter,
        points: [...polygonPoints],
        name: `ROI ${roiCounter}`
    }

    roiPolygons.push(roi);
    polygonPoints = [];

    updateROIList();
    updateROICount();
    updateROIDetectButton();
    redrawCanvas();
}

function redrawCanvas() {
    // 캔버스 클리어
    roiCtx.clearRect(0, 0, roiCanvas.width, roiCanvas.height);

    // 이미지 다시 그리기
    if (uploadedImage) {
        roiCtx.drawImage(uploadedImage, 0, 0, roiCanvas.width, roiCanvas.height);
    }

    // ROI 박스들 다시 그리기
    roiPolygons.forEach(roi => {
        const points = roi.points;
        if (points.length >= 3) {
            roiCtx.beginPath();
            roiCtx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                roiCtx.lineTo(points[i].x, points[i].y);
            }
            roiCtx.closePath();
            roiCtx.strokeStyle = '#ff6b6b';
            roiCtx.lineWidth = 2;
            roiCtx.stroke();
            roiCtx.fillStyle = 'rgba(255, 107, 107, 0.3)';
            roiCtx.fill();

            const labelX = points[0].x;
            const labelY = points[0].y;

            // 배경 박스
            roiCtx.fillStyle = '#ff6b6b';
            roiCtx.fillRect(labelX, labelY - 20, roi.name.length * 8 + 10, 20);

            // 텍스트
            roiCtx.fillStyle = 'white';
            roiCtx.font = '12px Arial';
            roiCtx.fillText(roi.name, labelX + 5, labelY - 6);
        }
    });

    polygonPoints.forEach(p => {
        roiCtx.fillStyle = '#ff6b6b';
        roiCtx.beginPath();
        roiCtx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
        roiCtx.fill();
    });

    if (polygonPoints.length > 1) {
        roiCtx.beginPath();
        roiCtx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
        for (let i = 1; i < polygonPoints.length; i++) {
            roiCtx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
        }
        roiCtx.strokeStyle = '#ff6b6b';
        roiCtx.setLineDash([5, 5]);
        roiCtx.stroke();
        roiCtx.setLineDash([]);
    }
}

function clearAllROI() {
    if (roiPolygons.length === 0) {
        alert('삭제할 ROI가 없습니다.');
        return;
    }

    if (confirm('모든 ROI를 삭제하시겠습니까?')) {
        roiPolygons = [];
        roiCounter = 0;
        updateROIList();
        updateROICount();
        updateROIDetectButton();
        redrawCanvas();
    }
}

function deleteROI(roiId) {
    roiPolygons = roiPolygons.filter(roi => roi.id !== roiId);
    updateROIList();
    updateROICount();
    updateROIDetectButton();
    redrawCanvas();
}

function updateROIList() {
    const roiList = $('#roiList')[0];
    const roiListSection = $('#roiListSection')[0];

    if (roiPolygons.length === 0) {
        roiListSection.style.display = 'none';
        return;
    }

    roiListSection.style.display = 'block';

    roiList.innerHTML = roiPolygons.map(roi => `
        <div class="roi-item">
            <h4>${roi.name}</h4>
            <div class="roi-actions">
                <button class="btn btn-danger" onclick="deleteROI(${roi.id})">삭제</button>
            </div>
        </div>
    `).join('');
}

function updateROICount() {
    $('#roiCount')[0].textContent = roiPolygons.length;
}

function updateROIDetectButton() {
    const detectBtn = $('#roiDetectBtn')[0];
    detectBtn.disabled = roiPolygons.length === 0 || !uploadedImage;
}

function startROIDetection() {
    if (roiPolygons.length === 0) {
        alert('먼저 ROI를 설정해주세요.');
        return;
    }

    const resultsArea = $('#roiResultsArea')[0];
    resultsArea.style.display = 'block';

    // 로딩 표시
    showROILoading();

    // 서버 API 호출
    // 보내야 하는 것 : 사진. 폴리곤 좌표들.
    // 파일 백엔드로 전달
    const formData = new FormData();
    formData.append('file', file);
    formData.append('polygonJson', JSON.stringify(roiPolygons));

    $.ajax({
        url: '/detect/roi',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            alert("완료되었습니다");
            generateROIResults();
        },
        error : function (err) {
            alert("실패");
        }
    })
}

function showROILoading() {
    const summaryTab = $('#summaryTab')[0];
    summaryTab.innerHTML = `
        <div class="roi-loading">
            <div class="spinner"></div>
            <p>ROI Detection을 수행중입니다...</p>
            <p>총 ${roiPolygons.length}개의 관심 영역을 분석하고 있습니다.</p>
        </div>
    `;
}

function generateROIResults() {
    // 시뮬레이션된 결과 생성
    const mockObjects = ['Person', 'Car', 'Bicycle', 'Dog', 'Cat', 'Tree', 'Building', 'Sign'];
    const roiResults = roiPolygons.map(roi => {
        const detectedObjects = [];
        const numObjects = Math.floor(Math.random() * 4) + 1; // 1-4개 객체

        for (let i = 0; i < numObjects; i++) {
            detectedObjects.push({
                object: mockObjects[Math.floor(Math.random() * mockObjects.length)],
                confidence: (Math.random() * 30 + 70).toFixed(1), // 70-100%
                x: roi.x + Math.random() * roi.width * 0.5,
                y: roi.y + Math.random() * roi.height * 0.5,
                width: Math.random() * roi.width * 0.3 + 20,
                height: Math.random() * roi.height * 0.3 + 20
            });
        }

        return {
            roi: roi,
            objects: detectedObjects,
            processingTime: (Math.random() * 0.5 + 0.1).toFixed(2)
        };
    });

    displayROIResults(roiResults);
}

function displayROIResults(results) {
    displaySummaryResults(results);
    displayDetailedResults(results);
    displayStatisticsResults(results);
}

function displaySummaryResults(results) {
    const summaryTab = document.getElementById('summaryTab');
    const totalObjects = results.reduce((sum, result) => sum + result.objects.length, 0);
    const avgConfidence = results.reduce((sum, result) => {
        const roiAvg = result.objects.reduce((s, obj) => s + parseFloat(obj.confidence), 0) / result.objects.length;
        return sum + roiAvg;
    }, 0) / results.length;

    summaryTab.innerHTML = `
        <div class="result-card">
            <h4>Detection 요약</h4>
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-number">${roiPolygons.length}</span>
                    <span class="stat-label">분석된 ROI</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${totalObjects}</span>
                    <span class="stat-label">탐지된 객체</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${avgConfidence.toFixed(1)}%</span>
                    <span class="stat-label">평균 신뢰도</span>
                </div>
                <div class="stat-card">
                    <span class="stat-number">${results.reduce((sum, r) => sum + parseFloat(r.processingTime), 0).toFixed(2)}s</span>
                    <span class="stat-label">총 처리 시간</span>
                </div>
            </div>
        </div>
        
        <div class="result-card">
            <h4>ROI별 탐지 결과</h4>
            ${results.map(result => `
                <div style="margin-bottom: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 4px;">
                    <h5>${result.roi.name}</h5>
                    <p>탐지된 객체: ${result.objects.length}개</p>
                    <p>처리 시간: ${result.processingTime}초</p>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
                        ${result.objects.map(obj => `
                            <span style="background: #6f42c1; color: white; padding: 0.25rem 0.5rem; border-radius: 3px; font-size: 0.8rem;">
                                ${obj.object} (${obj.confidence}%)
                            </span>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function displayDetailedResults(results) {
    const detailedTab = document.getElementById('detailedTab');

    detailedTab.innerHTML = results.map(result => `
        <div class="result-card">
            <h4>${result.roi.name} 상세 결과</h4>
            <p><strong>ROI 정보:</strong> 위치 (${Math.round(result.roi.x)}, ${Math.round(result.roi.y)}), 
               크기 ${Math.round(result.roi.width)}×${Math.round(result.roi.height)}</p>
            <p><strong>처리 시간:</strong> ${result.processingTime}초</p>
            
            <div class="detection-grid">
                ${result.objects.map((obj, index) => `
                    <div class="detection-item">
                        <div class="object-name">객체 ${index + 1}: ${obj.object}</div>
                        <div class="confidence">신뢰도: ${obj.confidence}%</div>
                        <div class="position">
                            위치: (${Math.round(obj.x)}, ${Math.round(obj.y)})<br>
                            크기: ${Math.round(obj.width)}×${Math.round(obj.height)}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function displayStatisticsResults(results) {
    const statisticsTab = document.getElementById('statisticsTab');

    // 객체별 통계
    const objectStats = {};
    results.forEach(result => {
        result.objects.forEach(obj => {
            if (!objectStats[obj.object]) {
                objectStats[obj.object] = { count: 0, totalConfidence: 0 };
            }
            objectStats[obj.object].count++;
            objectStats[obj.object].totalConfidence += parseFloat(obj.confidence);
        });
    });

    statisticsTab.innerHTML = `
        <div class="result-card">
            <h4>객체별 탐지 통계</h4>
            <div class="detection-grid">
                ${Object.entries(objectStats).map(([object, stats]) => `
                    <div class="detection-item">
                        <div class="object-name">${object}</div>
                        <div class="confidence">탐지 횟수: ${stats.count}회</div>
                        <div class="position">평균 신뢰도: ${(stats.totalConfidence / stats.count).toFixed(1)}%</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="result-card">
            <h4>ROI별 성능 분석</h4>
            <div class="detection-grid">
                ${results.map(result => {
        const avgConfidence = result.objects.reduce((sum, obj) => sum + parseFloat(obj.confidence), 0) / result.objects.length;
        return `
                        <div class="detection-item">
                            <div class="object-name">${result.roi.name}</div>
                            <div class="confidence">객체 수: ${result.objects.length}개</div>
                            <div class="position">
                                평균 신뢰도: ${avgConfidence.toFixed(1)}%<br>
                                처리 시간: ${result.processingTime}초
                            </div>
                        </div>
                    `;
    }).join('')}
            </div>
        </div>
    `;
}

function showResultTab(tabName) {
    // 모든 탭 비활성화
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // 선택된 탭 활성화
    event.target.classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
}