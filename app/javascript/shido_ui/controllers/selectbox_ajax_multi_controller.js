import { Controller } from '@hotwired/stimulus'
import Choices from 'choices.js'

export default class extends Controller {
  static targets = ['my']
  static values = {
    urlCollection: String,
    labelName: String,
    placeholder: String
  }

  connect() {
    console.log('START SELECTBOXAJAXMULTI')
    if (!this.hasMyTarget) return

    this.abortController = null
    this.debounceTimer = null

    this.choices = new Choices(this.myTarget, {
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
    this.myTarget.addEventListener('search', event => {
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
        `${this.urlCollectionValue}?q=${encodeURIComponent(query)}`,
        { signal: this.abortController.signal }
      )

      const data = await response.json()

      const choices = data.map(item => ({
        value: String(item.id),
        label: item[this.labelNameValue]
      }))

      this.choices.clearChoices()
      this.choices.setChoices(choices, 'value', 'label', true)

    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Search error:', error)
      }
    }
  }

  async setInitialValue() {
    const val = this.myTarget.dataset?.val
    if (!val) return

    try {
      const values = (val.startsWith('[') ? JSON.parse(val) : [val]).map(String)
      const choices = []

      for (const value of values) {
        const response = await fetch(`${this.urlCollectionValue}?q=${encodeURIComponent(value)}`)
        const data = await response.json()
        const item = data.find(item => String(item.id) === value) || data[0]

        if (item) {
          choices.push({
            value: String(item.id),
            label: item[this.labelNameValue]
          })
        }
      }

      this.choices.setChoices(choices, 'value', 'label', false)
      this.choices.setChoiceByValue(values)
    } catch (e) {
      console.warn('Invalid initial value', e)
    }
  }
}
