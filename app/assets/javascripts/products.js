$(document).on('turbolinks:load', ()=> {
  // 画像用のfile_fieldを生成する関数
  const buildFileField = (index)=> {
    const html = `<div class="js-file_group">
                    <input class="js-file" type="file" data-index="${index}"
                    name="product[images_attributes][${index}][image]"
                    id="product_images_attributes_${index}_image"><br>
                    <div class="js-remove" data-index="${index}">削除</div>
                  </div>`;
    return html;
  }

  const buildImg = (index, url)=> {
    const html = `<img data-index="${index}" src="${url}" width="100px" height="100px">`;
    return html;
  }

  // file_fieldのnameに動的なindexをつける為の配列
  let fileNumbers = [1,2,3,4,5,6,7,8,9,10];
  // 既に使われているindexを除外
  lastIndex = $('input[type="file"]:last').data('index')
  fileNumbers.splice(0, lastIndex)
  // labelのforを最後のinputのindexに合わせる
  $('.js-file_label').attr('for', `product_images_attributes_${lastIndex}_image`);
  // $('.hidden-check').hide();


  $('#image-box').on('change', '.js-file', function(e) {
    const targetIndex = $(this).data('index')
    // ファイルのブラウザ上でのURLを取得する
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);
    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      console.log('edit')
      img.setAttribute('src', blobUrl);
    } else {
      console.log('new')
      $('#previews').append(buildImg(targetIndex, blobUrl));
      // fileNumbersの先頭の数字を使ってnameを作り、その数字を配列から取り除く
      $('#image-box').append(buildFileField(fileNumbers[0]));
      fileNumbers.shift();
      fileNumbers.push(fileNumbers[fileNumbers.length - 1] + 1)
    }
    console.log(fileNumbers)
  })

  // 削除ボタンを押した時のイベント
  $('#image-box').on('click', '.js-remove', function() {
    targetIndex = this.dataset.index
    hiddenCheck = document.getElementById(`product_images_attributes_${targetIndex}__destroy`)
    console.log(targetIndex)
    if (hiddenCheck) {
      $(`input[data-destroy="${targetIndex}"]`).prop('checked', true)
    }
    // fileのinputと対応するプレビューを削除
    $(this).parent().remove()
    $(`img[data-index="${targetIndex}"]`).remove();
    // 画像入力欄が0個にならないようにしておく
    if ($('.js-file').length == 0) {
      $('#image-box').append(buildFileField(targetIndex))
    }
    console.log(fileNumbers)
  })
});
