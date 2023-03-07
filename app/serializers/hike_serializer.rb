class HikeSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :description, :image, :distance, :intensity
end
