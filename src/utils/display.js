function showHelp() {
    console.log(`
Deadline Manager - Available Commands:
    add         Add a new deadline
    list        List pending deadlines
    listall     List all deadlines (including completed)
    help        Show this help menu
    `);
}

function displayTask(task, index = null) {
    console.log('----------------');
    if (index !== null) {
        console.log(`${index + 1}. ${task.title}`);
    } else {
        console.log(`Title: ${task.title}`);
    }
    console.log(`Due: ${task.dueDate}`);
    console.log(`Status: ${task.completed ? 'Completed' : 'Pending'}`);
    if (task.description) {
        console.log(`Description: ${task.description}`);
    }
    console.log('----------------');
}

module.exports = {
    showHelp
};