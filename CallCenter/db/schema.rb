# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_07_17_021452) do

  create_table "calls", force: :cascade do |t|
    t.integer "contract_id"
    t.string "from", null: false
    t.string "to", null: false
    t.integer "duration", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["contract_id"], name: "index_calls_on_contract_id"
  end

  create_table "contracts", force: :cascade do |t|
    t.integer "plan_id"
    t.string "name", null: false
    t.integer "users_quantity", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["plan_id"], name: "index_contracts_on_plan_id"
  end

  create_table "plans", force: :cascade do |t|
    t.string "title", null: false
    t.integer "price", null: false
  end

end
