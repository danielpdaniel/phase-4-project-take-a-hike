class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize

  def authorize
    @user = User.find_by(id: session[:user_id]) 
   
    return render json: {errors: ["unauthorized user"]}, status: :unauthorized unless session.include? :user_id
end

end
