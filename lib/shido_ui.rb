require "shido_ui/version"
require "shido_ui/engine"

module ShidoUi
  mattr_accessor :user_class, default: "::User"
end
