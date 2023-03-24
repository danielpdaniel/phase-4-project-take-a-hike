class Api::HikesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_hike_response
  
    skip_before_action :authorize, only: [:index]

    def index
        hikes = Hike.all
        render json: hikes, status: :ok
    end

    def create
        hike = @user.hikes.create!(hike_params)

        if hike
            if hike.valid?
                render json: hike, status: :created
            end
        else 
            render json: {error: "unauthorized user"}, status: :unauthorized
        end
    end

    def update
        hike = @user.hikes.find_by(id: params[:id])
        
        if hike
            hike.update!(hike_params)
            if hike.valid?
                render json: hike, status: :accepted
            end
        else
            render json: {error: "unauthorized user"}, status: :unauthorized
        end
    end

    def destroy
        hike = @user.hikes.find_by(id: params[:id])

        if session[:user_id] === hike&.user_id
            hike.destroy!
            render json: [], status: :no_content
        else
            render json: {error: "unauthorized user"}, status: :unauthorized
        end
    end

    private

    def hike_params
        params.permit(:user_id, :trail_id, :rating, :notes, :image, :date)
    end

    def invalid_hike_response(invalid)
        render json: { errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
    
end
