class Hike < ApplicationRecord
    belongs_to :user
    belongs_to :trail

    validates :user_id, presence: true
    validates :trail_id, presence: true
    validates :rating, presence: true, numericality: {less_than_or_equal_to: 5}
    validates :notes, presence: true
    validates :image, presence: true
    validates :date, presence: true
end
