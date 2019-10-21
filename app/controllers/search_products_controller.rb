class SearchProductsController < ApplicationController
  def index
    @q = Product.ransack(params[:q])
    if params[:category_id].present?
      products = Product.where(category_id: Category.find(params[:category_id]).subtree)
      .ransack(search_params)
    else
      products = Product.ransack(search_params)
    end
    @search_results = products.result.includes(:category, :images)
  end

  private

  def search_params
    params.require(:q).permit!
  end
end
