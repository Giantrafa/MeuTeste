// adiciona listener ao btnAlert somente se existir no DOM
const btnAlert = document.getElementById('btnAlert');
if (btnAlert) {
    btnAlert.addEventListener('click', function () {
        alert('Olá! Este é um exemplo básico.');
    });
}

// Função para carregar tarefas salvas
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

// Função para salvar tarefas
function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('#taskList li .taskText'))
        .map(span => span.textContent.trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Adiciona uma nova tarefa
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

        saveTasks(); // Salva as tarefas após adicionar
    }
});

// Remove uma tarefa
document.getElementById('taskList').addEventListener('click', function (event) {
    if (event.target.classList.contains('deleteTask')) {
        event.target.parentElement.remove();
        saveTasks(); // Salva as tarefas após remover
    }
});

// Carrega as tarefas ao iniciar
document.addEventListener('DOMContentLoaded', loadTasks);