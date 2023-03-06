class TrailsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_trail_response

    def index
        trails = Trail.all
        render json: trails, status: :ok
    end

    def create
        trail = Trail.create!(trail_params)
        if trail.valid? 
            render json: trail, status: :created
        end
    end

    private

    def trail_params
        params.permit(:name, :location, :description, :image, :distance, :intensity)

    end

    def invalid_trail_response(invalid)
        render json: {errors: [invalid.record.errors]}, status: :unprocessable_entity
    end
end