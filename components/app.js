class AppComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<x-tasks-context>
<h1>Day off in Kyoto</h1>
<x-add-task></x-add-task>
<x-task-list></x-task-list>
</x-tasks-context>
`
  }
}

export const registerAppComponent = () => customElements.define('x-app', AppComponent)
