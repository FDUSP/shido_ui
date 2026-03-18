import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['container'];
  
  connect() {
    console.log('START TABLIST RELOADER');
    // Use MutationObserver to watch for changes in the tab display
    this.setupTabObserver();
  }

  /**
   * Setup MutationObserver to detect when tab content becomes visible
   */
  setupTabObserver() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (!(mutation.type === 'attributes' && mutation.attributeName === 'class'))
          return;

        const element = mutation.target;
        
        // Check if this element is a tab-pane that just became visible
        if (element.classList.contains('tab-pane') && !element.classList.contains('is-hidden')) {
          this.reloadFrameInElement(element);
        }
        
      });
    });

    // Observe all tab-pane elements for class changes
    const tabPanes = this.element.querySelectorAll('.tab-pane');
    tabPanes.forEach((pane) => {
      observer.observe(pane, {
        attributes: true,
        attributeFilter: ['class'],
      });
    });

    // Store observer for cleanup
    this.observer = observer;
  }

  /**
   * Reload turbo-frame inside a visible tab-pane
   */
  reloadFrameInElement(element) {
    const turboFrame = element.querySelector('turbo-frame');
    if (turboFrame && turboFrame.src) {
      // Add a cache-busting parameter to force a fresh load
      const url = new URL(turboFrame.src, window.location.origin);
      url.searchParams.set('_refresh', Date.now());
      
      // Update src with cache-busted URL
      turboFrame.src = url.toString();
    }
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

