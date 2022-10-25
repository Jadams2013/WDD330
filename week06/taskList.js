/*
	James Adams
	ToDo.js
	the JavaScript for the task list application
	22 Oct 2022
*/

// On app load, get all tasks from localStorage
window.onload = loadTasks;

// On form submit add task 
document.querySelector("form").addEventListener("submit", e => {
  e.preventDefault();
  addTask();
});

function loadTasks() {
	//clear out past iterations
	const list = document.querySelector("ul");
	list.innerHTML = ``;
	
	// check if localStorage has any tasks
	// if not then return
	if (localStorage.getItem("tasks") == null) return;

	// Get the tasks from localStorage and convert it to an array
	let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
	
	//decide if tasks should be displayed or not
	let filter = document.getElementById("filter");
	let showCompleted = (filter.value === "completed" || filter.value === "both");
	let showIncomplete = (filter.value === "notCompleted" || filter.value === "both");

	// Loop through the tasks and add them to the list
	tasks.forEach(task => {
		if ((task.completed && showCompleted) || (!task.completed && showIncomplete)) {
			const li = document.createElement("li");
			li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
			<input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
			<i class="fa fa-trash" onclick="removeTask(this)">X</i>`;
			list.insertBefore(li, list.children[0]); 
		}
	});
}

function addTask() {
	const task = document.querySelector("form input");
	const list = document.querySelector("ul");
	// return if task is empty
	if (task.value === "") {
		return false;
	}

	// add task to local storage
	localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));

	// refresh the display
	loadTasks();
	
	// clear input
	task.value = "";
}

function taskComplete(event) {
	let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
	tasks.forEach(task => {
		if (task.task === event.nextElementSibling.value) {
			task.completed = !task.completed;
		}
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
	loadTasks();
	event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
	let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
	tasks.forEach(task => {
		if (task.task === event.parentNode.children[1].value) {
			// delete task
			tasks.splice(tasks.indexOf(task), 1);
		}
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
	event.parentElement.remove();
}

// store current task to track changes
var currentTask = null;

// get current task
function getCurrentTask(event) {
	currentTask = event.value;
}

// edit the task and update local storage
function editTask(event) {
	let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
	// check if task is empty
	if (event.value === "") {
		event.value = currentTask;
		return;
	}
	// update task
	tasks.forEach(task => {
		if (task.task === currentTask) {
			task.task = event.value;
		}
	});
	// update local storage
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

//I know setting the entire array to localStorage is probably bad, but it works well enough at this scale so I think its fine