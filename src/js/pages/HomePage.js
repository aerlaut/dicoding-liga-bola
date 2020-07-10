import ArticleContainer from "../components/ArticleContainer";
import ArticleContainer from "../components/ArticleContainer";

customElements.define("article-container", ArticleContainer);

export default class HomePage extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = "";
  }

  connectedCallback() {
    // Load article info
    // fetch(url).then(res => { document.getElementById() })
  }
}
