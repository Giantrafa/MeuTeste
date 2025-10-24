const btnAlert = document.getElementById('btnAlert');
if (btnAlert) {
    btnAlert.addEventListener('click', function () {
        alert('Olá! Este é um exemplo básico.');
    });
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Limpa a lista antes de carregar
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="taskText">${task}</span>
            <button class="deleteTask">Remover</button>
        `;
        taskList.appendChild(listItem);
    });
}


function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('#taskList li .taskText'))
        .map(span => span.textContent.trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


document.getElementById('todoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskList = document.getElementById('taskList');
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="taskText">${taskText}</span>
            <button class="deleteTask">Remover</button>
        `;
        taskList.appendChild(listItem);

        taskInput.value = '';
        taskInput.focus();

        saveTasks(); 
    }
});


document.getElementById('taskList').addEventListener('click', function (event) {
    if (event.target.classList.contains('deleteTask')) {
        event.target.parentElement.remove();
        saveTasks(); // Salva as tarefas após remover
    }
});

document.addEventListener('DOMContentLoaded', loadTasks);