import "lib/css/tailwind.min.css";
import "lib/css/materialize.min.css";
import "css/style.css";

import "lib/js/materialize.min.js";

import AppBar from "js/components/AppBar";
import AppContainer from "js/components/AppContainer";

customElements.define("app-bar", AppBar);
customElements.define("app-container", AppContainer);
