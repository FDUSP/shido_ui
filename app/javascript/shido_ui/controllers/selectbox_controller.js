import { Controller } from '@hotwired/stimulus';
import Choices from 'choices.js';

export default class extends Controller {
  static targets = ['my'];

  connect() {
    console.log('START SELECTBOX');

    this.choices = new Choices(this.myTarget, {
      removeItemButton: true,
      classNames: {
        containerInner: 'my__choices__inner',
      }
    });
  }

  disconnect() {
    this.choices.destroy();
  }

}