import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['tab', 'content'];
  static classes = ['active'];
  static values = {
    index: { type: Number, default: 0 },
  };

  connect() {
    console.log('START TABLIST')
    this.showTab();
  }

  select(e) {
    e.preventDefault();
    this.indexValue = parseInt(e.currentTarget.dataset.index, 10);
  }

  /**
   * This is a special Stimulus callback that runs whenever `this.indexValue` changes.
   * It's the perfect place to update the UI.
   */
  indexValueChanged() {
    this.showTab();
  }

  /**
   * Hides all tabs/content and shows only the active one.
   */
  showTab() {
    this.tabTargets.forEach((tab, index) => {
      const content = this.contentTargets[index];

      // Check if the current tab in the loop is the active one
      const isActive = index === this.indexValue;

      // Toggle the active class for the tab
      tab.classList.toggle(this.activeClass, isActive);
      // Toggle the hidden class for the content (assuming 'is-hidden' is your utility class)
      content.classList.toggle('is-hidden', !isActive);
    });
  }
}
