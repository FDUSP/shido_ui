# frozen_string_literal: true
module ShidoUi
  class ErrorMessageComponent < ViewComponent::Base
    def initialize(object: ,type: :danger, message: nil, auto_close: true)
      @object = object
      @type = type
      @message = message
      @auto_close = auto_close
    end
  
    def fade_out
      "animate__animated animate__fadeOut animate__delay-3s" if @auto_close
    end
  
    def local?
      Rails.env.local?
    end
  end
end
