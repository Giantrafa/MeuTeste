const API_URL = 'https://meuteste-fo9h.onrender.com';

// ---------- SELETORES ----------
const authSection = document.getElementById('auth');
const todoSection = document.getElementById('todoSection');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const taskList = document.getElementById('taskList');
const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');

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
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });
        const data = await res.json();

        if (res.ok) {
            // Salva o token no localStorage
            localStorage.setItem('token', data.token);
            mostrarTodo();
        } else {
            alert(data.erro || 'Erro ao fazer login');
        }
    } catch (err) {
        console.error(err);
        alert('Erro de conexão com a API.');
    }
}

async function register(email, senha) {
    try {
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
    } catch (err) {
        console.error(err);
        alert('Erro de conexão com a API.');
    }
}

// ---------- TAREFAS ----------
async function loadTasks() {
    taskList.innerHTML = '';
    const token = localStorage.getItem('token');

    if (!token) {
        logout();
        return;
    }

    try {
        const res = await fetch(`${API_URL}/todos`, {
            headers: { 'Authorization': `Bearer ${token}` } // Ajuste do header com Bearer
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
    } catch (err) {
        console.error(err);
        alert('Sessão expirada ou erro ao carregar tarefas.');
        logout();
    }
}

async function addTaskToAPI(taskText) {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const res = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Ajuste do header
            },
            body: JSON.stringify({ text: taskText })
        });

        if (!res.ok) throw new Error('Erro ao adicionar tarefa');
        return await res.json();
    } catch (err) {
        console.error(err);
        alert('Erro ao adicionar tarefa.');
    }
}

async function deleteTaskFromAPI(taskId) {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const res = await fetch(`${API_URL}/todos/${taskId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` } // Ajuste do header
        });

        if (!res.ok) throw new Error('Erro ao deletar tarefa');
    } catch (err) {
        console.error(err);
        alert('Erro ao deletar tarefa.');
    }
}

// ---------- EVENTOS ----------
loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    if (email && senha) await login(email, senha);
});

registerForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('regEmail').value.trim();
    const senha = document.getElementById('regSenha').value.trim();
    if (email && senha) await register(email, senha);
});

todoForm.addEventListener('submit', async e => {
    e.preventDefault();
    const taskTextValue = taskInput.value.trim();
    if (taskTextValue) {
        await addTaskToAPI(taskTextValue);
        taskInput.value = '';
        loadTasks();
    }
});

taskList.addEventListener('click', async e => {
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
