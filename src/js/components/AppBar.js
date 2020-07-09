export default class AppBar extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
                <nav>
                <div class="nav-wrapper">
                    <a href="#" data-target="slide-out" class="sidenav-trigger">☰</span></a>
                    <a href="#" class="brand-logo">Liga Bola</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">JavaScript</a></li>
                    </ul>
                    </div>
                </nav>

                <ul id="slide-out" class="sidenav">
                    <li><a href="#!"><i class="material-icons">cloud</i>First Link With Icon</a></li>
                    <li><a href="#!">Second Link</a></li>
                    <li><div class="divider"></div></li>
                    <li><a class="subheader">Subheader</a></li>
                    <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
                </ul>
            `;
  }

  connectedCallback() {
    document.addEventListener("DOMContentLoaded", function () {
      let elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems);
    });
  }

  disconnectedCallback() {}
}
