const { readTasks } = require('../utils/fileOps');

// Helper function to sort tasks by due date
function sortByDueDate(tasks) {
    return [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

// Helper function to format a single task
function formatTask(task) {
    return `[${task.dueDate}] ${task.title}`;
}

async function list() {
    const tasks = await readTasks();
    if (tasks.length === 0) {
        console.log('No tasks found.');
        return;
    }

    // Filter incomplete tasks and sort them
    const pendingTasks = sortByDueDate(tasks.filter(task => !task.completed));

    if (pendingTasks.length === 0) {
        console.log('No pending tasks.');
        return;
    }

    // Display pending tasks
    console.log('\nPending Deadlines:');
    pendingTasks.forEach(task => {
        console.log(formatTask(task));
    });
}

async function listAll() {
    const tasks = await readTasks();
    if (tasks.length === 0) {
        console.log('No tasks found.');
        return;
    }

    // Sort all tasks
    const sortedTasks = sortByDueDate(tasks);

    console.log('\nAll Deadlines:');
    sortedTasks.forEach(task => {
        // Add [DONE] prefix for completed tasks
        const status = task.completed ? '[DONE] ' : '';
        console.log(status + formatTask(task));
    });
}

module.exports = {
    list,
    listAll
};