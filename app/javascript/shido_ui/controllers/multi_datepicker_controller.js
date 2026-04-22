import flatPickr from 'flatpickr';
import 'flatpickr/dist/l10n/pt.js';
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ['dts'];

  connect() {
    console.log('START MULTI DATEPICKER');

    this.fp = flatPickr(this.dtsTarget, {
      "locale": "pt",
      mode: 'multiple',
      allowInput: true,
      dateFormat: "d/m/Y",
      static: true,
    });
  }

  disconnect() {
    this.fp.destroy();
  }

}