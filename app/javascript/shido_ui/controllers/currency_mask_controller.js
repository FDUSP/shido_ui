import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("START CURRENCY MASK")
    this.formatValue()
  }

  format(event) {
    const input = this.element
    let value = input.value

    // Remove tudo que não for número
    value = value.replace(/\D/g, "")

    if (value === "") {
      input.value = ""
      return
    }

    // Garante 2 casas decimais
    value = (parseInt(value, 10) / 100).toFixed(2)

    let [integerPart, decimalPart] = value.split(".")

    // Adiciona separador de milhar
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    input.value = `${integerPart},${decimalPart}`
  }

  formatValue() {
    const input = this.element
    const raw = input.value

    if (!raw) return

    // Se veio do backend como 1000.0 ou 1000.00
    if (/^\d+(\.\d+)?$/.test(raw)) {
      const number = parseFloat(raw)

      input.value = number.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })

      return
    }

    // Se já estiver em formato textual brasileiro
    this.format()
  }
}