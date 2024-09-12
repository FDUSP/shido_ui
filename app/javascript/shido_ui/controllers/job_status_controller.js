import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ['log', 'download'];
  static values = {
    url: String,
    showDownloadButton: { type: Boolean, default: false },
    downloadUrl: String,
    autostart: { type: Boolean, default: false },
  }

  connect() {
    console.log('START JOB STATUS');
    if (this.autostartValue)
      this.startRefresh();
  }

  startRefresh() {
    this.logTarget.classList.remove("is-hidden");
    this.logTarget.innerText = '\n==> Iniciando...\n\n';

    // Start polling at 1 second interval
    this.timer = setInterval(() => {
      this.refresh();
    }, 1000);
  }

  refresh() {
    fetch(this.urlValue)
    .then(blob => blob.json())
    .then(status => {
      // Update log and auto-scroll to the bottom
      this.logTarget.innerText = status.log;
      this.logTarget.scrollTop = this.logTarget.scrollHeight;

      if (status.error) {
        this.stopRefresh();
        // Add additional error handling as needed
      } else if (status.completed || status.completed_at) {
        this.stopRefresh();
        if (this.showDownloadButtonValue) {
          // Show a download button, or take some other action
          this.downloadTarget.href = `${this.downloadUrlValue}?filename=${status.download_key}`;
          this.downloadTarget.classList.remove('is-hidden');
        }
      }
    });
  }

  stopRefresh() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.dispatch('jobend');
  }

  disconnect() {
    // Stop the timer when we teardown the component
    this.stopRefresh();
  }
}