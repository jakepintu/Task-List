// Define UI vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');


// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
	// Add task event
	form.addEventListener('submit', addTask);
}

// Add Task
function addTask(e) {
	if(taskInput.value === '') {
		alert('Add a task');
	}

	// Create li element
	const li = document.createElement('li');
	// Add class
	li.className = 'collection-item';
	// Create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));
	// Create new link element
	const link = document.createElement('a');
	// Add Class
	link.className = 'delete-item secondary-content';
	// Add text
	link.textContent = 'Delete';
	// Append the link to li
	li.appendChild(link);
	// Append li to ul
	taskList.appendChild(li);

	// Clear input
	taskInput.value = '';
	e.preventDefault();
}
