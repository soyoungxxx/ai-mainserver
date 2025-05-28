let type;

// 메뉴 선택 버튼
function selectMenu(id) {
	type = id;
	$('.btn-select').removeClass('active');
	$('#' + id).addClass('active');
}

// 파일 업로드 후 미리보기 생성
function uploadFile(id) {
      const file = $('#'+id)[0].files[0];
      if (!file || !file.type.startsWith('image/')) {
        alert('이미지 파일을 선택하세요.');
        return;
      }

      const reader = new FileReader();
      reader.onload = function(e) {
        $('#previewImg').attr('src', e.target.result);
        $('#imagePreview').css('display', 'block');
      };
      reader.readAsDataURL(file);

	  $('#uploadBox').css('display', 'none');
	  $('#detectBtn').prop('disabled', false);
    }

    function clearImage() {
      $('#imageInput').val('');
      $('#previewImg').attr('src', '');
      $('#completeImg').attr('src', '');
      $('#completeImg').hide();
      $('#imagePreview').css('display', 'none');
	  $('#uploadBox').css('display', 'block');
	  $('#detectBtn').prop('disabled', true);
    }
