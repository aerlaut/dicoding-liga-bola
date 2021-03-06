import HomePageHtml from "html/layouts/home.html";

import TeamItem from "js/components/TeamItem";
import { UserDB } from "js/services/db";

customElements.define("team-item", TeamItem, {
  extends: "div",
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

  getTeamStandings() {
    // get league ids followed by user
    let followedTeams = Object.values(this.user.teams);
    let teamsList = this.querySelector("#team-standings");

    if (followedTeams.length == 0) {
      teamsList.innerHTML = `<p class="text-center">Belum ada tim yang diikuti. <a href="/settings">Ikuti tim</a></p>`;
      return;
    }

    // Get league and append
    followedTeams.forEach((team) => {
      teamsList.append(new TeamItem(team));
    });

    // Add event listener
    teamsList.querySelectorAll(".team-item").forEach((div) => {
      div.addEventListener("click", (e) => {
        let appContainer = document.querySelector("app-container");

        // Push URL and manuall trigger popstate
        let url =
          window.location + `team/${e.currentTarget.getAttribute("team-id")}`;

        history.pushState({}, null, url);
        appContainer.dispatchEvent(
          new CustomEvent("navigate", { detail: url })
        );
      });
    });
  }

  getLeagueStandings() {
    // get league ids followed by user
    let followedLeagues = Object.keys(this.user.leagues);

    if (followedLeagues.length == 0) {
      this.querySelector(
        "standings"
      ).innerHTML = `<p class="text-center">Belum ada liga yang diikuti. <a href="/settings">Ikuti tim</a></p>`;
      return;
    }
  }

  getUserDashboard(userId) {
    let userConn = new UserDB();
    userConn
      .fetch(userId)
      .then((res) => {
        this.user = res;

        // this.getLeagueStandings();
        this.getTeamStandings();
      })
      .catch((err) => console.err(err));
  }
}
