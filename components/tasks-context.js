class TasksContextComponent extends HTMLElement {
  #tasks = [
    { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
  ];

  #lastid = 2;

  constructor() {
    super();
  }

  get tasks() {
    return this.#tasks;
  }

  addTask(data) {
    // console.log(data);
    const newTask = { id: ++this.#lastid , text: data.text, done: false};
    this.#tasks.push(newTask);
    this.dispatchEvent(new CustomEvent('task-added', { detail: newTask }))
  }

  deleteTask(id) {
    console.log(id);
    this.#tasks = this.#tasks.filter(task => task.id != id)
    this.dispatchEvent(new CustomEvent('task-deleted'))
  }

  updateTaskStatus(id, status) {
    const task = this.#tasks.find(task => task.id == id)
    task.done = status;
    this.dispatchEvent(new CustomEvent('task-updated'))
  }

  updateTask({id, text}) {
    const task = this.#tasks.find(task => task.id == id)
    task.text = text;
    this.dispatchEvent(new CustomEvent('task-updated'))
  }

}

export const registerTasksContextComponent = () => customElements.define('x-tasks-context', TasksContextComponent)
