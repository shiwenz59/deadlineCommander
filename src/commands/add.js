const inquirer = require('inquirer');
const { readTasks, writeTasks } = require('../utils/fileOps');
const { displayTask } = require('../utils/display');

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
                const date = new Date(input);
                return !isNaN(date.getTime()) || 'Please enter a valid date in YYYY-MM-DD format';
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
        console.log('\nTask added successfully!');
        
        // Show the newly added task
        console.log('\nNew Task Details:');
        displayTask(newTask);
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

module.exports = add;