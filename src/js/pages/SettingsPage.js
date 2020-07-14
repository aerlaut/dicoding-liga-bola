import SettingsPageLayout from "html/layouts/settings.html";
import { getLeagueTeams } from "js/services/api";
import db from "js/services/db";

export default class SettingsPage extends HTMLElement {
  constructor() {
    super();

    // Init object props
    this.teamsSelection = [];
    this.followedTeams = {};
    this.leagueSelect = null;
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
  }

  connectedCallback() {
    // Initialize event listeners
    this.initLeagueSelect();
    this.initButtons();
    this.initFollowedTeams();
  }
-
  // Initialize league select
  initLeagueSelect() {
    // Append options to select
    this.leagueSelect = this.querySelector("#league-select");

    let leagueOptions = "";
    this.data.options.leagues.forEach((e) => {
      leagueOptions += `<option value="${e.id}">${e.name}</option>`;
    });

    this.leagueSelect.innerHTML = leagueOptions;

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
    this.leagueSelect.addEventListener("change", (e) => {
      // Get teams in league
      this.loadTeams(e.target.value);
    });
  }

  // Initialize followed teams
  initFollowedTeams() {
    this.followedTeamsList = this.querySelector("#followed-teams-list");
  }

  // Initialize follow buttons
  initButtons() {
    // Add eventlistener to add button
    const AddTeamButton = this.querySelector("#add-team");

    this.initAddTeamButton(AddTeamButton);

    // Attaching event listener
    const DeleteTeamButtons = this.querySelectorAll(".remove-team");

    DeleteTeamButtons.forEach((button) => {
      initRemoveButton(button);
    });
  }

  initAddTeamButton(el) {
    // Store class object in a temp variable
    let obj = this;

    el.addEventListener("click", (e) => {
      // Add team if not in this.followedTeams
      let idxNo = obj.teamSelect.value;

      let selected = obj.teamsSelection[idxNo];
      let leagueName =
        obj.leagueSelect.options[obj.leagueSelect.selectedIndex].text;

      if (!obj.followedTeams.hasOwnProperty(selected.id)) {
        obj.followedTeams[selected.id] = selected;
        obj.followedTeams[selected.id].leagueName = leagueName;

        // Update teams pages
        obj.showFollowedTeams();

        // Update record in indexed DB
      }
    });
  }

  // Init remove buttons
  initRemoveButton(el) {
    // Store class object in a temp variable
    let obj = this;

    el.addEventListener("click", function (e) {
      delete obj.followedTeams[e.target.getAttribute("data-team-id")];
      console.log(obj.followedTeams);
      this.parentNode.removeChild(this);
    });
  }

  // Load team
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

  // Show followed teams
  showFollowedTeams() {
    // Empty teams list
    this.followedTeamsList.innerHTML = "";

    Object.keys(this.followedTeams).forEach((team) => {
      team = this.followedTeams[team];

      let insert = document.createElement("li");
      insert.classList.add("collection-item", "avatar");

      insert.innerHTML = `
        <li class="">
          <img
            src="${team.crestUrl}"
            alt="${team.name}"
            class="circle"
          />
          <strong class="team-title">${team.name}</strong>
          <a class="btn red darken-4 text-white remove-team right" data-team-id="${team.id}">X</a>
          <p class="team-league">${team.leagueName}</p>
        </li>
      `;

      this.initRemoveButton(insert);

      this.followedTeamsList.append(insert);
    });
  }

  removeTeam(team_id) {
    if (this.followedTeams.hasOwnProperty(team_id)) {
      delete this.followedTeams[team_id];
    }
  }
}
