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
      this.buttonTarget.value = 'Aguarde...';
      this.disableButton();
    }

    // Link button
    if (this.hasLinkTarget) {
      this.linkTarget.style.pointerEvents = 'none';
      this.linkTarget.innerHTML = 'Aguarde...';
    }
  }

  stop() {
    // Submit button
    if (this.hasButtonTarget) {
      this.enableButton();
      this.buttonTarget.value = this.labelValue;
    }

    // Link button
    if (this.hasLinkTarget) {
      this.linkTarget.style.pointerEvents = 'auto';
      this.linkTarget.innerHTML = this.labelValue;
    }
  }

  disableButton() {
    this.buttonTarget.disabled = true;
    this.buttonTarget.setAttribute('disabled', 'disabled');
    this.buttonTarget.setAttribute('aria-disabled', 'true');
  }

  enableButton() {
    this.buttonTarget.disabled = false;
    this.buttonTarget.removeAttribute('disabled');
    this.buttonTarget.removeAttribute('aria-disabled');
  }
}
