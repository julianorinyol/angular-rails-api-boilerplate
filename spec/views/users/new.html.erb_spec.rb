require 'rails_helper'

RSpec.describe "users/new", type: :view do
  before(:each) do
    assign(:user, User.new(
      :email => "MyString",
      :name => "MyString",
      :password_digest => "MyString",
      :remember_token => "MyString",
      :admin => false
    ))
  end

  it "renders new user form" do
    render

    assert_select "form[action=?][method=?]", users_path, "post" do

      assert_select "input#user_email[name=?]", "user[email]"

      assert_select "input#user_name[name=?]", "user[name]"

      assert_select "input#user_password_digest[name=?]", "user[password_digest]"

      assert_select "input#user_remember_token[name=?]", "user[remember_token]"

      assert_select "input#user_admin[name=?]", "user[admin]"
    end
  end
end
