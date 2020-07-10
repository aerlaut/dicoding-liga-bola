import HomePage from "js/pages/Home";
import HomePageHtml from "html/layouts/home.html";

customElements.define("home-page", HomePage);

export default class AppContainer extends HTMLElement {
  constructor() {
    super();

    if (this.page == null) {
      this.page = "dashboard";
    }
  }

  connectedCallback() {
    // if page is not set, load dashboard
    this.displayPage(this.page);
  }

  // Route according to the page
  displayPage(page) {
    // Erase page and show loading spinner
    this.innerHTML = "";

    // Load page into container
    this.innerHTML = HomePageHtml;
  }
}
