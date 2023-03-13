class UserShowAndUpdateSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar_image, :about

  has_many :hikes
  has_many :trails

  # def user_hikes
  #   self.object.hikes, serializer: HikeSerializer
  # end
end
