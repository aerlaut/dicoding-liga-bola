import LeagueStandingsHtml from "html/layouts/league-standings.html";

export default class LeagueStandings extends HTMLElement {
  constructor() {
    super();

    // Fetch home page template
    this.innerHTML = LeagueStandingsHtml;
  }

  connectedCallback() {
    // Load home page
  }
}
