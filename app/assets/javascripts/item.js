$(document).on('turbolinks:load', ()=> {
  if ($('.js_item-form')[0]) {
    const buildPreview = (src, index)=> {
      const html = `<div class='js_item-preview' data-index=${index}>
                      <img src=${src} height='100' width='100'>
                      <div class='btn_wrapper'>
                        <label for="file${index}" class='js_item-edit'>編集</label>
                        <span class='js_item-delete' data-index="${index}">削除</span>
                      </div>
                    </div>`
      return html;
    }

    // 削除ボタンが押された時に動く関数
    // 呼び出し時にthis(削除ボタン)を受け取る
    const removePhotoes = deleteBtn => {
      const preview = deleteBtn.parentNode.parentNode;
      const targetIndex = deleteBtn.dataset.index;
      // data-indexがtargetIndexのinputを取得する
      const input = document.querySelector(`.js_item-file[data-index="${targetIndex}"]`);
      // 上記inoutのdata-idにDB上のレコードIDを持たせているので、それをremoveIdsで保持する
      removeIds.push(input.dataset.id);
      // inputとpreviewを削除する
      input.parentNode.removeChild(input);
      preview.parentNode.removeChild(preview);
    }

    const itemFiles = document.querySelectorAll('.js_item-file');
    const lastIndex = itemFiles.length;
    const newLabel = document.querySelector('.js_item-label');
    const itemForm = document.querySelector('.js_item-form');
    const removeIds = []

    // ページ読み込み時、js_item-file の数を新規画像用のindexに使う
    itemFiles[itemFiles.length - 1].dataset.index = lastIndex;
    itemFiles[itemFiles.length - 1].setAttribute('id', `file${lastIndex}`);
    // labelのforも同じindexに更新
    newLabel.setAttribute('for', `file${lastIndex}`);

    // 画像入力時の処理
    $('.photo-inputs').on('change', '.js_item-file', function(e){
      // 変更があったinputのdata-indexを取得
      const targetIndex = Number(this.dataset.index);
      // キャンセルした場合、targetIndexの削除ボタンを押したことにする
      if (e.target.files.length === 0) {
        removePhotoes(document.querySelector(`.js_item-delete[data-index="${targetIndex}"]`));
        return;
      }
      const blobURL = URL.createObjectURL(e.target.files[0]);
      // プレビューがあったら
      if (preview = document.querySelector(`.js_item-preview[data-index="${targetIndex}"]`)) {
        // imgタグのsrcを更新する
        preview.firstElementChild.setAttribute('src', blobURL);
        // 削除用の配列にdata-idを入れる
        removeIds.push(this.dataset.id);
        console.log(removeIds)
      } else {
        // input欄を追加し、labelを書き換え、プレビューを追加
        document.querySelector('.photo-inputs').insertAdjacentHTML("beforeend", `<input name="item[photoes][]" class="js_item-file" type="file" id="file${targetIndex + 1}" data-index="${targetIndex + 1}">`);
        newLabel.setAttribute('for', `file${targetIndex + 1}`);
        newLabel.insertAdjacentHTML('beforebegin', buildPreview(blobURL, targetIndex));
        // プレビューの数が10なら灰色ラベルを消す
        if (document.querySelectorAll('.js_item-preview').length === 10) {
          newLabel.style.display = 'none';
        }
      }
    });

    // 削除ボタン押下時の処理
    $('.previews').on('click', '.js_item-delete', function() {
      removePhotoes(this);
      if (document.querySelectorAll('.js_item-preview').length < 10) {
        newLabel.style.display = 'flex';
      }
    });

    // 送信前にpurgeするべき画像id用のinputを差し込む
    itemForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // removeIdsのfalsyを排除し、Set型にして重複を削除
      const removeIdSet = new Set(removeIds.filter(v => v));
      if (removeIdSet.size !== 0) {
        removeIdSet.forEach( (ele) => {
          // removeIdSetの中身を全てhiddenなinputで送る。paramsの名前はitem[remove_ids]
          itemForm.insertAdjacentHTML('beforeend', `<input type="hidden" name="item[remove_ids][]" value="${ele}">`);
        });
      }
      itemForm.submit();
    });
  }
});
