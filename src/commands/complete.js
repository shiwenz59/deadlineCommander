import inquirer from 'inquirer';
import { readTasks, writeTasks } from '../utils/fileOps.js';

// Helper function to format task for selection
function formatTaskChoice(task, index) {
    return {
        name: `[${task.dueDate}] ${task.title}`,
        value: index
    };
}

// Helper function to find task by title (case insensitive partial match)
function findTasksByTitle(tasks, searchTitle) {
    return tasks.filter(task => 
        !task.completed && 
        task.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
}

async function complete(title = '') {
    try {
        const tasks = await readTasks();
        
        if (tasks.length === 0) {
            console.log('No tasks found.');
            return;
        }

        // If a title is provided, try to find and complete that task
        if (title) {
            const matchingTasks = findTasksByTitle(tasks, title);
            
            if (matchingTasks.length === 0) {
                console.log('No matching incomplete tasks found.');
                return;
            }
            
            let taskIndex;
            
            // If multiple matches found, let user select which one to complete
            if (matchingTasks.length > 1) {
                console.log('Multiple matching tasks found:');
                const { selectedIndex } = await inquirer.prompt({
                    type: 'list',
                    name: 'selectedIndex',
                    message: 'Select which task to complete:',
                    choices: matchingTasks.map((task, idx) => ({
                        name: `[${task.dueDate}] ${task.title}`,
                        value: tasks.indexOf(task)
                    }))
                });
                taskIndex = selectedIndex;
            } else {
                taskIndex = tasks.indexOf(matchingTasks[0]);
            }
            
            // Mark the task as completed
            tasks[taskIndex].completed = true;
            tasks[taskIndex].completedAt = new Date().toISOString();
            
            await writeTasks(tasks);
            
            console.log('Task marked as completed:');
            console.log(`[DONE] [${tasks[taskIndex].dueDate}] ${tasks[taskIndex].title}`);
            return;
        }

        // If no title provided, show interactive selection
        const incompleteTasks = tasks.filter(task => !task.completed);
        
        if (incompleteTasks.length === 0) {
            console.log('No pending tasks to complete.');
            return;
        }

        const question = {
            type: 'list',
            name: 'taskIndex',
            message: 'Select a task to mark as completed (Press Esc to cancel):',
            choices: [
                ...incompleteTasks.map((task, index) => formatTaskChoice(task, tasks.indexOf(task))),
                { name: 'Cancel', value: 'cancel' }
            ]
        };

        const { taskIndex } = await inquirer.prompt(question);
        
        // Handle cancellation
        if (taskIndex === 'cancel') {
            console.log('Operation cancelled.');
            return;
        }
        
        // Mark the task as completed
        tasks[taskIndex].completed = true;
        tasks[taskIndex].completedAt = new Date().toISOString();
        
        await writeTasks(tasks);
        
        console.log('Task marked as completed:');
        console.log(`[DONE] [${tasks[taskIndex].dueDate}] ${tasks[taskIndex].title}`);
    } catch (error) {
        console.error('Error completing task:', error);
    }
}

export default complete;