#!/usr/bin/env node

const add = require('./src/commands/add');
const { list, listAll } = require('./src/commands/list');
const { showHelp } = require('./src/utils/display');

// Main function to handle commands
async function handleCommand(cmd, args) {
    switch (cmd) {
        case 'add':
            await add();
            break;
        case 'list':
            await list();
            break;
        case 'listall':
            await listAll();
            break;
        case 'help':
            showHelp();
            break;
        default:
            console.log('Unknown command. Type "deadline help" for usage information.');
    }
}

// Execute the command
const [,, command, ...args] = process.argv;
if (!command) {
    showHelp();
} else {
    handleCommand(command, args).catch(console.error);
}