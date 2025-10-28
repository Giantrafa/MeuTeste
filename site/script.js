const API_URL = 'https://meuteste-fo9h.onrender.com';

// ---------- SELETORES ----------
const authSection = document.getElementById('auth');
const todoSection = document.getElementById('todoSection');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');

// ---------- TROCA DE TELA ----------
showRegister.addEventListener('click', () => {
    const isLoginVisible = loginForm.style.display !== 'none';
    loginForm.style.display = isLoginVisible ? 'none' : 'grid';
    registerForm.style.display = isLoginVisible ? 'grid' : 'none';
    document.querySelector('#auth h2').textContent = isLoginVisible ? 'Cadastro' : 'Login';
    showRegister.textContent = isLoginVisible ? 'Já tenho conta' : 'Cadastre-se';
});

// ---------- AUTENTICAÇÃO ----------
async function login(email, senha) {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (res.ok) {
        localStorage.setItem('token', data.token);
        mostrarTodo();
    } else {
        alert(data.erro || 'Erro ao fazer login');
    }
}

async function register(email, senha) {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });

    const data = await res.json();

    if (res.ok) {
        alert('Cadastro realizado! Agora você pode fazer login.');
        loginForm.style.display = 'grid';
        registerForm.style.display = 'none';
        showRegister.textContent = 'Cadastre-se';
        document.querySelector('#auth h2').textContent = 'Login';
    } else {
        alert(data.erro || 'Erro ao cadastrar');
    }
}

// ---------- TAREFAS ----------
async function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/todos`, {
            headers: { 'Authorization': token }
        });

        if (!res.ok) throw new Error('Token inválido ou expirado');

        const tasks = await res.json();

        if (tasks.length === 0) {
            taskList.innerHTML = '<li>Nenhuma tarefa cadastrada.</li>';
        } else {
            tasks.forEach(task => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span class="taskText">${task.text}</span>
                    <button class="deleteTask danger" data-id="${task.id}">Remover</button>
                `;
                taskList.appendChild(listItem);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        alert('Sessão expirada. Faça login novamente.');
        logout();
    }
}

async function addTaskToAPI(taskText) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ text: taskText })
    });

    if (!res.ok) throw new Error('Erro ao adicionar tarefa');
    return await res.json();
}

async function deleteTaskFromAPI(taskId) {
    const token = localStorage.getItem('token');
    await fetch(`${API_URL}/todos/${taskId}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
    });
}

// ---------- EVENTOS ----------
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    if (email && senha) await login(email, senha);
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('regEmail').value.trim();
    const senha = document.getElementById('regSenha').value.trim();
    if (email && senha) await register(email, senha);
});

document.getElementById('todoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        await addTaskToAPI(taskText);
        taskInput.value = '';
        loadTasks();
    }
});

document.getElementById('taskList').addEventListener('click', async (e) => {
    if (e.target.classList.contains('deleteTask')) {
        const taskId = e.target.dataset.id;
        await deleteTaskFromAPI(taskId);
        loadTasks();
    }
});

// ---------- CONTROLE DE TELA ----------
function mostrarTodo() {
    authSection.style.display = 'none';
    todoSection.style.display = 'block';
    loadTasks();
}

function logout() {
    localStorage.removeItem('token');
    authSection.style.display = 'block';
    todoSection.style.display = 'none';
}

// ---------- INICIALIZAÇÃO ----------
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('token')) {
        mostrarTodo();
    } else {
        logout();
    }
});
