import HomePage from "js/pages/HomePage";
import SettingsPage from "js/pages/SettingsPage";
import ClubPage from "js/pages/ClubPage";
import NotFoundPage from "js/pages/NotFoundPage";

customElements.define("home-page", HomePage);
customElements.define("settings-page", SettingsPage);
customElements.define("club-page", ClubPage);
customElements.define("page-not-found", NotFoundPage);

export default class AppContainer extends HTMLElement {
  constructor() {
    super();

    // Initialize pages
    this.pages = {
      home: new HomePage(),
      settings: new SettingsPage(),
      club: new ClubPage(),
      "404": new NotFoundPage(),
    };

    // Get page from current url
    let url = window.location.pathname.split("/")[1];

    if (url != "") {
      this.page = url;
    } else {
      this.page = "home";
    }
  }

  connectedCallback() {
    // if page is not set, load dashboard

    console.log(this.page);
    this.displayPage(this.page);

    // Handle page changes
    this.addEventListener(
      "navigate",
      (e) => {
        let splits = e.detail.split("/");
        let page = splits[splits.length - 1];

        this.displayPage(page);
      },
      false
    );
  }

  // Route according to the page
  displayPage(page) {
    this.innerHTML = "";

    if (this.pages.hasOwnProperty(page)) {
      this.append(this.pages[page]);
    } else {
      // 404 Not found
      this.append(this.pages["404"]);
    }
  }
}
