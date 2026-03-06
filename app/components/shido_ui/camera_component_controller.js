import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "video",
    "canvas",
    "captureButton",
    "status"
  ]

  static values = {
    url: String
  }

  async connect() {
    await this.startCamera()
  }

  async startCamera() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false
    })

    this.videoTarget.srcObject = this.stream
  }

  async capture(e) {
    console.log("Capturando imagem...")
    e.preventDefault()
    const that = this
    
    const video = this.videoTarget
    const canvas = this.canvasTarget
    const context = canvas.getContext("2d")

    const size = Math.min(video.videoWidth, video.videoHeight)
    const OUTPUT_SIZE = 400

    canvas.width = OUTPUT_SIZE
    canvas.height = OUTPUT_SIZE
    context.drawImage(
      video,
      (video.videoWidth - size) / 2,
      (video.videoHeight - size) / 2,
      size,
      size,
      0,
      0,
      OUTPUT_SIZE,
      OUTPUT_SIZE
    )

    const base64 = canvas.toDataURL("image/jpeg", 0.9)

    try {
      const response = await fetch(this.urlValue, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Accept': 'text/vnd.turbo-stream.html',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': document.querySelector("[name='csrf-token']").content
        },
        body: JSON.stringify({
          photo: base64
        })
      })

      if (response.ok || response.status === 422) {
        const body = await response.text();
        Turbo.renderStreamMessage(body);
        that.closeModal();
      } else {
        console.log('response != 200 or 422');
      }

      this.statusTarget.innerText = "Imagem enviada ✔"
      this.statusTarget.className = "has-text-success"
    
    } catch (err) {
      console.error("Erro ao enviar imagem:", err)
      this.statusTarget.innerText = "Erro ao enviar imagem"
      this.statusTarget.className = "has-text-danger"
      return
    }
  }

  closeModal() {
    this.dispatch('close-modal');
  }

  disconnect() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop())
    }
  }
}
