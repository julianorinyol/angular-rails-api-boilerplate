class Api::V1::PostsController < ApplicationController
	def index
		respond_with Post.all
	end

	def create
		# respond_with Post.create(post_params)
		@post = Post.new(post_params)

		respond_to do |format|
		  if @post.save
		    format.html { redirect_to @post, notice: 'post was successfully created.' }
		    format.json { render :show, status: :created, location: @post }
		  else
		    format.html { render :new }
		    format.json { render json: @post.errors, status: :unprocessable_entity }
		  end
		end
	end

	def show
		respond_with Post.find(params[:id])
	end

	def upvote
		post = Post.find(params[:id])
		post.increment!(:upvotes)

		respond_with post
	end

	private

	def post_params
		params.require(:post).permit(:link, :title)
	end

    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end
end
