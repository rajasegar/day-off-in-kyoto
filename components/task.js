class TaskComponent extends HTMLElement {
  #editMode = false;
  
  connectedCallback() {
    this.update();

    this.addEventListener('click', (ev) => {
      if(ev.target.matches('.task-edit-btn')) {
      this.#editMode = !this.#editMode;
        this.update();
      }

      if(ev.target.matches('.task-delete-btn')) {
        this.closest('x-tasks-context').deleteTask(ev.target.dataset.taskId)
      }

      if(ev.target.matches('.task-done-chk')) {
        this.closest('x-tasks-context').updateTaskStatus(ev.target.dataset.taskId)
      }
    })
  }

  update() {
    const text = this.getAttribute('text');
    const done = this.getAttribute('done');
    const id = this.getAttribute('id');
    this.innerHTML = `
<li>
<label>
<input data-task-id="${id}" class="task-done-chk" tabindex="0" type="checkbox" ${done == 'true' ? 'checked' : ''}/>
${this.#editMode ? `<input type="text" value="${text}"/>`: text}
</label>
<button tabindex="0" class="task-edit-btn" type="button">${this.#editMode ? 'Cancel' : 'Edit'}</button>
<button tabindex="0" data-task-id="${id}" class="task-delete-btn" type="button">Delete</button>
</li>
`
  }
}

export const registerTaskComponent = () => customElements.define('x-task', TaskComponent)
