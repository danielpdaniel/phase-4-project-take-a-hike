class User < ApplicationRecord
    has_many :hikes, -> {order(date: :DESC)}
    has_many :trails, -> {order(name: :ASC)}, through: :hikes

    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :avatar_image, presence: true
end
