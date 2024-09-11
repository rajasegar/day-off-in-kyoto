class TaskListComponent extends HTMLElement {
  connectedCallback() {
    this.context  = this.closest('x-tasks-context'); 
    this.context.addEventListener('task-added',() => {
      this.update();
    })
    this.context.addEventListener('task-updated',() => {
      this.update();
    })

    this.context.addEventListener('task-deleted', () => {
      this.update();
    })

    this.update();
  }

  update() {
    const tasks = this.closest('x-tasks-context').tasks;
    this.innerHTML = `
<ul class="tasks-list">
      ${tasks.map(task => `
      <x-task id="${task.id}" text="${task.text}" done="${task.done}"></x-task>
      `).join('')}
    </ul>
`
  }
}

export const registerTaskListComponent = () => customElements.define('x-task-list', TaskListComponent)
