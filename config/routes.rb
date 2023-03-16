Rails.application.routes.draw do

  resources :users, only: [:index, :show, :create, :update]
  get "/session_user", to: "users#session_user"

  # post "/login", to: "sessions#create"
  # delete "/logout", to: "sessions#destroy"

  resources :sessions, only: [:create, :destroy]

  resources :trails, only: [:index, :create, :show]

  resources :hikes, only: [:index, :create, :update, :destroy]
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
