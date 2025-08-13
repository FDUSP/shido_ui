import { Controller } from '@hotwired/stimulus';
import Choices from 'choices.js';

export default class extends Controller {
  static targets = ['my'];
  static values = {
    urlCollection: String,
    labelName: String,
    placeholder: String,
  }

  connect() {
    console.log('START SELECTBOXAJAX');
    if (!this.hasMyTarget)
      return;

    this.choices = new Choices(this.myTarget, {
      allowHTML: false,
      searchPlaceholderValue: this.placeholderValue,
      renderChoiceLimit: 5,
      removeItems: true,
      removeItemButton: true,
      classNames: {
        containerInner: 'my__choices__inner',
      },
    });

    const fetchData = async () => {
      try {
        const response = await fetch(this.urlCollectionValue);
        const items = await response.json();
        return items.map(item => ({ label: item[this.labelNameValue], value: item.id }));
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    };

    // after data is fetched set choice according to value passed in data-val
    (async () => {
      try {
        const instance = await this.choices.setChoices(await fetchData());
        if (this.myTarget.dataset?.val === undefined) return;
        
        if (this.myTarget.dataset.val.startsWith('[')) {
          instance.setChoiceByValue(JSON.parse(this.myTarget.dataset.val));
        } else {
          instance.setChoiceByValue(parseInt(this.myTarget.dataset.val));
        }
      } catch (error) {
        console.error('Error setting choices:', error);
      }
    })();

  }

  disconnect() {
    //if (!this.choices === undefined)
    this.choices.destroy();
  }
}