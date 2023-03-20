class User < ApplicationRecord
    has_many :hikes
    has_many :trails, through: :hikes

    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :avatar_image, presence: true
end
