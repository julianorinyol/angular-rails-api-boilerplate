json.array!(@users) do |user|
  json.extract! user, :id, :email, :name, :password_digest, :remember_token, :admin
end
