class ProductsController < ApplicationController
    before_action :product_find, except: [:index, :new, :create]

    def index
        @products = Product.includes(:category).all.order('created_at DESC')
        @q = Product.ransack(params[:q])
    end

    def show

    end

    def new
        @product = Product.new
        @product.images.build
    end

    def create
        Product.create!(product_params)
    end

    def edit

    end

    def update
        @product.update!(product_params)
    end

    def destroy
        @product.destroy
    end

    private
    def product_params
        params.require(:product).permit(:name, :description, :category_id, :state_id, :delivery_fee_id, :delivery_way_id, :prefecture_code, :address_city, :address_street, :address_building, :delivery_day, :price, images_attributes: [:image, :_destroy, :id])
    end

    def product_find
        @product = Product.find(params[:id])
    end

end
