# frozen_string_literal: true
module ShidoUi
  class AlertComponent < ViewComponent::Base
    def initialize(type: :info, message: nil, auto_close: true)
      @type = type
      @message = message
      @auto_close = auto_close
    end
  
    def fade_out
      "animate__animated animate__fadeOut animate__delay-3s" if @auto_close
    end
    
    def fade_in
      "animate__animated animate__fadeInRight"
    end
  end
end
