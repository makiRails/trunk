class CreateContracts < ActiveRecord::Migration[6.1]
  def change
    create_table :contracts do |t|
      t.references :plan
      t.string :name, null: false
      t.integer :users_quantity, null: false
      t.timestamps
    end
  end
end
