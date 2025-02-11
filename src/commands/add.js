import inquirer from 'inquirer';
import { readTasks, writeTasks } from '../utils/fileOps.js';

// Helper function to validate and format date
function processDate(input) {
    // Check if the format strictly follows the pattern with hyphens
    const datePattern = /^(\d{4}-\d{2}-\d{2}|\d{2}-\d{2})$/;
    if (!datePattern.test(input) && !input.includes('XXXX')) {
        return { 
            isValid: false, 
            date: null, 
            error: 'Please enter the date in YYYY-MM-DD or MM-DD format using hyphens' 
        };
    }

    // If the input contains 'XXXX', treat it as valid
    if (input.includes('XXXX')) {
        return { isValid: true, date: input };
    }
    
    // For normal date inputs, validate and insert current year if year is missing
    const currentYear = new Date().getFullYear();
    let dateToValidate = input;
    
    // If the input is in MM-DD format, prepend the current year
    if (/^\d{2}-\d{2}$/.test(input)) {
        dateToValidate = `${currentYear}-${input}`;
    }
    
    const date = new Date(dateToValidate);
    if (isNaN(date.getTime())) {
        return { 
            isValid: false, 
            date: null, 
            error: 'Please enter a valid date' 
        };
    }

    // Return processed date
    if (/^\d{2}-\d{2}$/.test(input)) {
        return { isValid: true, date: `${currentYear}-${input}` };
    }
    return { isValid: true, date: dateToValidate };
}

async function add(title = '', dueDate = '') {
    try {
        // If title and date are provided, use direct mode
        if (title && dueDate) {
            // Validate date
            const { isValid, date, error } = processDate(dueDate);
            if (!isValid) {
                console.log(`Error: ${error}`);
                return;
            }

            const tasks = await readTasks();
            const newTask = {
                title: title.trim(),
                dueDate: date,
                completed: false,
                createdAt: new Date().toISOString()
            };

            tasks.push(newTask);
            await writeTasks(tasks);
            console.log('Task added successfully!');
            console.log(`New Task Details: [${newTask.dueDate}] ${newTask.title}`);
            return;
        }

        // Interactive mode
        const questions = [
            {
                type: 'input',
                name: 'title',
                message: 'Task title：',
                validate: input => {
                    if (input.trim().toLowerCase() === 'cancel') return true;
                    return input.trim().length > 0 || 'Title is required';
                }
            },
            {
                type: 'input',
                name: 'dueDate',
                message: 'Due on (YYYY-)MM-DD:',
                validate: function(input) {
                    if (input.trim().toLowerCase() === 'cancel') return true;
                    const { isValid, error } = processDate(input);
                    return isValid || error;
                },
                filter: function(input) {
                    const { date } = processDate(input);
                    return date;
                }
            }
        ];

        const answers = await inquirer.prompt(questions);
        
        // Check if user wants to cancel
        if (answers.title.trim().toLowerCase() === 'cancel') {
            console.log('Operation cancelled.');
            return;
        }
        const tasks = await readTasks();
        
        const newTask = {
            title: answers.title.trim(),
            dueDate: answers.dueDate,
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.push(newTask);
        await writeTasks(tasks);
        console.log('Task added successfully!');
        console.log(`New Task Details: [${newTask.dueDate}] ${newTask.title}`);
    } catch (error) {
        if (error.name === 'ExitPromptError') {
            console.log('Operation cancelled.');
            return;
        }
        console.error('Error adding task:', error);
    }
}

export default add;