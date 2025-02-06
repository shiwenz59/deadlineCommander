import { readTasks } from '../utils/fileOps.js';

// Helper function to sort tasks by due date
function sortByDueDate(tasks) {
    return [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
}

// Helper function to format a single task
function formatTask(task) {
    // Get today's date as YYYY-MM-DD
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day
    const todayStr = today.toISOString().split('T')[0];
    const todayDate = new Date(todayStr);
    const taskDate = new Date(task.dueDate);
    
    if (task.completed) {
        return `[DONE, ${task.dueDate}] ${task.title}`;
    }
    if (taskDate < todayDate) {
        return `[OVERDUE, ${task.dueDate}] ${task.title}`;
    }
    return `[${task.dueDate}] ${task.title}`;
}

// Helper function to filter tasks by date range
function filterTasksByDateRange(tasks, daysAhead) {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Calculate future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysAhead);
    const futureDateStr = futureDate.toISOString().split('T')[0];
    
    return tasks.filter(task => {
        // Skip tasks with placeholder dates
        if (task.dueDate.includes('XXXX')) {
            return false;
        }
        
        // Include overdue tasks (before today) OR tasks within the future range
        return task.dueDate < todayStr || (task.dueDate >= todayStr && task.dueDate <= futureDateStr);
    });
}

// Base list function for pending tasks
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

    console.log('Pending Deadlines:');
    pendingTasks.forEach(task => {
        console.log(formatTask(task));
    });
}

// List all tasks (including completed)
async function listAll() {
    const tasks = await readTasks();
    if (tasks.length === 0) {
        console.log('No tasks found.');
        return;
    }

    const sortedTasks = sortByDueDate(tasks);

    console.log('All Deadlines:');
    sortedTasks.forEach(task => {
        console.log(formatTask(task));
    });
}

// List tasks due within 1 day
async function list1day() {
    const tasks = await readTasks();
    const filteredTasks = filterTasksByDateRange(
        tasks.filter(task => !task.completed),
        1
    );
    
    if (filteredTasks.length === 0) {
        console.log('No tasks due within 1 day.');
        return;
    }

    console.log('Tasks due within 1 day:');
    sortByDueDate(filteredTasks).forEach(task => {
        console.log(formatTask(task));
    });
}

// List tasks due within 3 days
async function list3day() {
    const tasks = await readTasks();
    const filteredTasks = filterTasksByDateRange(
        tasks.filter(task => !task.completed),
        3
    );
    
    if (filteredTasks.length === 0) {
        console.log('No tasks due within 3 days.');
        return;
    }

    console.log('Tasks due within 3 days:');
    sortByDueDate(filteredTasks).forEach(task => {
        console.log(formatTask(task));
    });
}

// List tasks due within 1 week
async function list1week() {
    const tasks = await readTasks();
    const filteredTasks = filterTasksByDateRange(
        tasks.filter(task => !task.completed),
        7
    );
    
    if (filteredTasks.length === 0) {
        console.log('No tasks due within 1 week.');
        return;
    }

    console.log('Tasks due within 1 week:');
    sortByDueDate(filteredTasks).forEach(task => {
        console.log(formatTask(task));
    });
}

// List tasks due within 2 weeks
async function list2week() {
    const tasks = await readTasks();
    const filteredTasks = filterTasksByDateRange(
        tasks.filter(task => !task.completed),
        14
    );
    
    if (filteredTasks.length === 0) {
        console.log('No tasks due within 2 weeks.');
        return;
    }

    console.log('Tasks due within 2 weeks:');
    sortByDueDate(filteredTasks).forEach(task => {
        console.log(formatTask(task));
    });
}

// List tasks due within 1 month
async function list1month() {
    const tasks = await readTasks();
    const filteredTasks = filterTasksByDateRange(
        tasks.filter(task => !task.completed),
        30
    );
    
    if (filteredTasks.length === 0) {
        console.log('No tasks due within 1 month.');
        return;
    }

    console.log('Tasks due within 1 month:');
    sortByDueDate(filteredTasks).forEach(task => {
        console.log(formatTask(task));
    });
}

export { 
    list, 
    listAll, 
    list1day, 
    list3day, 
    list1week, 
    list2week, 
    list1month 
};