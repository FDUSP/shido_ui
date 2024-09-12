import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = {
    autoClose: { type: Boolean, default: true },
    duration: { type: Number, default: 5000 },
  }

  connect() {
    console.log("START ALERT");
    if (this.autoCloseValue) {
      this.timer = setTimeout(() => {
        this.close();
      }, this.durationValue);
    }
  }

  disconnect() {
    if (this.autoCloseValue) {
      clearTimeout(this.timer);
    }
  }

  close() {
    this.element.remove();
  }
}
