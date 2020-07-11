import SettingsPageLayout from 'html/layouts/settings.html'

export default class SettingsPage extends HTMLElement {
  constructor() {
    super()

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
        clubs: {
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
  }

  connectedCallback() {
    // Append options to select
    const leagueSelect = this.querySelector('#league-select')

    let leagueOptions = ''
    this.data.options.leagues.forEach((e) => {
      leagueOptions += `<option value="${e.id}">${e.name}</option>`
    })

    leagueSelect.innerHTML = leagueOptions

    // Populate clubSelect with first values
    const clubSelect = this.querySelector('#club-select')
    let firstLeague = this.data.options.leagues[0]
    let clubs = this.data.options.clubs[firstLeague.id]

    let clubOptions = ''
    clubs.forEach((c) => {
      clubOptions += `<option value="${c.id}">${c.name}</option>`
    })

    clubSelect.innerHTML = clubOptions

    // Initialize select fields
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select')
      M.FormSelect.init(elems)
    })

    // Populate club team when a league is chosen
    leagueSelect.addEventListener('change', (e) => {
      let clubs = this.data.options.clubs[e.target.value]

      let clubOptions = ''
      clubs.forEach((c) => {
        clubOptions += `<option value="${c.id}">${c.name}</option>`
      })

      clubSelect.innerHTML = clubOptions

      // Reinitialize clubSelect
      M.FormSelect.init(clubSelect)
    })
  }
}
