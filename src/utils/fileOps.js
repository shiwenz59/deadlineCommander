const fs = require('fs').promises;
const path = require('path');

const TASKS_FILE = path.join(__dirname, '../../tasks.json');

// Read tasks from file
async function readTasks() {
    try {
        const data = await fs.readFile(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // If file doesn't exist, create it with empty tasks array
            await fs.writeFile(TASKS_FILE, JSON.stringify([], null, 2));
            return [];
        }
        console.error('Error reading tasks:', error);
        return [];
    }
}

// Write tasks to file
async function writeTasks(tasks) {
    try {
        await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error('Error writing tasks:', error);
    }
}

module.exports = {
    readTasks,
    writeTasks
};