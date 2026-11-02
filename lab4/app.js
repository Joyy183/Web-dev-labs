"use strict";
let todos = [];
let currentFilter = 'all';
let nextId = 1;
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const itemCount = document.getElementById('itemCount');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
// Add a non-empty task.
function addTodo() {
    if (todoInput.value.trim() !== '') {
        todos.push({ id: nextId++, text: todoInput.value.trim(), completed: false });
        todoInput.value = '';
        renderTodos();
    }
}
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') addTodo();
});
// Complete or delete a task.
todoList.addEventListener('click', (e) => {
    const target = e.target;
    const li = target.closest('li');
    if (!li)
        return;
    const id = Number(li.dataset.id);
    if (target.tagName.toLowerCase() === 'input' && target.type === 'checkbox') {
        const todo = todos.find(t => t.id === id);
        if (todo)
            todo.completed = !todo.completed;
        renderTodos();
    }
    else if (target.classList.contains('delete-btn')) {
        todos = todos.filter(t => t.id !== id);
        renderTodos();
    }
});
// Double-click a task to edit; Enter saves and Escape cancels.
todoList.addEventListener('dblclick', (event) => {
    const target = event.target;
    if (!target.classList.contains('todo-text')) return;
    const li = target.closest('li');
    li.classList.add('editing');
    const editInput = li.querySelector('.edit-input');
    editInput.focus();
    editInput.select();
});
todoList.addEventListener('keydown', (event) => {
    const target = event.target;
    if (!target.classList.contains('edit-input')) return;
    if (event.key !== 'Enter' && event.key !== 'Escape') return;
    const li = target.closest('li');
    if (event.key === 'Enter') {
        const todo = todos.find(t => t.id === Number(li.dataset.id));
        if (todo && target.value.trim()) todo.text = target.value.trim();
    }
    renderTodos();
});
// Filters (All, Active, Completed)
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.filter-btn.active')?.classList.remove('active');
        const target = e.target;
        target.classList.add('active');
        currentFilter = target.dataset.filter;
        renderTodos();
    });
});
// Clear Buttons
clearCompletedBtn.addEventListener('click', () => { todos = todos.filter(t => !t.completed); renderTodos(); });
clearAllBtn.addEventListener('click', () => { todos = []; renderTodos(); });
// Render the currently selected task filter.
function renderTodos() {
    todoList.innerHTML = '';
    let filteredTodos = todos;
    if (currentFilter === 'active')
        filteredTodos = todos.filter(t => !t.completed);
    if (currentFilter === 'completed')
        filteredTodos = todos.filter(t => t.completed);
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.dataset.id = todo.id.toString();
        if (todo.completed)
            li.classList.add('completed');
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text"></span>
            <input type="text" class="edit-input" aria-label="Edit task">
            <button class="delete-btn" aria-label="Delete task">×</button>
        `;
        li.querySelector('.todo-text').textContent = todo.text;
        li.querySelector('.edit-input').value = todo.text;
        li.querySelector('input[type="checkbox"]').setAttribute('aria-label', 'Complete ' + todo.text);
        todoList.appendChild(li);
    });
    const activeCount = todos.filter(t => !t.completed).length;
    itemCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}
