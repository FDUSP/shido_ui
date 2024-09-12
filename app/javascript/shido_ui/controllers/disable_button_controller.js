import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ['button', 'link'];
  static values = {
    label: String,
  }

  connect() {
    console.log('START DISABLE BUTTON');
  }

  start() {
    // Submit button
    if (this.hasButtonTarget) {
      this.buttonTarget.disabled = true;
      this.buttonTarget.classList.add('disabled');
      this.buttonTarget.value = 'Aguarde...';
    }

    // Link button
    if (this.hasLinkTarget) {
      this.linkTarget.classList.add('disabled');
      this.linkTarget.innerHTML = 'Aguarde...';
    }
  }

  stop() {
    // Submit button
    if (this.hasButtonTarget) {
      this.buttonTarget.disabled = false;
      this.buttonTarget.classList.remove('disabled');
      this.buttonTarget.value = this.labelValue;
    }

    // Link button
    if (this.hasLinkTarget) {
      this.linkTarget.classList.remove('disabled');
      this.linkTarget.innerHTML = this.labelValue;
    }
  }
}