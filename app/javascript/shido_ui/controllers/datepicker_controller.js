import flatPickr from 'flatpickr';
import 'flatpickr/dist/l10n/pt.js';
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [ 'dt' ];

  connect() {
    console.log('START DATEPICKER');

    this.fp = flatPickr(this.dtTarget, {
      "locale": "pt",
      // em modal o calendário vai para o body: o .modal-card-body rola e cortaria o calendário
      static: !this.element.closest('.modal'),
      allowInput: true,
      dateFormat: "d/m/Y",
    });
  }

  disconnect() {
    this.fp.destroy();
  }

}