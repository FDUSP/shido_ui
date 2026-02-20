import { Controller } from '@hotwired/stimulus'
import Choices from 'choices.js'

export default class extends Controller {
  static targets = ['select']
  static values = {
    urlCollection: String,
    labelName: String,
    placeholder: String
  }

  connect() {
    if (!this.hasSelectTarget) return

    this.abortController = null
    this.debounceTimer = null

    this.choices = new Choices(this.selectTarget, {
      allowHTML: false,
      removeItemButton: true,
      searchPlaceholderValue: this.placeholderValue,
      shouldSort: false,
      searchResultLimit: 10,
      renderChoiceLimit: 10,
      duplicateItemsAllowed: false
    })

    this.setInitialValue()
    this.setupSearchListener()
  }

  disconnect() {
    if (this.abortController) {
      this.abortController.abort()
    }

    if (this.choices) {
      this.choices.destroy()
      this.choices = null
    }
  }

  setupSearchListener() {
    this.selectTarget.addEventListener('search', (event) => {
      const value = event.detail.value

      clearTimeout(this.debounceTimer)

      this.debounceTimer = setTimeout(() => {
        this.search(value)
      }, 350)
    })
  }

  async search(query) {
    if (!query || query.length < 2) return

    if (this.abortController) {
      this.abortController.abort()
    }

    this.abortController = new AbortController()

    try {
      const response = await fetch(
        `${this.urlValue}?q=${encodeURIComponent(query)}`,
        { signal: this.abortController.signal }
      )

      const data = await response.json()

      const choices = data.map(item => ({
        value: String(item.id),
        label: item[this.labelValue]
      }))

      this.choices.clearChoices()
      this.choices.setChoices(choices, 'value', 'label', true)

    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Search error:', error)
      }
    }
  }

  setInitialValue() {
    const val = this.selectTarget.dataset?.val
    if (!val) return

    try {
      const parsed = val.startsWith('[') ? JSON.parse(val) : [val]
      this.choices.setChoiceByValue(parsed.map(String))
    } catch (e) {
      console.warn('Invalid initial value', e)
    }
  }
}
