import TeamHtml from "html/layouts/team.html";

import { fetchData } from "js/services/api";

export default class TeamPage extends HTMLElement {
  constructor(team) {
    super();

    let inner = TeamHtml;

    inner = inner.replace("{{ team.name }}", team.name);
    inner = inner.replace("{{ team.crestUrl }}", team.crestUrl);

    this.innerHTML = inner;
    this.data = team;
  }

  connectedCallback() {
    // Get team data
    this.getStandings(this.team.leagueId);
    this.getMatches(this.team.id);
    this.getSquad(this.team.id);
  }

  // Populate league standings
  getStandings(leagueId) {
    fetchData(`competitions/${team.leagueId}/standings?standingType=TOTAL`)
      .then((res) => res.json())
      .then((res) => {
        let table = res.standings[0].table;

        // Search positions in table
        let position = null;
        table.some((team) => {
          if (team.id == this.data.id) {
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
            standings = table[(0, 5)];
          } else if (table.length - position < 3) {
            // Get  bottom 5

            standings = table[table.length - 5];
          } else if (position > 3) {
            standings = table[(position - 2, position + 2)];
          }
        }

        // Show standing table
        let standingTable = this.querySelector("#standing-table");

        standingTable.innerHTML = `
          <thead>
          <tr>
            <th>Pos</th>
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
        <tbody>
      `;

        standings.forEach((s) => {
          console.log(s);

          standingTable.innerHTML += `
            <td>${s.position}</td>
            <td><img src="${s.team.crestUrl}" /></td>
            <td class="title">${s.team.name}</td>
            <td class="mr-4">${s.playedGames}</td>
            <td class="mr-4">${s.won}</td>
            <td class="mr-4">${s.draw}</td>
            <td class="mr-4">${s.lost}</td>
            <td class="mr-4">${s.goalsFor}</td>
            <td class="mr-4">${s.goalsAgainst}</td>
            <td class="mr-4">${s.goalDifference}</td>
          `;
        });

        standingTable.innerHTML += `</tbody>`;
      })
      .catch((err) => console.log(err));
  }

  // Get next and previous matches
  getMatches(teamId) {
    // Get next 5 matches
    fetchData(`teams/${teamId}/matches?status=SCHEDULED&limit=5`)
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
    fetchData(`teams/${teamId}/matches?status=FINISHED&limit=5`)
      .then((res) => res.json())
      .then((res) => {
        res.matches;

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
  getSquad(teamId) {
    fetchData(`competitions/${teamId}`)
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
