import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['fileInput', 'fileName']

  connect() {
    console.log('START UPLOAD FIELD CONTROLLER')
  }

  updateFileName() {
    const fileName = this.fileInputTarget.files[0]?.name || ''
    if (this.hasFileNameTarget) {
      this.fileNameTarget.textContent = fileName
    }
  } 

}
