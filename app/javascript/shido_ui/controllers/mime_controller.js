import { Controller } from "@hotwired/stimulus";

function downloadBlob(blob, fileName) {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = window.URL.createObjectURL(blob);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(a.href);
}

function formatDate() {
  // Create a date object from a date string
  const date = new Date;
  // Get year, month, and day part from the date
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });
  // Generate dd-mm-yyyy date string
  return `${day}-${month}-${year}`;
}

async function handleResponse(response, that) {
  try {
    const format = response.headers.get('Content-Type');

    if (/application\/pdf/.test(format)) {
      const blob = await response.blob();
      downloadBlob(blob, `${formatDate()}.pdf`);

    } else if (/application\/vnd/.test(format)) {
      const blob = await response.blob();
      downloadBlob(blob, `${formatDate()}.xlsx`);
    
    } else {
      const body = await response.text();
      Turbo.renderStreamMessage(body);
      that.closeModal();
    }

  } catch (err) {
    console.log(err);
  }
}

export default class extends Controller {
  static targets = ['form', 'button'];
  static values = {
    url: String
  }

  execute(e) {
    e.preventDefault();
    const that = this;
    this.buttonTarget.disabled = true;
    this.buttonTarget.textContent = 'Aguarde...';

    fetch(this.urlValue, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'text/vnd.turbo-stream.html',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': document.querySelector("[name='csrf-token']").content
      },
      body: new FormData(this.formTarget),
    })
    .then(response => {
      if (response.ok) {
        handleResponse(response, that);
      } else {
        console.log('response != 200');
      }
      this.buttonTarget.disabled = false;
      this.buttonTarget.textContent = 'Pesquisar';
    })
    .catch(err => {
      console.log('error', err);
      this.buttonTarget.disabled = false;
      this.buttonTarget.textContent = 'Pesquisar';
    });
  }

  closeModal() {
    this.dispatch('close-modal');
  }

  connect() {
    console.log('START MIME');
  }
}