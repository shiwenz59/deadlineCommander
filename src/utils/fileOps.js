import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TASKS_FILE = join(dirname(__dirname), '../tasks.json');
const TEMPLATE_FILE = join(dirname(__dirname), '../tasks.template.json');

// Read tasks from file
async function readTasks() {
    try {
        const data = await fs.readFile(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // If tasks.json doesn't exist, copy from template
            try {
                const templateData = await fs.readFile(TEMPLATE_FILE, 'utf8');
                await fs.writeFile(TASKS_FILE, templateData);
                return JSON.parse(templateData);
            } catch (templateError) {
                // If template doesn't exist either, create empty array
                await fs.writeFile(TASKS_FILE, JSON.stringify([], null, 2));
                return [];
            }
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

export { readTasks, writeTasks };