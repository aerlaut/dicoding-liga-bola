import HomePage from "js/pages/Home";

customElements.define("home-page", HomePage);

export default class AppContainer extends HTMLElement {
  constructor() {
    super();
    this.page = "home";
  }

  connectedCallback() {
    // if page is not set, load dashboard
    this.displayPage(this.page);
  }

  // Route according to the page
  displayPage(page) {
    // Erase page and show loading spinner
    this.innerHTML = "";

    if (page == "home") {
      this.innerHTML = "<home-page></home-page>";
    }
  }
}
