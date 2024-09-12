class AddTaskComponent extends HTMLElement {
  connectedCallback() {
    const template = document.getElementById('add-task-template')
    this.appendChild(template.content.cloneNode(true))

    const context = this.closest('x-tasks-context');

    this.querySelector('form').addEventListener('submit', (ev) => {
      ev.preventDefault();
      const data = new FormData(ev.target);
      context.addTask(Object.fromEntries(data.entries()));
      ev.target.reset();
    })
  }
}

export const registerAddTaskComponent = () => customElements.define('x-add-task', AddTaskComponent)
