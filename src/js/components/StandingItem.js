import StandingItem from "html/templates/standing-item.html";

export default class LeagueStandings extends HTMLElement {
  constructor() {
    super();
    this.data = {
      position: 2,
      name: "Manchester City FC",
      crestUrl:
        "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
      playedGames: 34,
      won: 22,
      draw: 3,
      lost: 9,
      points: 69,
      goalsFor: 86,
      goalsAgainst: 34,
      goalDifference: 52,
    };

    this.innerHTML = StandingItem;
  }

  connectedCallback() {
    // Replace content with data
    let inner = this.innerHTML;

    Object.keys(this.data).forEach((d) => {
      inner = inner.replace(`{{ ${d} }}`, this.data[d]);
    });

    this.innerHTML = inner;
  }
}
