class TrailSerializer < ActiveModel::Serializer
  attributes :id, :name, :location, :description, :image, :distance, :intensity

  has_many :hikes

end
