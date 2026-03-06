# frozen_string_literal: true
module ShidoUi
  class CameraComponent < ViewComponent::Base
    attr_reader :url, :f, :attribute, :label
    
    def initialize(url:, f:, attribute:, label: "Foto")
      @url = url
      @f = f
      @attribute = attribute
      @label = label
    end

  end
end