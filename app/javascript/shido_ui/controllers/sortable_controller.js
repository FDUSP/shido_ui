import Sortable from 'sortablejs';
import { Controller } from "@hotwired/stimulus";
import { patch } from '@rails/request.js';

export default class extends Controller {
  static targets = ['button', 'field'];

  async end(e) {
    const id = e.item.dataset.id;
    const data = new FormData();
    data.append('position', e.newIndex + 1);

    try {
      const response = await patch(this.data.get('url').replace(":id", id), { 
        body: data,
        responseKind: "json" 
      });
      if (response.ok) {
        return response;
      }

    } catch(err) {
      console.log('Error:', err);
    }
  }

  connect() {
    console.log('START SORTABLE')
    this.sortable = Sortable.create(this.element, {
      onEnd: this.end.bind(this)
    })
  }

}