class TaskComponent extends HTMLElement {
  #editMode = false;
  
  connectedCallback() {
    this.update();

    this.addEventListener('click', (ev) => {
      if(ev.target.matches('.task-edit-btn')) {
        this.#editMode = true;
               this.update();
         }

      if(ev.target.matches('.task-delete-btn')) {
        this.closest('x-tasks-context').deleteTask(ev.target.dataset.taskId)
      }

      if(ev.target.matches('.task-done-chk')) {
        this.closest('x-tasks-context').updateTaskStatus(ev.target.dataset.taskId, ev.target.checked)
      }
    })

    this.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const data = new FormData(ev.target);
      this.#editMode = false;
      this.closest('x-tasks-context').updateTask(Object.fromEntries(data.entries()))
      this.update();
    })
  }

  update() {
    const text = this.getAttribute('text');
    const done = this.getAttribute('done');
    const id = this.getAttribute('id');
    this.innerHTML = `
<style>
form { display:inline; }
</style>
<li>
<label>
<input id="task-done-${id}" data-task-id="${id}" class="task-done-chk" tabindex="0" type="checkbox" ${done == 'true' ? 'checked' : ''}/>
${this.#editMode ? `
    </label>
      <form>
      <input type="hidden" name="id" value="${id}"/>
      <input type="text" value="${text}" name="text"/>
      <button type="submit">Save</button>
      </form>`
: `${text}</label>
  <button tabindex="0"  class="task-edit-btn" type="button">Edit</button>`
  }
    
<button tabindex="0" data-task-id="${id}" class="task-delete-btn" type="button">Delete</button>
</li>
`
  }
}

export const registerTaskComponent = () => customElements.define('x-task', TaskComponent)
