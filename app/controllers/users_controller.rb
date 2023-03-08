class UsersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_user_response
# rescue_from ActiveRecord::RecordNotFound, with: :not_found_user_response

    def index
        users = User.all
        render json: users, status: :ok
    end

    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user, serializer: UserShowSerializer
        else
            render json: {error: "User Invalid"}, status: :unauthorized
        end
    end

    def session_user
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: {error: "Not Authorized"}, status: :unauthorized
        end
    end


    def create
        user = User.create!(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        end
    end

    private

    def user_params
        params.permit(:username, :password)
    end

    # def not_found_user_response
    #     render json: { error: "User not found" }, status: :not_found
    # end

    def invalid_user_response(invalid)
        render json: {errors: [invalid.record.errors]}, status: :unprocessable_entity
    end
end
