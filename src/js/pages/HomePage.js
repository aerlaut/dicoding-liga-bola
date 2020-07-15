import HomePageHtml from "html/layouts/home.html";

import LeagueStandings from "js/components/LeagueStandings";
import { fetchData } from "js/services/api";
import { UserDB } from "js/services/db";

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

    this.getLeagueStandings();
  }

  getLeagueStandings() {
    let userConn = new UserDB();
    userConn
      .fetch(1)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
}
