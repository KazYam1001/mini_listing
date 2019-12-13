# これは何？
メルカリの出品機能だけを実装したミニアプリ

# 導入
```
git clone https://github.com/KazYam1001/mini_listing.git
bundle exec rails db:create
bundle exec rails db:migrate
bundle exec rails db:seed
```

# どう使うの？
商品出品(accepts_nested_attributes, active_storage)のコードの見本

実際に動かしてみて挙動を掴む

# 実装済み機能
## Products
Productモデル及びproducts_controllerで

accepts_nested_attributesを使った出品機能を実装しています。

Imagesテーブルにsrcというカラムを作り商品の画像を保存しています。

### できること
- resourcesの7アクションが全て実装済み
- 画像の複数枚投稿、プレビュー、投稿前の削除＆編集
- 出品時にカテゴリを入力する機能。ajaxで子・孫カテゴリを選択するセレクトボックス。
  - category.js及び api/categories_controller
- ransackを使った検索機能。カテゴリの絞り込み、ソートを実装済み。
  - search.js及び search_products_controller

## Items
Itemモデル及びitems_controller、item.jsで

ActiveStorageを使った出品機能を実装しています。

photoesというアタッチメントで画像を保存しています。

### できること
- new,create,edit,updateのアクションを実装済み
  - その他はscaffold生成のコードそのままです。
- 画像の複数枚投稿、プレビュー、投稿前の削除＆編集
