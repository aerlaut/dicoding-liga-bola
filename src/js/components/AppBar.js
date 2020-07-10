import AppBarHtml from "html/templates/app-bar.html";

export default class AppBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = AppBarHtml;
  }

  connectedCallback() {
    document.addEventListener("DOMContentLoaded", function () {
      let elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems);
    });
  }
}
