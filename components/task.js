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

    })


  }


  createTaskElement(id, text, done) {
    const taskTemplate = document.getElementById('task-template')
    const el = taskTemplate.content.cloneNode(true);
    const chkbox = el.querySelector('.task-done-chk')
    chkbox.id = `task-done-${id}`
    if(done == "true") {
      chkbox.setAttribute('checked', true)
    }

    chkbox.dataset.taskId = id;

    const span = el.querySelector('span');
    span.textContent = text;

    const delBtn = el.querySelector('.task-delete-btn');
    delBtn.dataset.taskId = id;

    return el;
  }

  createEditTaskElement(id, text, done) {
    const taskTemplate = document.getElementById('edit-task-template')
    const el = taskTemplate.content.cloneNode(true);
    const chkbox = el.querySelector('.task-done-chk')
    chkbox.id = `task-done-${id}`
    if(done == "true") {
      chkbox.setAttribute('checked', true)
    }

    chkbox.dataset.taskId = id;

    const hidden = el.querySelector('input[type=hidden]');
    hidden.value = id;

    const input = el.querySelector('.task-input')
    input.value = text;

    const delBtn = el.querySelector('.task-delete-btn');
    delBtn.dataset.taskId = id;


    return el;
  }

  update() {
    const text = this.getAttribute('text');
    const done = this.getAttribute('done');
    const id = this.getAttribute('id');

    if(this.#editMode) {
      this.removeChild(this.firstElementChild);
      this.appendChild(this.createEditTaskElement(id,text, done))
    } else {
      
      this.appendChild(this.createTaskElement(id, text, done));

    }    

  }
}

export const registerTaskComponent = () => customElements.define('x-task', TaskComponent)
