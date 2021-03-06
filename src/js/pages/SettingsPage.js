import SettingsPageLayout from "html/layouts/settings.html";
import { fetchData } from "js/services/api";
import { LeagueDB, TeamDB, UserDB } from "js/services/db";

export default class SettingsPage extends HTMLElement {
  constructor() {
    super();

    // Init object props
    this.leage = null;
    this.leagueSelect = null;
    this.teamSelect = null;
    this.user = null;

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

    this.userConn = new UserDB();
    this.teamConn = new TeamDB();

    this.innerHTML = SettingsPageLayout;
    this.followedTeamsList = this.querySelector("#followed-teams-list");
  }

  connectedCallback() {
    // Initialize event listeners
    this.initLeagueSelect();
    this.initButtons();
    this.loadUserSettings(1);
  }

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
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);

    // Populate team when a league is chosen
    this.leagueSelect.addEventListener("change", (e) => {
      // Get teams in league
      this.loadTeams(e.target.value);
    });
  }

  // Initialize follow buttons
  initButtons() {
    // Add eventlistener to add button
    let obj = this;
    const AddTeamButton = this.querySelector("#add-team");
    AddTeamButton.addEventListener("click", (e) => {
      // Add team if not in this.followedTeams
      let idxNo = obj.teamSelect.value;
      let team = obj.league.teams[idxNo];
      team.leagueName =
        obj.leagueSelect.options[obj.leagueSelect.selectedIndex].text;
      team.leagueId =
        obj.leagueSelect.options[obj.leagueSelect.selectedIndex].value;

      obj.addTeam(team);
    });

    // Attaching event listener
    this.querySelector("#followed-teams-list").addEventListener(
      "click",
      (e) => {
        let teamId = e.target.getAttribute("data-team-id");
        obj.removeTeam(teamId);
        e.currentTarget.removeChild(e.target.parentNode);
      }
    );
  }

  // Get user settings
  loadUserSettings(id) {
    this.userConn.fetch(id).then((user) => {
      if (user == null) {
        // No user, create new user

        let newUser = {
          id: 1,
          user: "user",
          teams: {},
          leagues: {},
        };

        this.userConn.insert(newUser);
        this.user = newUser;
      } else {
        // Get current user
        this.user = user;
        this.showFollowedTeams();
      }
    });
  }

  addTeam(team) {
    if (!this.user.teams.hasOwnProperty(team.id)) {
      this.user.teams[team.id] = team;

      // Increment followed league counter
      let leagueId = this.league.competition.id;
      if (this.user.leagues.hasOwnProperty(leagueId)) {
        this.user.leagues[leagueId] += 1;
      } else {
        // or initialize
        this.user.leagues[leagueId] = 1;
      }

      // Update teams pages
      this.showFollowedTeams();

      // Update record in indexed DB
      this.userConn.update(this.user);
    }
  }

  removeTeam(teamId) {
    if (this.user.teams.hasOwnProperty(teamId)) {
      let leagueId = this.user.teams[teamId].leagueId;
      delete this.user.teams[teamId];

      // Decrement league count, else remove
      if (this.user.leagues[leagueId] > 1) {
        this.user.leagues[leagueId] -= 1;
      } else {
        delete this.user.leagues[leagueId];
      }

      this.userConn.update(this.user);
    }
  }

  // Load team
  loadTeams(leagueId) {
    fetchData(`competitions/${leagueId}/teams`)
      .then((res) => res.json())
      .then((res) => {
        if (res.count == 0) {
          return false;
        }

        // Local copy
        this.league = res;

        // Insert options
        let teamOptions = "";
        this.league.teams.forEach((team, id) => {
          teamOptions += `<option value="${id}">${team.name}</option>`;
        });

        this.teamSelect.innerHTML = teamOptions;

        // Reinitialize teamSelect
        M.FormSelect.init(this.teamSelect);
      })
      .catch((err) => console.err(err));
  }

  // Show followed teams
  showFollowedTeams() {
    // Empty teams list
    this.followedTeamsList.innerHTML = "";

    Object.keys(this.user.teams).forEach((team) => {
      team = this.user.teams[team];

      let teamItem = document.createElement("li");
      teamItem.classList.add("collection-item", "avatar");
      teamItem.innerHTML = `
          <img
            src="${team.crestUrl}"
            alt="${team.name}"
            class="circle"
          />
          <strong class="team-title">${team.name}</strong>
          <a class="btn red darken-4 text-white remove-team right" data-team-id="${team.id}">X</a>
          <p class="team-league">${team.leagueName}</p>
      `;

      this.followedTeamsList.append(teamItem);
    });
  }
}
