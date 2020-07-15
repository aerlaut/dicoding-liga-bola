import { fetchData } from "js/services/api";

import StandingItem from "js/components/StandingItem";

customElements.define("standing-item", StandingItem);

export default class LeagueStandings extends HTMLElement {
  constructor(leagueId) {
    super();

    // if leagueId not set, use default 'English Premier League id 2021'
    this.leagueId = leagueId == null ? leagueId : 2021;

    // Fetch home page template
    this.classList.add("collection", "league-standing");
  }

  connectedCallback() {
    // Get standings data
    fetchData(`competitions/${this.leagueId}/standings`)
      .then((res) => res.json())
      .then((res) => {
        // Load standings
        res.standings[0].table.forEach((d) => {
          console.log(d);
          this.append(new StandingItem(d));
        });
      });
  }
}
