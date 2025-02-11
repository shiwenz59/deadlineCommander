function showHelp() {
    console.log(`
Deadline Commander - Command Usage Guide

Basic Commands:
  add                    Start interactive mode to add a new task
  add "title" "date"     Add task directly (e.g., add "Math HW" "02-15")
                         Date format: MM-DD or YYYY-MM-DD

List Commands:
  list                   Show all pending tasks
  listall                Show all tasks (including completed)
  list1day               Show pending tasks due within 24 hours
  list3day               Show pending tasks due within 3 days
  list1week              Show pending tasks due within 1 week
  list2week              Show pending tasks due within 2 weeks
  list1month             Show pending tasks due within 1 month

Task Management:
  complete               Start interactive mode to mark a task as completed
  complete "title"       Complete a task by title (will prompt if multiple matches)
  remove                 Start interactive mode to remove a task
  remove "title"         Remove a task by title (will prompt if multiple matches)

Help:
  help                   Show this help menu

Examples:
  $ deadline add "Read Chapter 5" "2025-02-20"
  $ deadline add "Submit Report" "02-15"
  $ deadline complete "Read"
  $ deadline list1week
  $ deadline remove "Report"

Notes:
- Dates can be in MM-DD format (uses current year) or YYYY-MM-DD
- Title searches are case-insensitive and match partial text
- All interactive modes can be cancelled with 'Cmd+C' key
- Overdue tasks are included in all time-range listings`);
}

export { showHelp };