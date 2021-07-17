class Contract < ApplicationRecord
  belongs_to :plan
  has_many :calls
end
