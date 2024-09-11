pin "application-shido_ui", to: "shido_ui/application.js", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "@hotwired--stimulus.js" # @3.2.2
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin "sortablejs", to: "https://ga.jspm.io/npm:sortablejs@1.15.2/modular/sortable.esm.js"
pin "@rails/request.js", to: "https://ga.jspm.io/npm:@rails/request.js@0.0.6/src/index.js"
pin_all_from ShidoUi::Engine.root.join("app/javascript/shido_ui/controllers"), under: "controllers", to: "shido_ui/controllers"

# View Components
pin_all_from ShidoUi::Engine.root.join("app/components/shido_ui"), to: 'shido_ui'
