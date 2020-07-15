import TeamHtml from "html/templates/team-item.html";
import { flatten } from "flat";
import { fetchData } from "js/services/api";

export default class TeamItem extends HTMLDivElement {
  constructor(team) {
    super();

    // Cache data
    this.data = team;

    // Replace content with data
    let inner = TeamHtml;

    // Flatten object to facilitate replacement
    let replacement = flatten(team);

    // Replace values in template
    Object.keys(replacement).forEach((text) => {
      inner = inner.replace(`{{ ${text} }}`, replacement[text]);
    });

    this.innerHTML = inner;
    this.classList.add(
      "team-item",
      "hoverable",
      "card-panel",
      "cursor-pointer",
      "clearfix"
    );
  }

  connectedCallback() {
    console.log(this.data.leagueId);

    // Input team standings
    fetchData(`competitions/${this.data.leagueId}/standings?standingType=TOTAL`)
      .then((res) => res.json())
      .then((res) => {
        // Get standing for team, iterate over standing table

        this.innerHTML = this.innerHTML.replace(
          "{{ league.name }}",
          res.competition.name
        );

        res.standings[0].table.some((standing) => {
          if (standing.team.id != this.data.id) {
            return false;
          }

          this.innerHTML = this.innerHTML.replace(
            "{{ standing.position }}",
            standing.position
          );

          return true;
        });
      })
      .catch((err) => console.error(err));
  }
}
