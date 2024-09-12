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
    const template = document.getElementById('task-list-template');
    const el = template.content.cloneNode(true);
    const fragment = document.createDocumentFragment();
    tasks.forEach(t => {
      const wrapper = document.getElementById('task-component-template').content.cloneNode(true);
      const taskEl = wrapper.querySelector('x-task');
      taskEl.id = t.id;
      taskEl.setAttribute('text', t.text);
      taskEl.setAttribute('done', t.done);
      fragment.appendChild(wrapper);
    })
    el.querySelector('.tasks-list').appendChild(fragment);
    this.replaceChildren(el);

  }
}

export const registerTaskListComponent = () => customElements.define('x-task-list', TaskListComponent)
