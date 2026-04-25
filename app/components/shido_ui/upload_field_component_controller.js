import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['fileInput', 'fileName']

  static values = {
    menu: { type: String, default: '' },
    submenu: { type: String, default: '' },
  }

  updateFileName() {
    const fileName = this.fileInputTarget.files[0]?.name || ''
    if (this.hasFileNameTarget) {
      this.fileNameTarget.textContent = fileName
    }
  } 

}
