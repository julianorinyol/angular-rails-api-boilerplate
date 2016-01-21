class AddStuffToUsers < ActiveRecord::Migration
  def change
	  	add_column :users, :api_key, :string
	  	add_column :users, :reset_password_token, :string
	  	add_column :users, :reset_password_sent_at, :datetime
	  	add_column :users, :remember_created_at, :datetime
	  	add_column :users, :sign_in_count, :integer, default: 0
	  	add_column :users, :current_sign_in_at, :datetime
	  	add_column :users, :last_sign_in_at, :datetime
	  	add_column :users, :current_sign_in_ip, :string
	  	add_column :users, :last_sign_in_ip, :string
  end
end
