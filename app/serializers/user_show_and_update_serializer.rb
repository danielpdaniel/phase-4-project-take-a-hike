class UserShowAndUpdateSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar_image, :about

  has_many :hikes
  has_many :trails
end
