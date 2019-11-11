class Item < ApplicationRecord
  has_many_attached :photoes
  validates :photoes, presence: true

end
