require 'rails_helper'

RSpec.describe "users/edit", type: :view do
  before(:each) do
    @user = assign(:user, User.create!(
      :email => "MyString",
      :name => "MyString",
      :password_digest => "MyString",
      :remember_token => "MyString",
      :admin => false
    ))
  end

  it "renders the edit user form" do
    render

    assert_select "form[action=?][method=?]", user_path(@user), "post" do

      assert_select "input#user_email[name=?]", "user[email]"

      assert_select "input#user_name[name=?]", "user[name]"

      assert_select "input#user_password_digest[name=?]", "user[password_digest]"

      assert_select "input#user_remember_token[name=?]", "user[remember_token]"

      assert_select "input#user_admin[name=?]", "user[admin]"
    end
  end
end
