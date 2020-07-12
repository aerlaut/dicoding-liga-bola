import SettingsPageLayout from 'html/layouts/settings.html'

export default class SettingsPage extends HTMLElement {
  constructor() {
    super()

    this.teams = {}
    this.teamSelect = null

    this.data = {
      options: {
        leagues: [
          {
            id: 2001,
            name: 'Champions League',
          },
          {
            id: 2002,
            name: 'Liga Jerman',
          },
          {
            id: 2003,
            name: 'Liga Belanda',
          },
          {
            id: 2021,
            name: 'Liga Inggris',
          },
          {
            id: 2014,
            name: 'Liga Spanyol',
          },
          {
            id: 2015,
            name: 'Liga Perancis',
          },
        ],
        teams: {
          2001: [
            {
              id: 1,
              name: 'A',
            },
            {
              id: 2,
              name: 'B',
            },
            {
              id: 3,
              name: 'C',
            },
          ],
          2002: [
            {
              id: 1,
              name: 'A',
            },
            {
              id: 2,
              name: 'B',
            },
            {
              id: 3,
              name: 'C',
            },
          ],
          2003: [
            {
              id: 1,
              name: 'A',
            },
            {
              id: 2,
              name: 'B',
            },
            {
              id: 3,
              name: 'C',
            },
          ],
        },
      },
    }

    this.innerHTML = SettingsPageLayout

    // Initialize event listeners
    this.initializeLeagueSelect()
  }

  connectedCallback() {
    this.initializeButtons()
  }

  // Initialize league select
  initializeLeagueSelect() {
    // Append options to select
    const leagueSelect = this.querySelector('#league-select')

    let leagueOptions = ''
    this.data.options.leagues.forEach((e) => {
      leagueOptions += `<option value="${e.id}">${e.name}</option>`
    })

    leagueSelect.innerHTML = leagueOptions

    // Populate teamSelect with first values
    this.teamSelect = this.querySelector('#team-select')
    let firstLeague = this.data.options.leagues[0]
    let teams = this.data.options.teams[firstLeague.id]

    let teamOptions = ''
    teams.forEach((c) => {
      teamOptions += `<option value="${c.id}">${c.name}</option>`
    })

    this.teamSelect.innerHTML = teamOptions

    // Initialize select fields
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select')
      M.FormSelect.init(elems)
    })

    // Populate team team when a league is chosen
    leagueSelect.addEventListener('change', (e) => {
      let teams = this.data.options.teams[e.target.value]

      let teamOptions = ''
      teams.forEach((c) => {
        teamOptions += `<option value="${c.id}">${c.name}</option>`
      })

      teamSelect.innerHTML = teamOptions

      // Reinitialize teamSelect
      M.FormSelect.init(teamSelect)
    })
  }

  initializeButtons() {
    // Add watcher to add team
    const AddTeamButton = this.querySelector('#add-team')

    AddTeamButton.addEventListener('click', (e) => {
      // Add team if not in this.teams

      let teamId = this.teamSelect.value
      if (!this.teams.hasOwnProperty(teamId)) {
        this.teams[teamId] = this.data.options.teams[teamId]
      }
    })
  }
}
