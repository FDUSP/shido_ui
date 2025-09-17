import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    autoClose: { type: Boolean, default: true },
    duration: { type: Number, default: 5000 },
  }

  connect() {
    console.log('START MODAL');
    this.element.classList.add('is-active');
    this.element.classList.add('animate__animated');
    this.element.classList.add('animate__pulse');
    if (this.autoCloseValue) {
      this.timer = setTimeout(() => {
        this.close();
      }, this.durationValue);
    }
  }

  disconnect() {
    this.element.classList.remove('is-active');
    this.element.classList.remove('animate__animated');
    this.element.classList.remove('animate__pulse');
    if (this.autoCloseValue) {
      clearTimeout(this.timer);
    }
  }

  submitEnd(e) {
    // if (e.detail.success && this.autoClose) {
    //   this.close();
    // }
  }

  close() {
    this.element.classList.remove('is-active');
    this.element.classList.remove('animate__animated');
    this.element.classList.remove('animate__pulse');
    this.element.remove();
  }
}
