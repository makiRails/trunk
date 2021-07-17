# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Call.destroy_all
Contract.destroy_all
Plan.destroy_all

Plan.create do |p|
  p.id = 1
  p.title = 'Free'
  p.price = 0
end

Plan.create do |p|
  p.id = 2
  p.title = 'Basic'
  p.price = 4800
end

contract = Contract.create!(plan_id: 1, name: '株式会社ホゲホゲ', users_quantity: 5)

Call.create!(contract_id: contract.id, from: '+818012345678', to: '+815011112222', duration: 120, created_at: '2021-06-03 10:00:00')
Call.create!(contract_id: contract.id, from: '+818012345678', to: '+815011112222', duration: 600, created_at: '2021-06-04 10:00:00')
Call.create!(contract_id: contract.id, from: '+817055556666', to: '+815011112222', duration: 510, created_at: '2021-07-03 10:00:00')
Call.create!(contract_id: contract.id, from: '+815011112222', to: '+818012345678', duration: 400, created_at: '2021-07-04 10:00:00')
Call.create!(contract_id: contract.id, from: '+815011112222', to: '+817055556666', duration: 320, created_at: '2021-07-05 10:00:00')


