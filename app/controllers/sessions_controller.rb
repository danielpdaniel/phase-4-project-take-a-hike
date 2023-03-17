class SessionsController < ApplicationController
    
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

    # def show
    #     user = User.find_by(session[:user_id])
    #     render json: user, status: :ok
    # end

end
