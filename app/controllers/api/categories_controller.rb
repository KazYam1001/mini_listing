class Api::CategoriesController < ApplicationController
  def index
    @categories = Category.find(params[:category_id]).children
  end
end
