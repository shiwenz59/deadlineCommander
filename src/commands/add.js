import inquirer from 'inquirer';
import { readTasks, writeTasks } from '../utils/fileOps.js';

async function add() {
    const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'What is the task title?',
            validate: input => input.trim().length > 0 || 'Title is required'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter task description (optional):',
        },
        {
            type: 'input',
            name: 'dueDate',
            message: 'When is it due? (YYYY-MM-DD):',
            validate: function(input) {
                // If the input contains 'XXXX', treat it as valid
                if (input.includes('XXXX')) {
                    return true;
                }
                
                // For normal date inputs, validate and insert current year if year is missing
                const currentYear = new Date().getFullYear();
                let dateToValidate = input;
                
                // If the input is in MM-DD format, prepend the current year
                if (/^\d{2}-\d{2}$/.test(input)) {
                    dateToValidate = `${currentYear}-${input}`;
                }
                
                const date = new Date(dateToValidate);
                return !isNaN(date.getTime()) || 'Please enter a valid date in YYYY-MM-DD or MM-DD format';
            },
            filter: function(input) {
                // If input contains 'XXXX', return as is
                if (input.includes('XXXX')) {
                    return input;
                }
                
                // If input is in MM-DD format, add current year
                if (/^\d{2}-\d{2}$/.test(input)) {
                    const currentYear = new Date().getFullYear();
                    return `${currentYear}-${input}`;
                }
                
                // Return original input for fully specified dates
                return input;
            }
        }
    ];

    try {
        const answers = await inquirer.prompt(questions);
        const tasks = await readTasks();
        
        const newTask = {
            title: answers.title.trim(),
            description: answers.description.trim() || null,
            dueDate: answers.dueDate,
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.push(newTask);
        await writeTasks(tasks);
        console.log('Task added successfully!');
        
        // Show the newly added task
        console.log('New Task Details:' + `[${newTask.dueDate}] ${newTask.title}`);
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

export default add;