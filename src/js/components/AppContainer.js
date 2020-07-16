import HomePage from "js/pages/HomePage";
import SettingsPage from "js/pages/SettingsPage";
import TeamPage from "js/pages/TeamPage";
import NotFoundPage from "js/pages/NotFoundPage";

customElements.define("home-page", HomePage);
customElements.define("settings-page", SettingsPage);
customElements.define("team-page", TeamPage);
customElements.define("page-not-found", NotFoundPage);

export default class AppContainer extends HTMLElement {
  constructor() {
    super();

    // Initialize pages
    this.pages = {
      home: new HomePage(),
      settings: new SettingsPage(),
      team: new TeamPage(),
      "404": new NotFoundPage(),
    };

    // Get page from current url
    let pathSplit = window.location.pathname.split("/");
    let url = pathSplit[1];
    let param = pathSplit[2];

    if (url != "") {
      this.page = url;
    } else {
      this.page = "home";
    }
  }

  connectedCallback() {
    // if page is not set, load dashboard
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
