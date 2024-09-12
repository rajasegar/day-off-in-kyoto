class AppComponent extends HTMLElement {
  connectedCallback() {
    const template = document.getElementById('app-template');
    this.appendChild(template.content.cloneNode(true));
  }
}

export const registerAppComponent = () => customElements.define('x-app', AppComponent)
