// Section 1: TODOs
// TODO: Register submissions from the user on the form.
// TODO: Determine the value of the data submitted and add it to a JavaScript array called tasks.
// TODO: Call the render function to update the table with the new tasks.

// Section 2: App State Variables
let tasks = [];

// Section 3: Cached Element References
const taskForm = document.getElementById("taskForm");
const taskTable = document.getElementById("taskTable");

// Section 4: Functions and Event Listeners
// Function to handle form submissions
function handleSubmission(event) {
    event.preventDefault(); // Prevent page reload
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskDeadline = document.getElementById('taskDeadline').value;

    // Validate input fields
    if (!taskName || !taskDeadline) {
        alert('Task name and deadline are required!');
        return;
    }

    // Update the tasks array
    tasks.push({ name: taskName, description: taskDescription, deadline: taskDeadline, completed: false });
    taskForm.reset(); // Reset the form
    render(); // Call the render function
}

// Function to mark a task as complete
function markTaskComplete(button) {
    const row = button.closest('tr');
    const rowIndex = Array.from(row.parentElement.children).indexOf(row);
    tasks[rowIndex].completed = true;
    render();
}

// Function to remove a task
function removeTask(button) {
    const row = button.closest('tr');
    const rowIndex = Array.from(row.parentElement.children).indexOf(row);
    tasks.splice(rowIndex, 1);
    render();
}

// Function to render tasks in the table
function render() {
    document.querySelector('#taskTable tbody').innerHTML = tasks.map(task => `
        <tr class="${task.completed ? 'completed' : ''}">
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.deadline}</td>
            <td><button onclick="markTaskComplete(this)">Complete</button></td>
            <td><button onclick="removeTask(this)">Remove</button></td>
        </tr>
    `).join('');
}

// Function to initialize the table
function init() {
    taskTable.querySelector('tbody').innerHTML = ''; // Clear the table body
    tasks = []; // Reset the tasks array
    render(); // Call the render function
}

// Event listener for form submission
taskForm.addEventListener('submit', handleSubmission);

// Call the init function to set up the initial state of the app
init();