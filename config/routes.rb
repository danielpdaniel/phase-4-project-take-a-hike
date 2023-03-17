

Rails.application.routes.draw do
  namespace :api do
  resources :users, only: [:index, :show, :create, :update]
  resources :hikes, only: [:index, :create, :update, :destroy]
  get "/me", to: "users#session_user"
  
  # get "/api/users", to:"users#index"
  

  # post "/login", to: "sessions#create"
  # delete "/logout", to: "sessions#destroy"

  resources :sessions, only: [:create, :destroy]

  resources :trails, only: [:index, :create, :show]
  end
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
