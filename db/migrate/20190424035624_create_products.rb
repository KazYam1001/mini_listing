class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :name, null: false, unique: true, index: true
      t.text :description, null: false
      t.integer :state_id, null: false
      t.integer :delivery_fee_id, null: false
      t.integer :delivery_way_id, null:false
      t.integer :prefecture_code, null: false
      t.integer :delivery_day, null: false
      t.integer :price, null: false
      t.integer :status, null: false, default: "0"

      t.timestamps
    end
  end
end