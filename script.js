/**
 * To-Do List Web App (Vanilla JavaScript)
 * Theme: Crisp White & Vibrant Orange
 * 
 * Hints Guide Implementation:
 * 1. Setup basic HTML elements: input, add button, list container
 * 2. Style layout with CSS for clarity
 * 3. Use JS to add event listeners on Add button / Form
 * 4. Append new tasks as list items dynamically
 * 5. Implement functionality to mark tasks complete (toggle class)
 * 6. Add remove button for each task to delete it
 * 7. Test adding, completing, and deleting tasks
 * 8. Ensure UI updates instantly without page reload
 */

// =============================================================================
// 1. DOM Element Selections
// =============================================================================
const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const completedCountEl = document.getElementById('completed-count');
const totalCountEl = document.getElementById('total-count');
const itemsLeftCountEl = document.getElementById('items-left-count');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterTabBtns = document.querySelectorAll('.tab-btn');

// =============================================================================
// 2. State & LocalStorage Management
// =============================================================================
// Default starter tasks for first-time visitors
const defaultTasks = [
  { id: 1, text: 'Plan tomorrow\'s priorities 📋', completed: false },
  { id: 2, text: 'Review project requirements 🔍', completed: true },
  { id: 3, text: 'Stay hydrated and drink water 💧', completed: false }
];

// Retrieve saved tasks from localStorage, or fall back to defaults
let tasks = JSON.parse(localStorage.getItem('todolist_orange_tasks')) || defaultTasks;
let activeFilter = 'all';

// Save current tasks to localStorage
const saveTasks = () => {
  localStorage.setItem('todolist_orange_tasks', JSON.stringify(tasks));
};

// =============================================================================
// 3. Helper Functions: Filtering & Statistics
// =============================================================================
const getFilteredTasks = () => {
  if (activeFilter === 'active') {
    return tasks.filter(task => !task.completed);
  }
  if (activeFilter === 'completed') {
    return tasks.filter(task => task.completed);
  }
  return tasks;
};

// Update header and footer statistics instantly
const updateStats = () => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const active = total - completed;

  totalCountEl.textContent = total;
  completedCountEl.textContent = completed;
  itemsLeftCountEl.textContent = `${active} active task${active === 1 ? '' : 's'}`;

  // Toggle empty state visibility
  const displayed = getFilteredTasks();
  if (displayed.length === 0) {
    emptyState.classList.add('visible');
  } else {
    emptyState.classList.remove('visible');
  }
};

// =============================================================================
// 4. Render Function (Hints 4, 5, 6, 8: Instant dynamic updates)
// =============================================================================
const renderTasks = () => {
  // Clear the existing list container
  taskList.innerHTML = '';

  const visibleTasks = getFilteredTasks();

  visibleTasks.forEach(task => {
    // Create <li> task item
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', task.id);
    li.setAttribute('tabindex', '0'); // Keyboard accessible

    // Inner content container (Checkbox + Text)
    const contentDiv = document.createElement('div');
    contentDiv.className = 'task-content';

    // Custom circular checkbox (Orange & White)
    const checkboxSpan = document.createElement('span');
    checkboxSpan.className = 'custom-checkbox';
    checkboxSpan.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;

    // Task text label
    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;

    contentDiv.appendChild(checkboxSpan);
    contentDiv.appendChild(textSpan);

    // Remove Button (Hint 6)
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.type = 'button';
    deleteBtn.setAttribute('aria-label', `Delete task "${task.text}"`);
    deleteBtn.setAttribute('title', 'Delete task');
    deleteBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    `;

    // Assemble components
    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);

    // Append to container dynamically (Hint 4)
    taskList.appendChild(li);
  });

  // Update counters and empty state
  updateStats();
};

// =============================================================================
// 5. Actions: Add, Mark Complete, Remove
// =============================================================================

/**
 * Add a new task (Hints 3, 4, 8)
 */
const addTask = (text) => {
  const cleanText = text.trim();
  if (!cleanText) return;

  const newTask = {
    id: Date.now(), // Unique identifier
    text: cleanText,
    completed: false
  };

  // Add new task to the top
  tasks.unshift(newTask);
  saveTasks();
  renderTasks();
};

/**
 * Toggle task completion (Hint 5: Toggle class and state)
 */
const toggleTaskComplete = (taskId) => {
  tasks = tasks.map(task => {
    if (task.id === Number(taskId)) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasks();
  renderTasks();
};

/**
 * Remove task (Hint 6: Delete button with smooth transition)
 */
const deleteTask = (taskId, itemElement) => {
  if (itemElement) {
    itemElement.classList.add('removing');
    setTimeout(() => {
      tasks = tasks.filter(task => task.id !== Number(taskId));
      saveTasks();
      renderTasks();
    }, 180);
  } else {
    tasks = tasks.filter(task => task.id !== Number(taskId));
    saveTasks();
    renderTasks();
  }
};

// =============================================================================
// 6. Event Listeners (Hint 3 & 8: Instant updates without page reload)
// =============================================================================

// Form submission handler
todoForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevents default browser reload (Hint 8)
  const text = taskInput.value;
  if (!text.trim()) {
    taskInput.focus();
    return;
  }
  addTask(text);
  taskInput.value = '';
  taskInput.focus();
});

// Event Delegation on Task List (Handles both toggle complete and delete)
taskList.addEventListener('click', (e) => {
  const item = e.target.closest('.task-item');
  if (!item) return;

  const taskId = item.getAttribute('data-id');

  // Check if click occurred on the delete button
  const deleteBtn = e.target.closest('.btn-delete');
  if (deleteBtn) {
    e.stopPropagation();
    deleteTask(taskId, item);
    return;
  }

  // Otherwise, click was to toggle task completion (Hint 5)
  toggleTaskComplete(taskId);
});

// Keyboard support: Space/Enter toggles selected task
taskList.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    const item = e.target.closest('.task-item');
    if (item && !e.target.closest('.btn-delete')) {
      e.preventDefault();
      const taskId = item.getAttribute('data-id');
      toggleTaskComplete(taskId);
    }
  }
});

// Filter Tabs Switching
filterTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterTabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.getAttribute('data-filter');
    renderTasks();
  });
});

// Clear Completed Tasks
clearCompletedBtn.addEventListener('click', () => {
  const hasCompleted = tasks.some(t => t.completed);
  if (!hasCompleted) return;

  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
});

// =============================================================================
// 7. Initialization on DOM Load
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  taskInput.focus();
});
