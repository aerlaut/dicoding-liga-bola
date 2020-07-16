import TeamHtml from "html/layouts/team.html";

export default class TeamPage extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = TeamHtml;
  }
}
