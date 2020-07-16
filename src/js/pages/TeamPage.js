import TeamHtml from "html/layouts/team.html";
import LeagueStandings from "js/components/LeagueStandings";

import { fetchData } from "js/services/api";
import { UserDB } from "js/services/db";

// if (!customElements.get("league-standings")) {
customElements.define("league-standings", LeagueStandings, {
  extends: "table",
});
// }

export default class TeamPage extends HTMLElement {
  constructor(teamId) {
    super();
    this.innerHTML = TeamHtml;
    this.data = {
      id: teamId,
    }; // just team id for now
  }

  connectedCallback() {
    // Get team data
    this.getTeamDetails();
  }

  // Get team details
  getTeamDetails() {
    // Get team from user details
    this.userConn = new UserDB();
    this.userConn
      .fetch(1)
      .then((user) => {
        this.data = user.teams[this.data.id];

        this.innerHTML = this.innerHTML.replace(
          `{{ team.name }}`,
          this.data.name
        );
        this.innerHTML = this.innerHTML.replace(
          `{{ team.crestUrl }}`,
          this.data.crestUrl
        );

        // this.getStandings();
        this.getMatches();
        // this.getSquad();
      })
      .catch((err) => console.error(err));
  }

  // Populate league standings
  getStandings() {
    fetchData(`competitions/${this.data.leagueId}/standings?standingType=TOTAL`)
      .then((res) => res.json())
      .then((res) => {
        let table = res.standings[0].table;

        // Search positions in table
        let position = null;
        table.some((team) => {
          if (team.team.id == this.data.id) {
            position = team.position;
            return true;
          }
        });

        // Get -2 and +2 of position
        let standings = [];
        if (table.length <= 5) {
          // get all
          standings = table;
        } else {
          if (position < 3) {
            // Get top 5
            standings = table.slice(0, 5);
          } else if (table.length - position < 3) {
            // Get  bottom 5

            standings = table[table.length - 5];
          } else if (position > 3) {
            standings = table.slice(position - 2, position + 3);
          }
        }

        // Show standing table
        let standingTable = this.querySelector("#standing-table");

        // Get league and append
        standingTable.classList.add(
          "col",
          "s12",
          "standings-container",
          "card-panel",
          "p-4"
        );

        standingTable.append(new LeagueStandings(standings));
      })
      .catch((err) => console.log(err));
  }

  // Get next and previous matches
  getMatches() {
    // Get next 5 matches
    fetchData(`teams/${this.data.id}/matches?status=SCHEDULED&limit=5`)
      .then((res) => res.json())
      .then((res) => {
        let container = this.querySelector("#upcoming-matches");

        container.innerHTML = `
            <thead>
            <tr>
              <th>Home</th>
              <th></th>
              <th>Away</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
        `;

        res.matches.forEach((m) => {
          container.innerHTML += `
            <tr>
              <td><a class="team-button" team-id=${m.HomeTeam.id}>${m.HomeTeam.name}</a></td>
              <td>VS</td>
              <td><a class="team-button" team-id=${m.awayTeam.id}>${m.awayTeam.name}</a></td>
              <td>${m.competition.name}</td>
              <td>${m.utcDate}</td>
              <td><button class="btn">+</button></td>
              </tr>
          `;
        });

        container.innerHTML = `</tbody>`;
      })
      .catch((err) => console.log(err));

    // Get previous 5 matches
    fetchData(`teams/${this.data.id}/matches?status=FINISHED&limit=5`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        let container = this.querySelector("#previous-matches");

        container.innerHTML = `
            <thead>
            <tr>
              <th>Home</th>
              <th></th>
              <th>Away</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
        `;

        res.matches.forEach((m) => {
          console.log(m);

          let winClass =
            m.score.winner == "HOME_TEAM"
              ? "teal lighten-3"
              : m.score.winner == "AWAY_TEAM"
              ? "red lighten-3"
              : "yellow lighten-3";

          container.innerHTML += `
            <tr class="${winClass}">
              <td><a class="team-button" team-id=${m.HomeTeam.id}>${m.HomeTeam.name}</a> ${m.score.fullTime.homeTeam}</td>
              <td>VS</td>
              <td>${m.score.fullTime.awayTeam} <a class="team-button" team-id=${m.awayTeam.id}>${m.awayTeam.name}</a></td>
              <td>${m.competition.name}</td>
              <td>${m.utcDate}</td>
              </tr>
          `;
        });

        container.innerHTML = `</tbody>`;
      })
      .catch((err) => console.log(err));
  }

  // Set team data
  getSquad() {
    fetchData(`teams/${this.data.id}`)
      .then((res) => res.json())
      .then((res) => {
        let squadContainer = this.querySelector("#current-squad");
        // Check if squad is empty
        if (res.squad.length == 0) {
          squadContainer.innerHTML = `<div class="text-center">Tidak ada data</div>`;
          return;
        }

        // Populate squad
        res.squad.forEach((player) => {
          let tmp = `<div class="player-item collection-item">
                        <span class="shirt-number">${
                          player.shirtNumber == null ? "" : player.shirtNumber
                        }</span>
                        <strong class="name">${player.name}</strong>
                        <span class="position">${player.position}</span>
                      </div>`;

          squadContainer.innerHtml += tmp;
        });
      })
      .catch((err) => console.log(err));
  }
}
