function showHelp() {
    console.log(`Deadline Manager - Available Commands:
    add         Add a new deadline (interactive)
    add title date  Add a new deadline directly (e.g., add "Task A" "02-15")
    list        List all pending deadlines
    listall     List all deadlines (including completed)
    list1day    List tasks due within 1 day
    list3day    List tasks due within 3 days
    list1week   List tasks due within 1 week
    list2week   List tasks due within 2 weeks
    list1month  List tasks due within 1 month
    complete    Mark a task as completed
    remove      Remove a task
    help        Show this help menu`);
}

export { showHelp };