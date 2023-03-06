class CreateTrails < ActiveRecord::Migration[6.1]
  def change
    create_table :trails do |t|
      t.string :name
      t.string :location
      t.string :description
      t.string :image
      t.decimal :distance
      t.integer :intensity

      t.timestamps
    end
  end
end
