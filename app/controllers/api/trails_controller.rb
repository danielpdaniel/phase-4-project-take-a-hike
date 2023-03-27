class Api::TrailsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_trail_response
    rescue_from ActiveRecord::RecordNotFound, with: :not_found_trail_response

    skip_before_action :authorize, only: [:index, :show]

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

    def show
        trail = Trail.find_by!(id: params[:id])

        render json: trail, status: :ok, serializer: TrailShowSerializer
    end

    private

    def trail_params
        params.permit(:name, :location, :description, :image, :distance, :intensity)

    end

    def invalid_trail_response(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def not_found_trail_response
        render json: { error: "Trail Not Found" }, status: :not_found
    end
end
