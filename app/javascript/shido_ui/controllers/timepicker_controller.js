import flatPickr from 'flatpickr';
import 'flatpickr/dist/l10n/pt.js';
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ['time'];

  connect() {
    console.log('START TIMEPICKER');

    this.fp = flatPickr(this.timeTarget, {
      "locale": "pt",
      // em modal o calendário vai para o body: o .modal-card-body rola e cortaria o calendário
      static: !this.element.closest('.modal'),
      enableTime: true,
      noCalendar: true,
      allowInput: true,
      time_24hr: true,
      dateFormat: "H:i",
    });
  }

  disconnect() {
    this.fp.destroy();
  }

}