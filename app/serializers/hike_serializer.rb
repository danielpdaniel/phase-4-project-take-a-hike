class HikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :trail_id, :rating, :notes, :image, :date

end
