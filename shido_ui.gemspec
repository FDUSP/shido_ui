require_relative "lib/shido_ui/version"

Gem::Specification.new do |spec|
  spec.name        = "shido_ui"
  spec.version     = ShidoUi::VERSION
  spec.authors     = ["Fabio Silva"]
  spec.email       = ["fjs@usp.br"]
  spec.homepage    = "https://github.com/FDUSP/shido_ui"
  spec.summary     = "Summary of Shido UI."
  spec.description = "Description of Shido UI."
  spec.license     = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the "allowed_push_host"
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  spec.metadata["allowed_push_host"] = "Set to 'http://mygemserver.com'"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://github.com/FDUSP/shido_ui"
  # spec.metadata["changelog_uri"] = "Put your gem's CHANGELOG.md URL here."

  spec.files = Dir.chdir(File.expand_path(__dir__)) do
    Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]
  end

  spec.add_dependency "rails", ">= 8.0"
  spec.add_dependency "capybara"
  spec.add_dependency "selenium-webdriver"
  spec.add_dependency "webdrivers"
  spec.add_dependency "image_processing", "~> 1.2"
  spec.add_dependency "stimulus-rails"
  spec.add_dependency "turbo-rails", "~> 1.3"
  spec.add_dependency "watir"
  spec.add_dependency "pagy"
  spec.add_dependency "haml-rails"
  spec.add_dependency "view_component"

  spec.add_development_dependency "dartsass-rails", "~> 0.5.0"
  spec.add_development_dependency "importmap-rails"
end
