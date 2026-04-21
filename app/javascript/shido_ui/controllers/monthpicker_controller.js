import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["month"];

  connect() {
    console.log("START MONTHPICKER");
    this.format();
  }

  format() {
    const digits = this.monthTarget.value.replace(/\D/g, '').slice(0, 6);

    if (digits.length <= 2) {
      this.monthTarget.value = digits;
      return;
    }

    this.monthTarget.value = `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
}
