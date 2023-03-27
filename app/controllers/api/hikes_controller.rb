class Api::HikesController < ApplicationController
    
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_hike_response
    rescue_from ActiveRecord::RecordNotFound, with: :not_found_hike_response
  
    skip_before_action :authorize, only: [:index]

    def index
        hikes = Hike.all
        render json: hikes, status: :ok
    end

    def create
        hike = @user.hikes.create!(hike_params)

        if hike&.valid?
                render json: hike, status: :created
        else 
            render json: {error: "unauthorized user"}, status: :unauthorized
        end
    end

    def update
        hike = @user.hikes.find_by!(id: params[:id])
        
        hike.update!(hike_params)

        render json: hike, status: :accepted
    end

    def destroy
        hike = @user.hikes.find_by!(id: params[:id])

        hike.destroy!
        
        render json: [], status: :no_content
    end

    private

    def hike_params
        params.permit(:user_id, :trail_id, :rating, :notes, :image, :date)
    end

    def invalid_hike_response(invalid)
        render json: { errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
    
    def not_found_hike_response
        render json: {error: "hike not found"}, status: :not_found
    end
end
