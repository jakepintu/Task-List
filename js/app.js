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
	// Remove task event
	taskList.addEventListener('click', removeTask);
	// Clear task event
	clearBtn.addEventListener('click', clearTasks);
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

		// Clear input
		taskInput.value = '';e.preventDefault();	
	}
}

// Remove Task
function removeTask(e) {
	if(e.target.parentElement.classList.contains('delete-item')) {
		if(confirm('Are You Sure?')) {
			e.target.parentElement.parentElement.remove();
		}
	}

}

// Clear Tasks
function clearTasks() {
	// taskList.innerHTML = '';

	// Faster
	while(taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// https://jsperf.com/innerhtml-vs-removechild
}