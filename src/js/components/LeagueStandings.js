import LeagueStandingsHtml from "html/containers/league-standings.html";

import StandingItem from "js/components/StandingItem";

customElements.define("standing-item", StandingItem);

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
