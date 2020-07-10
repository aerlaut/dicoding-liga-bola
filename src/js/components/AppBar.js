import AppBarHtml from "html/templates/app-bar.html";

export default class AppBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = AppBarHtml;
  }

  connectedCallback() {
    // Enable sidebar
    document.addEventListener("DOMContentLoaded", function () {
      let elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems);
    });

    // Enable push API for links
    const links = document.querySelectorAll(".navigation a");

    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        history.pushState(null, null, e.target.href);
      });
    });
  }
}
