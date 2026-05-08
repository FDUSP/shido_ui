import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["dt"]

  connect() {
    console.log("START DATEMASK")

    this.input = this.hasDtTarget ? this.dtTarget : this.findInput()
    this.mask = this.mask.bind(this)

    if (!this.input) return

    this.input.inputMode = "numeric"
    this.input.maxLength = 10
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
    const value = this.input.value.replace(/\D/g, "").slice(0, 8)
    const parts = []

    if (value.length > 0) parts.push(value.slice(0, 2))
    if (value.length > 2) parts.push(value.slice(2, 4))
    if (value.length > 4) parts.push(value.slice(4, 8))

    this.input.value = parts.join("/")
  }
}
