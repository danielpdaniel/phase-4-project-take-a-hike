class SessionsController < ApplicationController
    # skip_before_action :authorized, only: :create
    
    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {error: "Invalid username or password"}, status: :unauthorized
        end
    end

    def destroy
        byebug
        user = User.find_by(id: session[:user_id])
        if user
            session[:user_id] = nil
            render json: [], status: :no_content
        else
            render json: {error: "Unauthorized"}, status: :unauthorized
        end
    end

end
