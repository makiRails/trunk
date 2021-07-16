class RenameWeaponClassColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :weapons, :class, :weapon_class
  end
end
