import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["field", "button"];

  connect() {
    console.log('START PASSWORD TOGGLE');
  }

  password(e) {
    e.preventDefault();

    if (this.fieldTarget.type === "password") {
      this.buttonTarget.classList.remove('fa-eye');
      this.buttonTarget.classList.add('fa-eye-slash');
      this.fieldTarget.type = "text";
    } else {
      this.buttonTarget.classList.remove('fa-eye-slash');
      this.buttonTarget.classList.add('fa-eye');
      this.fieldTarget.type = "password";
    }
  }
}
