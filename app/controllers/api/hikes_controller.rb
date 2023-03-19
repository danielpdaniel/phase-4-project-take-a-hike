class Api::HikesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_hike_response
    before_action :authorize
    skip_before_action :authorize, only: [:index]

    def index
        hikes = Hike.all
        render json: hikes, status: :ok
    end

    def create
        if session[:user_id] === hike_params[:user_id]
        hike = Hike.create!(hike_params)
            if hike.valid?
                render json: hike, status: :created
            end
        else 
            render json: {error: "unauthorized user"}, status: :unauthorized
        end
    end

    def update
        user = User.find_by(id: session[:user_id])
        hike = user.hikes.find_by(id: params[:id])
        
        # if session[:user_id] === hike.user_id
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
        user = User.find_by(id: session[:user_id])
        hike = Hike.find_by(id: params[:id])

        if session[:user_id] === hike.user_id
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
        render json: { errors: [invalid.record.errors]}, status: :unprocessable_entity
    end

    def authorize
        if session.include? :user_id
           nil
        else
            return render json: {error: "unauthorized user"}, status: :unauthorized
        end
    end
    
end
