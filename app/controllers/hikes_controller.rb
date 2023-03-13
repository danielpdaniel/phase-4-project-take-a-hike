class HikesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_hike_response

    def index
        hikes = Hike.all
        render json: hikes, status: :ok
    end

    def create
        hike = Hike.create!(hike_params)
        if hike.valid?
            render json: hike, status: :created
        end
    end

    def update
        hike = Hike.find_by(id: params[:id])

        if session[:user_id] === hike.user_id
            hike.update!(hike_params)
        end
        
        if hike.valid?
            render json: hike, status: :accepted
        end
    end

    def destroy
        hike = Hike.find_by(id: params[:id])
        hike.destroy!
        render json: [], status: :no_content
    end

    private

    def hike_params
        params.permit(:user_id, :trail_id, :rating, :notes, :image, :date)
    end

    def invalid_hike_response(invalid)
        render json: { errors: [invalid.record.errors]}, status: :unprocessable_entity
    end
    
end
