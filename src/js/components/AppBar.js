import AppBarHtml from "html/templates/app-bar.html";

export default class AppBar extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = AppBarHtml;

    this.appContainer = document.querySelector("app-container");
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
      link.addEventListener("click", (e) => {
        e.preventDefault();

        // Push URL and manuall trigger popstate
        history.pushState({}, null, e.target.href);
        this.appContainer.dispatchEvent(
          new CustomEvent("navigate", { detail: e.target.href })
        );
      });
    });
  }
}
