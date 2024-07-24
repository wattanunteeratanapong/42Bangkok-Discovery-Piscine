const $taskList = $('#ft_list');
const $newTaskBtn = $('#new-task-btn');

loadTasks();

$newTaskBtn.on('click', function() {
    const taskText = prompt('Enter a new TO DO:');
    if (taskText) {
        addTask(taskText);
        saveTasks();
    }
});

// Add task to list
function addTask(taskText) {
    const $taskDiv = $('<div></div>', {
        class: 'todo-item',
        text: taskText,
        click: function() {
            if (confirm('Do you really want to delete this TO DO?')) {
                $taskDiv.remove();
                saveTasks();
            }
        }
    });
    $taskList.prepend($taskDiv);
}

// Save task to cookie
function saveTasks() {
    const tasks = [];
    $taskList.find('.todo-item').each(function() {
        tasks.push($(this).text());
    });
    document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))};path=/`;
}

// Load cookie and add 
function loadTasks() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=').map(c => c.trim());
        if (name === 'tasks') {
            const tasks = JSON.parse(decodeURIComponent(value));
            for (let i = tasks.length - 1; i >= 0; i--) {
                addTask(tasks[i]);
            }
        }
    }
}
