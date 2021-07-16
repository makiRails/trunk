class CreateWeapons < ActiveRecord::Migration[6.1]
  def change
    create_table :weapons do |t|
      t.string :name
      t.string :class
      t.string :sub
      t.string :sp
      t.float :range
      t.timestamps
    end
  end
end
