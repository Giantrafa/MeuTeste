const API_URL = 'https://meuteste-fo9h.onrender.com';

const btnAlert = document.getElementById('btnAlert');
if (btnAlert) {
    btnAlert.addEventListener('click', function () {
        alert('Olá! Este é um exemplo básico.');
    });
}

// Carregar tarefas do banco
async function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    try {
        const res = await fetch(API_URL);
        const tasks = await res.json();

        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="taskText">${task.text}</span>
                <button class="deleteTask" data-id="${task.id}">Remover</button>
            `;
            taskList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
    }
}

// Adicionar nova tarefa via API
async function addTaskToAPI(taskText) {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: taskText })
        });
        return await res.json();
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
    }
}

// Remover tarefa via API
async function deleteTaskFromAPI(taskId) {
    try {
        await fetch(`${API_URL}/${taskId}`, { method: 'DELETE' });
    } catch (error) {
        console.error('Erro ao remover tarefa:', error);
    }
}

// Evento de submissão do formulário
document.getElementById('todoForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const task = await addTaskToAPI(taskText);
        if (task) {
            const taskList = document.getElementById('taskList');
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="taskText">${task.text}</span>
                <button class="deleteTask" data-id="${task.id}">Remover</button>
            `;
            taskList.appendChild(listItem);
        }

        taskInput.value = '';
        taskInput.focus();
    }
});

// Evento para remover tarefas
document.getElementById('taskList').addEventListener('click', async function (event) {
    if (event.target.classList.contains('deleteTask')) {
        const taskId = event.target.dataset.id;
        await deleteTaskFromAPI(taskId);
        event.target.parentElement.remove();
    }
});

// Carregar tarefas ao abrir a página
document.addEventListener('DOMContentLoaded', loadTasks);
