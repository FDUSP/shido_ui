import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['content', 'loading', 'link'];

  connect() {
    console.log('START LOADING');
  }

  displayLoading(e) {
    const target = e.target;
    if (target.classList.contains('is-disabled')) {
      e.preventDefault();
      return false;
    }

    this.loadingTargets.forEach(loading => {
      loading.classList.remove('is-hidden');
    });
    this.contentTargets.forEach(loading => {
      loading.classList.add('is-hidden');
    });

    //this.updateLinks(value);
  }

  displayContent() {
    if (this.hasLoadingTarget) {
      this.loadingTargets.forEach(loading => {
        loading.classList.add('is-hidden');
      });
    }
    this.contentTargets.forEach(loading => {
      loading.classList.remove('is-hidden');
    });
  }

  // Iterate all of our links, remove the selected class, but then add
  // if the link href matches the url we're navigating to.
  updateLinks(item) {
    this.linkTargets.forEach((link) => {
      link.classList.remove('selected');
      if (link.href === item) {
        link.classList.add('selected');
      }
    })
  }
}