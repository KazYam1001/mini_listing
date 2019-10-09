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
        $(`div[data-depth=${categoryData.depth}]`).empty();
        $(`div[data-depth=${categoryData.depth+1}]`).empty();
        $(`div[data-depth=${categoryData.depth}]`).append(`<select class="js-root_category" name="product[category_id]"><option>---</option>${optionTags}</select>`);
      }
    })
    .fail(()=>{
      alert('カテゴリ取得に失敗');
    });
  }

  $('.categories').on('change', '.js-root_category', function(){
    getCategory($(this).val());
  })
});
