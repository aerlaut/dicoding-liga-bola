import NotFoundPageHtml from "html/templates/not-found-page.html";

export default class NotFoundPage extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = NotFoundPageHtml;
  }
}
