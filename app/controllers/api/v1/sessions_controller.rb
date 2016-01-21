class Api::V1::SessionsController < Api::V1::BaseController
  # before_action :restrict_access, only: [:auto]

  def new
    render 'sessions/new'
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      sign_in user
      # redirect_back_or api_v1_user_path user.id
      role = 'guest'
      render json: { id: user.api_key, 
                      user: user,
                      role: role }
      # render ''
      # respond_to do |format|
      #   format.html # index.html.erb
      #   format.json 
      # end
    else
      flash.now[:error] = 'Invalid email/password combination'
      # render 'new'
      # render json: user
    end
  end

  # When user has an api_key in their cookies, the client tries to log them in automatically, by verifying it's validity.
  def auto
    # binding.pry
    @user = User.find_by(api_key: params[:session][:api_key])
    role = 'guest'

    render json: { id: @user.api_key, 
                    user: @user,
                    role: role }
                    return
    # if @user && restrict_access
    #   # binding.pry
    #   render json: { id: @user.api_key, 
    #                   user: @user,
    #                   role: role }
    #                   return
    # else
    #   flash.now[:error] = 'please log in'
    # end
  end

  def destroy
    sign_out
    redirect_to root_url
  end
end



    # Session.create(res.data.id, res.data.user.id,
    #                    res.data.user.role);