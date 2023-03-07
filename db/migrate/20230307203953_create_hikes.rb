class CreateHikes < ActiveRecord::Migration[6.1]
  def change
    create_table :hikes do |t|
      t.integer :user_id
      t.integer :trail_id
      t.integer :rating
      t.string :notes
      t.string :image
      t.date :date

      t.timestamps
    end
  end
end
