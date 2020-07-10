import Article from "./Article";

export default class ArticleContainer extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = "Article page";
  }

  connectedCallback() {
    // Get data
  }
}
