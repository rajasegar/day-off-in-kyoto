class AddTaskComponent extends HTMLElement {

  
  connectedCallback() {
    this.innerHTML = `
<form>
<label for="text">Task name:</label>
<input type="text" id="text" placeholder="Add task"  name="text" />
      <button type="submit">Add</button>
</form>
    
`;

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
