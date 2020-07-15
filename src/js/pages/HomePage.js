import HomePageHtml from "html/layouts/home.html";

import LeagueStandings from "js/components/LeagueStandings";
import { UserDB } from "js/services/db";

customElements.define("league-standings", LeagueStandings, {
  extends: "table",
});

export default class HomePage extends HTMLElement {
  constructor() {
    super();

    // Fetch home page template
    this.innerHTML = HomePageHtml;
  }

  connectedCallback() {
    this.getUserDashboard(1);
  }

  getLeagueStandings() {
    // get league ids followed by user
    let followedLeagues = Object.keys(this.user.leagues);

    let standings = this.querySelector("#standings");

    console.log(followedLeagues);

    // Get league and append
    followedLeagues.forEach((leagueId) => {
      console.log(leagueId);
      let container = document.createElement("div");
      container.classList.add("col", "s12", "standings-container");
      container.append(new LeagueStandings(leagueId));
      standings.append(container);
    });
  }

  getUserDashboard(userId) {
    let userConn = new UserDB();
    userConn
      .fetch(userId)
      .then((res) => {
        this.user = res;

        if (Object.keys(this.user.teams).length > 0) {
          this.getLeagueStandings();
        } else {
          if (!this.registered) {
            this.querySelector(
              "standings"
            ).innerHTML = `<p class="text-center">Belum ada liga yang diikuti. <a href="/settings">Ikuti tim</a></p>`;

            this.querySelector(
              "team-standings"
            ).innerHTML = `<p class="text-center">Belum ada liga yang diikuti. <a href="/settings">Ikuti tim</a></p>`;
          }
        }
      })
      .catch((err) => console.log(err));
  }
}
