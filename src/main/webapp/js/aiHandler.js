const AI_SERVER_URL = 'http://192.168.0.32:8000';

async function handleImagePredict() {
	if (type === undefined) {
		alert('타입을 선택해주세요');
		return;
	}

	// 파일 백엔드로 전달
	const formData = new FormData();
	const file = $('#imageInput')[0].files[0];
	formData.append('file', file);
	formData.append('type', type);

	$.ajax({
		url: '/detect/simple',
		type: 'POST',
		data: formData,
		processData: false,
		contentType: false,
		success: function (result) {
			alert("완료되었습니다");
			const img = $('#completeImg');
			img.attr('src', result.output);
			img.show();
		},
		error : function (err) {
			alert("실패");
		}
	})
	
	// const file = $('#'+id)[0].files[0];
	

	// const fileInput = document.querySelector('#imageInput');

	// formData.append('file', fileInput.files[0]);

	// const div = document.querySelector('#result-area');
	// const spinner = document.querySelector('#spinner');

	// div.innerHTML = "";
	// div.appendChild(spinner);
	// spinner.style.display = 'block'; // 스피너 표시

	// try {
	// 	const response = await fetch(AI_SERVER_URL + '/predict', {
	// 		method: 'POST',
	// 		body: formData
	// 	});

	// 	// 결과
	// 	const result = await response.json();
		
	// 	// input, output 경로 저장
	// 	const input = result.input;
	// 	let output = [];
	// 	for (const [key, value] of Object.entries(result)) {
	// 	  if (key !== "input") {
	// 	    output.push(value);
	// 	  }
	// 	}

	// 	spinner.style.display = 'none'; // 스피너 제거
		
	// 	// 이미지 / 비디오 판별
	// 	let isVideo;
	// 	if (input.endsWith('.jpg') || input.endsWith('.png')) isVideo = false;
	// 	else isVideo = true;

		
	// 	// input 이미지 입력
	// 	const inputCells = document.querySelectorAll(".origin-image-cell");
		
	// 	inputCells.forEach((cell) => {
	// 		let inputDiv;
			
	// 		if (isVideo) {
	// 			inputDiv = document.createElement('video');
	// 			inputDiv.controls = true;
	// 		}
	// 		else inputDiv = document.createElement('img');
			
	// 		inputDiv.src = input;
	// 		inputDiv.style.maxWidth = '100%';
			
	// 		cell.append(inputDiv);
	// 	})
		
	// 	// output 이미지 입력
	// 	const outputCells = document.querySelectorAll(".detect-image-cell");
		
	// 	outputCells.forEach((cell, index) => {
	// 		let outputDiv;
			
	// 		if (isVideo) {
	// 			outputDiv = document.createElement('video');
	// 			outputDiv.controls = true;
	// 		}
	// 		else outputDiv = document.createElement('img');
			
	// 		outputDiv.src = output[index];
	// 		outputDiv.style.maxWidth = '100%';
			
	// 		cell.append(outputDiv);
	// 	})
	// } catch (err) {
	// 	spinner.style.display = 'none';
	// 	div.innerHTML = "에러 발생: " + err.message;
	// }
}
