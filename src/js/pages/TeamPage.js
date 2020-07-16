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

        this.getStandings();
        this.getMatches();
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
            standings = table.slice(position - 3, position + 2);
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
        let inner = "";

        if (res.count == 0) {
          inner = '<div class="text-center">Belum ada match berikutnya</div>';
        } else {
          inner = `
          <table>
            <thead>
            <tr>
              <th class="text-center">Home</th>
              <th class="text-center">
              <th class="text-center">Away</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
        `;

          res.matches.forEach((m) => {
            console.log(m);
            inner += `
            <tr>
              <td class="text-center"><a class="team-button" team-id=${m.HomeTeam.id}>${m.HomeTeam.name}</a></td>
              <td>VS</td>
              <td class="text-center"><a class="team-button" team-id=${m.awayTeam.id}>${m.awayTeam.name}</a></td>
              <td>${m.competition.name}</td>
              <td>${m.utcDate}</td>
              <td><button class="btn">+</button></td>
              </tr>
          `;
          });

          inner += `</tbody></table>`;
        }

        this.querySelector("#upcoming-matches").innerHTML = inner;
      })
      .catch((err) => console.log(err));

    // Get previous 5 matches
    fetchData(`teams/${this.data.id}/matches?status=FINISHED&limit=5`)
      .then((res) => res.json())
      .then((res) => {
        let inner = `
          <table>
            <thead>
            <tr>
              <th class="text-center">Home</th>
              <th></th>
              <th></th>
              <th></th>
              <th class="text-center">Away</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
        `;

        res.matches.forEach((m) => {
          let winClass =
            m.score.winner == "HOME_TEAM"
              ? "teal lighten-3"
              : m.score.winner == "AWAY_TEAM"
              ? "red lighten-3"
              : "yellow lighten-3";

          inner += `
            <tr class="${winClass}">
              <td class="text-center"><a class="team-button" team-id=${
                m.homeTeam.id
              }>${m.homeTeam.name}</a></td>
              <td class="text-center">${m.score.fullTime.homeTeam}</td>
              <td class="text-center">VS</td>
              <td class="text-center">${m.score.fullTime.awayTeam}</td>
              <td class="text-center"><a class="team-button" team-id=${
                m.awayTeam.id
              }>${m.awayTeam.name}</a></td>
              <td>${m.competition.name}</td>
              <td>${this.convertToWIB(m.utcDate)}</td>
              </tr>
          `;
        });

        this.querySelector("#previous-matches").innerHTML = inner;
      })
      .catch((err) => console.log(err));
  }

  convertToWIB(utcDate) {
    // Convert to minutes
    utcDate = Date.parse(utcDate);

    // Add + 7
    let newDate = new Date(utcDate + 7 * 60 * 60 * 1000);

    let year = newDate.getFullYear();
    let month = (newDate.getMonth() + 1).toString();
    month = month.length < 2 ? "0" + month : month;

    let date = newDate.getDate().toString();
    date = date.length < 2 ? "0" + date : date;

    let hour = ((newDate.getHours() + 24) % 12 || 12).toString();
    hour = hour.length < 2 ? "0" + hour : hour;

    let minute = newDate.getMinutes().toString();
    minute = minute.length < 2 ? "0" + minute : minute;

    return `${year}-${month}-${date} ${hour}:${minute} WIB`;
  }
}
