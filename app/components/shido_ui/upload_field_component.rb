# frozen_string_literal: true
module ShidoUi
  class UploadFieldComponent < ViewComponent::Base
    def initialize(f:, field_name:, file_label:, show_file_name: true, accept: "*/*", **kwargs)
      @f = f
      @field_name = field_name
      @file_label = file_label
      @show_file_name = show_file_name
      @accept = accept
      @css_args = kwargs
    end

    def storage
      @storage ||= @f.try(:object)&.try(@field_name)
    end
  end
end
