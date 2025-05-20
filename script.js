const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const filter = document.getElementById('filter');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  const selectedFilter = filter.value;

  tasks.forEach((task, index) => {
    if (
      selectedFilter === 'all' ||
      (selectedFilter === 'pending' && !task.completed) ||
      (selectedFilter === 'completed' && task.completed)
    ) {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';
      li.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button onclick="toggleComplete(${index})">✔</button>
          <button onclick="deleteTask(${index})">❌</button>
        </div>
      `;
      taskList.appendChild(li);
    }
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

window.toggleComplete = toggleComplete;
window.deleteTask = deleteTask;

addBtn.addEventListener('click', addTask);
filter.addEventListener('change', renderTasks);
window.addEventListener('load', renderTasks);
