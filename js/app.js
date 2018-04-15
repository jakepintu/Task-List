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
	// DOM load event
	document.addEventListener('DOMContentLoaded', getTasks);
	// Add task event
	form.addEventListener('submit', addTask);
	// Remove task event
	taskList.addEventListener('click', removeTask);
	// Clear task event
	clearBtn.addEventListener('click', clearTasks);
	// Filter tasks event
	filter.addEventListener('keyup', filterTasks);
}

// Get Tasks form LS
function getTasks() {
	let tasks;
	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(task => {
		// Create li element
		const li = document.createElement('li');
		// Add class
		li.className = 'collection-item';
		// Create text node and append to li
		li.appendChild(document.createTextNode(task));
		// Create new link element
		const link = document.createElement('a');
		// Add Class
		link.className = 'delete-item secondary-content';
		// Add text
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// Add Pointer
		link.style.cursor = 'pointer';
		// Append the link to li
		li.appendChild(link);
		// Append li to ul
		taskList.appendChild(li);
	});
}

// Add Task
function addTask(e) {
	if(taskInput.value === '') {
		alert('Add a task');
	} else {
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
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// Add Pointer
		link.style.cursor = 'pointer';
		// Append the link to li
		li.appendChild(link);
		// Append li to ul
		taskList.appendChild(li);

		// Store in LS
		storeTaskInLocalStorage(taskInput.value);

		// Clear input
		taskInput.value = '';e.preventDefault();	
	}
}

// Store Task
function storeTaskInLocalStorage(task) {
	let tasks;
	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
	if(e.target.parentElement.classList.contains('delete-item')) {
		if(confirm('Are You Sure?')) {
			e.target.parentElement.parentElement.remove();

			// Remove from LS
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}

}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if(localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach((task, index) => {
		if(taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
	// taskList.innerHTML = '';

	// Faster
	while(taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// https://jsperf.com/innerhtml-vs-removechild

	// Clear form LS
	clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
	localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach((task => {
		const item = task.firstChild.textContent;
		if(item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	}));
}