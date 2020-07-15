import HomePageHtml from "html/layouts/home.html";

import LeagueStandings from "js/components/LeagueStandings";

customElements.define("league-standings", LeagueStandings, {
  extends: "table",
});

export default class HomePage extends HTMLElement {
  constructor() {
    super();

    // Fetch home page template
    this.innerHTML = HomePageHtml;
    this.registered = false;
  }

  connectedCallback() {
    let standing = new LeagueStandings(2021);

    this.querySelector(".standings-container").append(standing);
  }
}
