class Hike < ApplicationRecord
    belongs_to :user
    belongs_to :trail

    validates :user_id, presence: true
    validates :trail_id, presence: true
    validates :rating, numericality: {maximum: 2}

    # def name
    #     self.trail.name
    # end

    # def location
    #     self.trail.location
    # end

    # def description
    #     self.trail.description
    # end

    # def distance
    #     self.trail.distance
    # end

    # def intensity
    #     self.trail.intensity
    # end
end
