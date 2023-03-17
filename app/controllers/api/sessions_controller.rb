class Api::SessionsController < ApplicationController
    
    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {error: {login: ["Invalid username or password"]}}, status: :unauthorized
        end
    end

    def destroy
            session[:user_id] = nil
            render json: [], status: :no_content
    end

    def index
    user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: {error: "Not Found"}, status: :not_found
        end
    end

end