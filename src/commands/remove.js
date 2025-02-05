import inquirer from 'inquirer';
import { readTasks, writeTasks } from '../utils/fileOps.js';

// Helper function to format task for selection
function formatTaskChoice(task, index) {
    const status = task.completed ? '[DONE]' : '[PENDING]';
    return {
        name: `${status} [${task.dueDate}] ${task.title}`,
        value: index
    };
}

// Helper function to find task by title (case insensitive partial match)
function findTasksByTitle(tasks, searchTitle) {
    return tasks.filter(task => 
        task.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
}

async function remove(title = '') {
    try {
        const tasks = await readTasks();
        
        if (tasks.length === 0) {
            console.log('No tasks found.');
            return;
        }

        // If a title is provided, try to find and remove that task
        if (title) {
            const matchingTasks = findTasksByTitle(tasks, title);
            
            if (matchingTasks.length === 0) {
                console.log('No matching tasks found.');
                return;
            }
            
            let taskIndex;
            
            // If multiple matches found, let user select which one to remove
            if (matchingTasks.length > 1) {
                console.log('Multiple matching tasks found:');
                const { selectedIndex } = await inquirer.prompt({
                    type: 'list',
                    name: 'selectedIndex',
                    message: 'Select which task to remove (Press Esc to cancel):',
                    choices: [
                        ...matchingTasks.map((task, idx) => ({
                            name: `[${task.dueDate}] ${task.title}`,
                            value: tasks.indexOf(task)
                        })),
                        { name: 'Cancel', value: 'cancel' }
                    ]
                });

                if (selectedIndex === 'cancel') {
                    console.log('Operation cancelled.');
                    return;
                }
                taskIndex = selectedIndex;
            } else {
                taskIndex = tasks.indexOf(matchingTasks[0]);
            }

            // Confirm before removing
            const { confirm } = await inquirer.prompt({
                type: 'confirm',
                name: 'confirm',
                message: `Are you sure you want to remove: [${matchingTasks[0].dueDate}] ${matchingTasks[0].title}?`,
                default: false
            });

            if (!confirm) {
                console.log('Operation cancelled.');
                return;
            }
            
            // Store task details for confirmation message
            const removedTask = tasks[taskIndex];
            
            // Remove the task
            tasks.splice(taskIndex, 1);
            await writeTasks(tasks);
            
            console.log('Task removed successfully:');
            console.log(`[${removedTask.dueDate}] ${removedTask.title}`);
            return;
        }

        // If no title provided, show interactive selection
        const question = {
            type: 'list',
            name: 'taskIndex',
            message: 'Select a task to remove (Press Esc to cancel):',
            choices: [
                ...tasks.map((task, index) => formatTaskChoice(task, index)),
                { name: 'Cancel', value: 'cancel' }
            ]
        };

        const { taskIndex } = await inquirer.prompt(question);

        // Handle cancellation
        if (taskIndex === 'cancel') {
            console.log('Operation cancelled.');
            return;
        }

        // Confirm before removing
        const { confirm } = await inquirer.prompt({
            type: 'confirm',
            name: 'confirm',
            message: `Are you sure you want to remove: [${tasks[taskIndex].dueDate}] ${tasks[taskIndex].title}?`,
            default: false
        });

        if (!confirm) {
            console.log('Operation cancelled.');
            return;
        }

        // Store task details for confirmation message
        const removedTask = tasks[taskIndex];
        
        // Remove the task
        tasks.splice(taskIndex, 1);
        await writeTasks(tasks);
        
        console.log('Task removed successfully:');
        console.log(`[${removedTask.dueDate}] ${removedTask.title}`);
    } catch (error) {
        console.error('Error removing task:', error);
    }
}

export default remove;