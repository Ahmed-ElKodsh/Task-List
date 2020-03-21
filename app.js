// Define Ui Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Call event listeners function
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
    clearBtn.addEventListener('click', clearTasks)
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));   // localStorage can only store, return strings
    }
    // loop through tasks
    tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement('li');
        // Add class  // in Materialize: your UL has 'collection' class, Li has 'collection-item'
        li.className = 'collection-item';
        // Create TextNode & append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class  // secondary-content: in materialize to be to the right of adjancent element
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        
        // Append link to li
        li.appendChild(link);
    });
}

// Add task function event handeler
function addTask(e) {
    // If nothing added, alert user
    if(taskInput.value === '') {
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');
    // Add class  // in Materialize: your UL has 'collection' class, Li has 'collection-item'
    li.className = 'collection-item';
    // Create TextNode & append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class  // secondary-content: in materialize to be to the right of adjancent element
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    
    // Append link to li
    li.appendChild(link);
    
    // Append li to ul
    taskList.appendChild(li);
    
    // Store in LS
    storeTaskInLocalStorage();


    // Clear input
    taskInput.value = '';

    e.preventDefault();
}
// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));   // localStorage can only store, return strings
    }
    tasks.push(task);
    // Save tasks back to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {  //check 'a' which is parent to 'i' clicked x
        if(confirm('Are You Sure?')) { 
            e.target.parentElement.parentElement.remove();   // remove 'li' which is parent of 'a' the parent of 'i'

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
        tasks = JSON.parse(localStorage.getItem('tasks'));   // localStorage can only store, return strings
    }
    // loop through tasks
    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks() {
    //taskList.innerHTML = '';
    // faster
    while(taskList.firstChild) {   // loop over every first child
        taskList.removeChild(taskList.firstChild);  // remove it that push below to be first and so on
    }
    // Clear from LS
    clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();  // clear everything
}

// Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task) {
        const item = task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });   // querySelector: return nodeList aaary subject    

}