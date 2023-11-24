const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  savedTasks.forEach(taskText => {
    createTaskElement(taskText);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    createTaskElement(taskText);
    saveTaskToLocalStorage(taskText);
    taskInput.value = '';
  }
}

function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <button onclick="toggleDone(this)">Done</button>
    <button onclick="deleteTask(this)">Delete</button>
  `;
  taskList.appendChild(li);
}

function saveTaskToLocalStorage(taskText) {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

function toggleDone(button) {
  const listItem = button.parentNode;
  listItem.classList.toggle('completed');
  button.innerText = listItem.classList.contains('completed') ? 'Undone' : 'Done';
}

function deleteTask(button) {
  const listItem = button.parentNode;
  const taskText = listItem.querySelector('span').innerText;
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = savedTasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));

  listItem.remove();
}
