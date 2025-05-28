<%@ page pageEncoding="UTF-8"%>
<meta charset="UTF-8">
<link rel="stylesheet" href="/css/header.css">

	<header class="header">
		<div class="container">
			<h1 class="logo"><a href="/home" style="text-decoration: none; cursor:pointer; color: inherit;">AI Detection Demo</a></h1>

			<nav class="navigation">
				<a href="/home" class="nav-link ${page eq 'home' ? 'active' : '' }">Home</a>
				<span class="nav-separator">|</span>
				<a href="/detect" class="nav-link ${page eq 'detect' ? 'active' : '' }">Detecting</a>
				<span class="nav-separator">|</span>
				<a href="/roi" class="nav-link ${page eq 'roi' ? 'active' : '' }">ROI Detecting</a>
			</nav>
		</div>
	</header>
