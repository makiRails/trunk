class CreateCalls < ActiveRecord::Migration[6.1]
  def change
    create_table :calls do |t|
      t.references :contract
      t.string :from, null: false
      t.string :to, null: false
      t.integer :duration, null: false
      t.timestamps
    end
  end
end
