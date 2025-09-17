# frozen_string_literal: true
module  ShidoUi
  class ModalComponent < ViewComponent::Base
    def initialize(auto_close: true, modal_width: '50%')
      @auto_close = auto_close
      @modal_width = modal_width
    end
  end
end
