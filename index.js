#!/usr/bin/env node

import add from './src/commands/add.js';
import complete from './src/commands/complete.js';
import remove from './src/commands/remove.js';
import { 
    list, 
    listAll, 
    list1day, 
    list3day, 
    list1week, 
    list2week, 
    list1month 
} from './src/commands/list.js';
import { showHelp } from './src/utils/display.js';

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
        case 'list1day':
            await list1day();
            break;
        case 'list3day':
            await list3day();
            break;
        case 'list1week':
            await list1week();
            break;
        case 'list2week':
            await list2week();
            break;
        case 'list1month':
            await list1month();
            break;
        case 'complete':
            await complete(args[0]);
            break;
        case 'remove':
            await remove(args[0]);
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