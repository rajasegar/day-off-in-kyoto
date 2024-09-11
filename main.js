import './style.css'

import { registerAppComponent } from './components/app'
import { registerAddTaskComponent } from './components/add-task'
import { registerTaskListComponent } from './components/task-list'
import { registerTasksContextComponent } from './components/tasks-context'
import { registerTaskComponent } from './components/task'

const app = () => {
  registerTasksContextComponent();
  registerAddTaskComponent();
  registerTaskComponent();
  registerTaskListComponent();
  registerAppComponent();
}

document.addEventListener('DOMContentLoaded', app);
