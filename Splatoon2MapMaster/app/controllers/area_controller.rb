class AreaController < ApplicationController
  def display
    @weaponData = Weapon.all
  end
  def freePage
    @weaponData = Weapon.all
  end
end
