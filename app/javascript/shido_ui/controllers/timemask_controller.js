import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["time"]

  connect() {
    console.log("START TIMEMASK")

    this.input = this.hasTimeTarget ? this.timeTarget : this.findInput()
    this.mask = this.mask.bind(this)

    if (!this.input) return

    this.input.inputMode = "numeric"
    this.input.maxLength = 5
    this.input.addEventListener("input", this.mask)

    this.mask()
  }

  disconnect() {
    if (!this.input) return

    this.input.removeEventListener("input", this.mask)
  }

  findInput() {
    if (this.element.matches("input")) return this.element

    return this.element.querySelector("input")
  }

  mask() {
    const value = this.input.value.replace(/\D/g, "").slice(0, 4)
    let masked = value.slice(0, 2)

    if (value.length > 2) masked += `:${value.slice(2, 4)}`

    this.input.value = masked
  }
}
