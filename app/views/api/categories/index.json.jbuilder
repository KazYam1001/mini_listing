json.depth @category.depth + 1
json.categories @categories do |category|
  json.id category.id
  json.name category.name
end
