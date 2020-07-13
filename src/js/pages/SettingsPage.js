import SettingsPageLayout from "html/layouts/settings.html";
import { getLeagueTeams } from "js/services/api";

export default class SettingsPage extends HTMLElement {
  constructor() {
    super();

    this.teamsSelection = [];
    this.followedTeams = {};
    this.teamSelect = null;

    this.data = {
      options: {
        leagues: [
          {
            id: 2002,
            name: "Liga Jerman",
          },
          {
            id: 2003,
            name: "Liga Belanda",
          },
          {
            id: 2021,
            name: "Liga Inggris",
          },
          {
            id: 2014,
            name: "Liga Spanyol",
          },
          {
            id: 2015,
            name: "Liga Perancis",
          },
        ],
      },
    };

    this.innerHTML = SettingsPageLayout;

    // Initialize event listeners
    this.initializeLeagueSelect();
  }

  connectedCallback() {
    this.initializeButtons();
  }

  // Initialize league select
  initializeLeagueSelect() {
    // Append options to select
    const leagueSelect = this.querySelector("#league-select");

    let leagueOptions = "";
    this.data.options.leagues.forEach((e) => {
      leagueOptions += `<option value="${e.id}">${e.name}</option>`;
    });

    leagueSelect.innerHTML = leagueOptions;

    // Populate teamSelect with first values
    this.teamSelect = this.querySelector("#team-select");
    let firstLeague = this.data.options.leagues[0].id;

    this.loadTeams(firstLeague);

    // Initialize select fields
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll("select");
      M.FormSelect.init(elems);
    });

    // Populate team team when a league is chosen
    leagueSelect.addEventListener("change", (e) => {
      // Get teams in league
      this.loadTeams(e.target.value);
    });
  }

  loadTeams(league_id) {
    getLeagueTeams(league_id)
      .then((res) => res.json())
      .then((res) => {
        if (res.count == 0) {
          return false;
        }

        // Local copy
        this.teamsSelection = res.teams;

        // Insert options
        let teamOptions = "";
        this.teamsSelection.forEach((team, id) => {
          teamOptions += `<option value="${id}">${team.name}</option>`;
        });

        this.teamSelect.innerHTML = teamOptions;

        // Reinitialize teamSelect
        M.FormSelect.init(this.teamSelect);
      })
      .catch((err) => console.log(err));
  }

  initializeButtons() {
    // Add watcher to add team
    const AddTeamButton = this.querySelector("#add-team");

    AddTeamButton.addEventListener("click", (e) => {
      // Add team if not in this.followedTeams
      let idxNo = this.teamSelect.value;
      let selected = this.teamsSelection[idxNo];

      if (!this.followedTeams.hasOwnProperty(selected.id)) {
        this.followedTeams[selected.id] = this.teamsSelection[idxNo];
      }

      showFollowedTeams();
    });
  }

  // Show followed teams
}
