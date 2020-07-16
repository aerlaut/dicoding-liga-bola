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
  displayPage(route) {
    this.innerHTML = "";

    // Switch route
    let page = null;
    switch (route) {
      case "settings":
        page = new SettingsPage();
        break;
      case "team":
        page = new TeamPage();
        break;
      case "home":
        page = new HomePage();
        break;
      default:
        page = new NotFoundPage();
        break;
    }

    this.append(page);
  }
}
