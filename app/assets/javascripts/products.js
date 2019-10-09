$(document).on('turbolinks:load', ()=> {
  // 画像用のfile_fieldを生成する関数
  const buildFileField = (index)=> {
    const html = `<div class="js-file_group">
                    <input class="js-file" type="file" data-index="${index}"
                    name="product[images_attributes][${index}][image]"
                    id="product_images_attributes_${index}_image"><br>
                  </div>`;
    return html;
  }

  const buildImg = (index, url)=> {
    const html = `<div class="preview" data-index="${index}">
                    <img data-index="${index}" width="100" height="100" src="${url}">
                    <label for="product_images_attributes_${index}_image">編集</label>
                    <div class="delete-btn js-remove" data-index="${index}">削除</div>
                  </div>`;
    return html;
  }

  // file_fieldのnameに動的なindexをつける為の配列
  lastIndex = $('input[type="file"]:last').data('index');
  let fileNumbers = [lastIndex + 1];
  // labelのforを最後のinputのindexに合わせる
  $('.js-file_label').attr('for', `product_images_attributes_${lastIndex}_image`);
  // $('.js-file_input').hide();
  if ($('.preview').length == 10) { $('.js-file_label').hide(); }
  console.log(fileNumbers)

  $('.js-file_input').on('change', '.js-file', function(e) {
    const targetIndex = $(this).data('index')
    const file = e.target.files[0];
    // ファイルの中身が空なら削除ボタンを押した扱いにする
    if (file == null) {
      console.log('delete')
      $(`.js-remove[data-index="${targetIndex}"]`).click();
      return;
    }
    // ファイルのブラウザ上でのURLを取得する
    const blobUrl = window.URL.createObjectURL(file);
    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      // console.log('edit')
      img.setAttribute('src', blobUrl);
    } else {
      // console.log('new')
      $('.js-file_label').before(buildImg(targetIndex, blobUrl));
      // fileNumbersの先頭の数字を使ってnameを作り、その数字を配列から取り除く
      $('.js-file_input').append(buildFileField(fileNumbers[0]));
      $('.js-file_label').attr('for', `product_images_attributes_${fileNumbers[0]}_image`);
      fileNumbers.push(fileNumbers[fileNumbers.length - 1] + 1);
      fileNumbers.shift();
      if ($('.preview').length == 10) {
        $('.js-file_label').hide();
      }
    }
    console.log(fileNumbers)
  })

  // 削除ボタンを押した時のイベント
  $('#previews').on('click', '.js-remove', function() {
    targetIndex = this.dataset.index
    hiddenCheck = document.getElementById(`product_images_attributes_${targetIndex}__destroy`)
    if (hiddenCheck) {
      $(`input[data-destroy="${targetIndex}"]`).val('true');
    }
    // fileのinputと対応するプレビューを削除
    $(`input[data-index=${targetIndex}]`).remove();
    $(`.preview[data-index="${targetIndex}"]`).remove();
    // 画像入力欄が0個にならないようにしておく
    if ($('.js-file').length == 0) {
      $('#image-box').append(buildFileField(targetIndex))
    }
    if ($('.preview').length < 10) {
      $('.js-file_label').show();
    }
    console.log(fileNumbers)
  })
});
