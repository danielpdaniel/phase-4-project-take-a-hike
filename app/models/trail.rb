class Trail < ApplicationRecord
    validates :name, presence: true
    validates :location, presence: true
    validates :description, presence: true, length: {minimum: 5, maximum: 1000}
    validates :image, presence: true
    validates :distance, presence: true
    validates :intensity, presence: true, numericality: {greater_than: 0, less_than_or_equal_to: 10}
end
