class HikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :trail_id, :rating, :notes, :image, :date, :name
  
  def name
    Trail.find_by(id: self.object.trail_id).name
  end

end
