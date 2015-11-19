require 'rails_helper'

RSpec.describe "users/show", type: :view do
  before(:each) do
    @user = assign(:user, User.create!(
      :email => "Email",
      :name => "Name",
      :password_digest => "Password Digest",
      :remember_token => "Remember Token",
      :admin => false
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Email/)
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Password Digest/)
    expect(rendered).to match(/Remember Token/)
    expect(rendered).to match(/false/)
  end
end
