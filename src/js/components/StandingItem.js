import { flatten } from "flat";

import StandingItem from "html/templates/standing-item.html";

export default class LeagueStandings extends HTMLTableRowElement {
  constructor(team) {
    super();

    // Use placeholder if null
    this.data = team != null ? team : null;
    this.innerHTML = StandingItem;

    this.classList.add("standing-item");
  }

  connectedCallback() {
    // Replace content with data
    let inner = this.innerHTML;

    // Flatten object to facilitate replacement
    let replacement = flatten(this.data);

    console.log(replacement);

    Object.keys(replacement).forEach((text) => {
      inner = inner.replace(`{{ ${text} }}`, replacement[text]);
    });

    this.innerHTML = inner;
  }
}
