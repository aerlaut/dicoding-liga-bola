import { fetchData } from "js/services/api";

import StandingItem from "js/components/StandingItem";

customElements.define("standing-item", StandingItem, { extends: "tr" });

export default class LeagueStandings extends HTMLTableElement {
  constructor(leagueId) {
    super();

    // if leagueId not set, use default 'English Premier League id 2021'
    this.leagueId = leagueId == null ? leagueId : 2021;
    this.classList.add("league-standings");
    this.innerHTML = `
      <thead>
        <tr>
          <th></th>
          <th>Tim</th>
          <th>P</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GF</th>
          <th>GA</th>
          <th>Diff</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
  }

  connectedCallback() {
    // Get standings data
    fetchData(`competitions/${this.leagueId}/standings`)
      .then((res) => res.json())
      .then((res) => {
        let tbody = this.querySelector("tbody");

        // Load standings
        res.standings[0].table.forEach((d) => {
          tbody.append(new StandingItem(d));
        });
      });
  }
}
