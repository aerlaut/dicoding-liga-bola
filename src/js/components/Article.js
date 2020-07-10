export default class Article extends HTMLElement {
  constructor(article) {
    super();
    this.innerHTML = article;
  }

  connectedCallback() {}
}
