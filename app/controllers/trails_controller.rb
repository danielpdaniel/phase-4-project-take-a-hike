class TrailsController < ApplicationController

    def index
        trails = Trail.all
        render json: trails, status: :ok
    end
end
