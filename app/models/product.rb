class Product < ApplicationRecord

  include JpPrefecture
  jp_prefecture :prefecture_code

  has_many :images, dependent: :destroy
  accepts_nested_attributes_for :images, allow_destroy: true

  enum status:{on_sale: 1, sold: 2}

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :delivery_fee
  belongs_to_active_hash :delivery_way
  belongs_to_active_hash :state

  belongs_to :category
end
