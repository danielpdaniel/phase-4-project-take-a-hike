class Hike < ApplicationRecord
    belongs_to :user
    belongs_to :trail

    validates :user_id, presence: true
    validates :trail_id, presence: true
end
