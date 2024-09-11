require 'view_component'

module ShidoUi
  class Engine < ::Rails::Engine
    isolate_namespace ShidoUi

    config.before_initialize do
      config.view_component.view_component_path = "app/components/shido_ui"
      #config.eager_load_paths << Engine.root.join("app", "frontend", "shido_ui", "components")
      #config.autoload_paths += %W{#{Engine.root}/app/frontend/shido_ui/components}
    end

    initializer "shido_ui.assets" do |app|
      app.config.assets.paths << root.join("app/javascript")
      app.config.assets.paths << root.join("app/components")
    end

    initializer "shido_ui.importmap", before: "importmap" do |app|
      app.config.importmap.paths << Engine.root.join("config/importmap.rb")
      app.config.importmap.cache_sweepers << root.join("app/javascript")
      app.config.importmap.cache_sweepers << root.join("app/components")
    end
  end
end
