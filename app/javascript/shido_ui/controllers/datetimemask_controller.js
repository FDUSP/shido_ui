import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["dttime"]

  connect() {
    console.log("START DATETIMEMASK")

    this.input = this.hasDttimeTarget ? this.dttimeTarget : this.findInput()
    this.mask = this.mask.bind(this)

    if (!this.input) return

    this.input.inputMode = "numeric"
    this.input.maxLength = 16
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
    const normalized = this.normalizePersistedDateTime(this.input.value)

    if (normalized) {
      this.input.value = normalized
      return
    }

    const value = this.input.value.replace(/\D/g, "").slice(0, 12)
    let masked = value.slice(0, 2)

    if (value.length > 2) masked += `/${value.slice(2, 4)}`
    if (value.length > 4) masked += `/${value.slice(4, 8)}`
    if (value.length > 8) masked += ` ${value.slice(8, 10)}`
    if (value.length > 10) masked += `:${value.slice(10, 12)}`

    this.input.value = masked
  }

  normalizePersistedDateTime(value) {
    const matches = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?/)

    if (!matches) return null

    const [, year, month, day, hour = "00", minute = "00"] = matches

    return `${day}/${month}/${year} ${hour}:${minute}`
  }
}
