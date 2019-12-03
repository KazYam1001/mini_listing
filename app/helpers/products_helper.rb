module ProductsHelper
  # ransackのsort_urlを使い、ソート用のurlをvalueに持つハッシュを返す。
  # JSでこの値を使ってソート用URLをリクエストする。
  def ransack_sort_urls
    {
      '並び替え': sort_url(@q, :id, default_order: :asc),
      '価格が安い順': sort_url(@q, :price, default_order: :asc),
      '価格が高い順': sort_url(@q, :price, default_order: :desc),
      '出品の古い順': sort_url(@q, :created_at, default_order: :asc),
      '出品の新しい順': sort_url(@q, :created_at, default_order: :desc),
    }
  end
end
