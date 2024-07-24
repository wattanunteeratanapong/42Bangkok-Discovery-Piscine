const taskList = document.getElementById('ft_list');
const newTaskBtn = document.getElementById('new-task-btn');

loadTasks();

newTaskBtn.addEventListener('click', function() {
    const taskText = prompt('Enter a new TO DO:');
    if (taskText) {
        addTask(taskText);
        saveTasks();
    }
});

// Add task to list
function addTask(taskText) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'todo-item';
    taskDiv.textContent = taskText;
    taskDiv.addEventListener('click', function() {
        if (confirm('Do you really want to delete this TO DO?')) {
            taskDiv.remove();
            saveTasks();
        }
    });
    taskList.prepend(taskDiv);
}

// Save task to cookie
function saveTasks() {
    const tasks = [];
    const taskItems = taskList.getElementsByClassName('todo-item');
    for (let item of taskItems) {
        tasks.push(item.textContent);
    }
    document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))};`;
}

// Load cookie and add 
function loadTasks() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=').map(c => c.trim());
        if (name === 'tasks') {
            const tasks = JSON.parse(decodeURIComponent(value));
            for (let task of tasks.reverse()) {
                addTask(task);
            }
        }
    }
}
