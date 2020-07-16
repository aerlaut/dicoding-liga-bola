import { fetchData } from "js/services/api";

import StandingItem from "js/components/StandingItem";

customElements.define("standing-item", StandingItem, { extends: "tr" });

export default class LeagueStandings extends HTMLTableElement {
  constructor(input) {
    super();

    if (Array.isArray(input)) {
      this.type = "predefined";
      this.standings = input;
    } else if (!isNaN(parseInt(input))) {
      this.type = "fetch";
      this.leagueId = input;
    }

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
    if (this.type == "predefined") {
      let tbody = this.querySelector("tbody");
      this.standings.forEach((d) => {
        tbody.append(new StandingItem(d));
      });
    }

    if (this.type == "fetch") {
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
}
