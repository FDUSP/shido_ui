# frozen_string_literal: true
module ShidoUi
  class UploadFieldComponent < ViewComponent::Base
    def initialize(f:, field_name:, file_label:, storage_object:, show_file_name: true, **kwargs)
      @css_args = kwargs
      @f = f
      @field_name = field_name
      @file_label = file_label
      @storage_object = storage_object
      @show_file_name = show_file_name
    end
  end
end
