import flatPickr from 'flatpickr';
import 'flatpickr/dist/l10n/pt.js';
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ['dttime'];

  connect() {
    console.log('START DATETIMEPICKER');

    this.fp = flatPickr(this.dttimeTarget, {
      "locale": "pt",
      // em modal o calendário vai para o body: o .modal-card-body rola e cortaria o calendário
      static: !this.element.closest('.modal'),
      enableTime: true,
      allowInput: true,
      time_24hr: true,
      minuteIncrement: 1,
      dateFormat: "d/m/Y H:i",
    });
  }

  disconnect() {
    this.fp.destroy();
  }

}