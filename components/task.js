class TaskComponent extends HTMLElement {
  #editMode = false;
  
  connectedCallback() {

    this.update();


    this.addEventListener('click', (ev) => {
      if(ev.target.id == 'btn-edit') {
      this.#editMode = !this.#editMode;
        this.update();
      }

      if(ev.target.id == 'btn-delete') {
        this.closest('x-tasks-context').deleteTask(ev.target.dataset.taskId)
      }
    })
  }

  update() {
    const text = this.getAttribute('text');
    const done = this.getAttribute('done');
    const id = this.getAttribute('id');
    this.innerHTML = `
<li>
<input type="checkbox" checked="${done}"/>
${this.#editMode ? `<input type="text" value="${text}"/>`: text}
<button id="btn-edit" type="button">${this.#editMode ? 'Cancel' : 'Edit'}</button>
<button data-task-id="${id}" id="btn-delete" type="button">Delete</button>
</li>
`
  }
}

export const registerTaskComponent = () => customElements.define('x-task', TaskComponent)