$(document).on('turbolinks:load', ()=> {
  const buildOptions = (category)=>{
    const html = `<option class='js-category' value=${category.id}>${category.name}</option>`;
    return html;
  }

  const getCategory = (categoryId)=>{
    $.ajax({
      type: 'GET',
      url: '/api/categories',
      dataType: 'json',
      data: { category_id: categoryId },
    })
    .done((categoryData)=>{
      if (categoryData.categories.length !== 0){
        let optionTags
        categoryData.categories.forEach(category => {
          optionTags += buildOptions(category)
        });
        $('.categories').append(`<select class="js-category" name="product[category_id]"><option value="${categoryId}">---</option>${optionTags}</select>`);
      }
    })
    .fail(()=>{
      alert('カテゴリ取得に失敗');
    });
  }

  $('.categories').on('change', '.js-category', function(){
    getCategory($(this).val());
    $(this).nextAll().remove();
  })
});
