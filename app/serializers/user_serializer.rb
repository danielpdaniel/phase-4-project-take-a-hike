class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar_image, :about
end
