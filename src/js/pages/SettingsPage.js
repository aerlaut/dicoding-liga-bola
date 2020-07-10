import SettingsPageLayout from "html/layouts/settings.html";

export default class SettingsPage extends HTMLElement {
  constructor() {
    super();

    // Fetch settings page template
    this.innerHTML = "test";
  }

  connectedCallback() {}
}
