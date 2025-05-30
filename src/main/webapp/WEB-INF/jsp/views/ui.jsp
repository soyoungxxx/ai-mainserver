<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>서울시 BIM남부관리시스템</title>
    <link rel="stylesheet" href="/css/styles.css"/>
</head>
<body>
<%@ include file="/WEB-INF/jsp/common/header.jsp" %>
    <div class="container">
        <header>
            <h1>서울시 BIM남부관리시스템</h1>
            <div class="header-links">
                <a href="#">내정보</a>
                <a href="#">로그아웃</a>
            </div>
        </header>
        
        <div class="content">
            <aside class="sidebar">
                <nav>
                    <ul>
                        <li class="active"><a href="#">사업관리</a></li>
                        <li><a href="#">시설물관리</a></li>
                        <li><a href="#">이력관리</a></li>
                        <li class="sub-menu">...</li>
                        <li class="sub-menu">...</li>
                        <li><a href="#">통계</a></li>
                        <li class="sub-menu">...</li>
                        <li class="sub-menu">...</li>
                        <li><a href="#">대시보드</a></li>
                        <li class="divider"></li>
                        <li><a href="#">사용자관리</a></li>
                        <li class="sub-menu"><a href="#">사용자관리</a></li>
                        <li class="sub-menu"><a href="#">사용자 접속이력</a></li>
                        <li class="sub-menu"><a href="#">추적작업 이력</a></li>
                        <li class="divider"></li>
                        <li><a href="#">BIM라이브러리관리</a></li>
                        <li class="divider"></li>
                        <li><a href="#">공지사항</a></li>
                        <li><a href="#">자료실</a></li>
                    </ul>
                </nav>
            </aside>
            
            <main>
                <div class="search-panel">
                    <div class="search-form">
                        <div class="form-group">
                            <input type="text" id="projectName" placeholder="사업명">
                        </div>
                        <div class="form-group">
                            <input type="text" id="startDate" placeholder="시작일">
                            <!--
                            <button class="date-picker-btn" onclick="showDatePicker('startDate')">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                                    <path d="M3 10H21" stroke="currentColor" stroke-width="2"/>
                                    <path d="M8 2L8 6" stroke="currentColor" stroke-width="2"/>
                                    <path d="M16 2L16 6" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </button>
                            -->
                        </div>
                        <div class="form-group">
                            <input type="text" id="endDate" placeholder="종료일">
                            <!--
                            <button class="date-picker-btn" onclick="showDatePicker('endDate')">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                                    <path d="M3 10H21" stroke="currentColor" stroke-width="2"/>
                                    <path d="M8 2L8 6" stroke="currentColor" stroke-width="2"/>
                                    <path d="M16 2L16 6" stroke="currentColor" stroke-width="2"/>
                                </svg>
                            </button>
                            -->
                        </div>
                        <button class="search-btn">검색</button>
                    </div>
                </div>
                
                <div class="action-buttons">
                    <button class="download-btn">다운로드</button>
                    <button class="print-btn">등록</button>
                </div>
                
                <div class="table-info">
                    <span class="total-count">23건</span>
                    <span class="pagination-info">1/1page</span>
                </div>
                
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>일련번호</th>
                                <th>사업명</th>
                                <th>사업시작일</th>
                                <th>사업종료일</th>
                                <th>...</th>
                                <th>...</th>
                                <th>...</th>
                            </tr>
                        </thead>
                        <tbody id="projectTableBody">
                            <!-- Table rows will be populated by JavaScript -->
                        </tbody>
                    </table>
                </div>
                
                <div class="pagination">
                    <button class="pagination-btn first">⟨⟨</button>
                    <button class="pagination-btn prev">⟨</button>
                    <div class="page-numbers">
                        <button class="page-number active">1</button>
                        <button class="page-number">2</button>
                        <button class="page-number">3</button>
                        <button class="page-number">4</button>
                        <button class="page-number">5</button>
                        <button class="page-number">6</button>
                        <button class="page-number">7</button>
                        <button class="page-number">8</button>
                        <button class="page-number">9</button>
                        <button class="page-number">10</button>
                    </div>
                    <button class="pagination-btn next">⟩</button>
                    <button class="pagination-btn last">⟩⟩</button>
                </div>
            </main>
        </div>
    </div>
    
    <script src="/js/script.js"></script>
</body>
</html>