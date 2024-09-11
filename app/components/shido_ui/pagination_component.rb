# frozen_string_literal: true
module ShidoUi
  class PaginationComponent < ViewComponent::Base
    def initialize(pagy:)
      @pagy = pagy
    end

    def render?
      @pagy.pages > 1
    end
  end
end
