

Rails.application.routes.draw do
  namespace :api do
    get "hiked_trails/:hike_number", to:"trails#hiked_trails"
    resources :users, only: [:index, :show, :create, :update]
    resources :hikes, only: [:index, :create, :update, :destroy]
    get "/me", to: "users#session_user"
    
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"

    resources :trails, only: [:index, :create, :show]
  end
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end


# define route hiked_trails
#setup an action in the trails controller to handle that route
#within that action query select all the trails by the number of hikes passed with the url
#return json for those trails
