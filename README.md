# deadlineCommander

A command-line interface (CLI) tool for managing tasks and deadlines efficiently. Keep track of your assignments, projects, and other time-sensitive tasks with simple commands.

## Features

- Add tasks with deadlines through interactive mode or direct commands
- View tasks filtered by different time ranges (1 day, 3 days, 1 week, etc.)
- Mark tasks as complete
- Remove tasks
- Automatic tracking of creation and completion timestamps
- Simple and intuitive command structure

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shiwenz59/deadlineCommander.git
   cd deadline-commander
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Link the package globally (to use `deadline` command from anywhere):
   ```bash
   npm link
   ```

## Usage

### Basic Commands

```bash
deadline add                     # Start interactive mode to add a new task
deadline add "title" "date"      # Add task directly (e.g., deadline add "Math HW" "02-15")
deadline list                    # Show all pending tasks
deadline complete "title"        # Mark a task as complete
deadline remove "title"         # Remove a task
```

### List Commands

- `deadline list` - Show all pending tasks
- `deadline listall` - Show all tasks (including completed)
- `deadline list1day` - Show tasks due within 24 hours
- `deadline list3day` - Show tasks due within 3 days
- `deadline list1week` - Show tasks due within 1 week
- `deadline list2week` - Show tasks due within 2 weeks
- `deadline list1month` - Show tasks due within 1 month

### Date Format

- Accepts both `MM-DD` and `YYYY-MM-DD` formats
- When using `MM-DD`, the current year is automatically used

### Examples

```bash
# Add a new task
deadline add "Read Chapter 5" "2025-02-20"

# Add a task due this year
deadline add "Submit Report" "02-15"

# Complete a task
deadline complete "Read"

# View tasks due in the next week
deadline list1week

# Remove a task
deadline remove "Report"
```

## Notes

- Title searches are case-insensitive and match partial text
- All interactive modes can be cancelled with 'Cmd+C' key
- Overdue tasks are included in all time-range listings
- Tasks are stored locally in `tasks.json`

## Development

The project structure is organized as follows:
```
deadline-commander/
├── src/
│   ├── commands/         # Command implementations
│   └── utils/           # Utility functions
├── tasks.template.json   # Template for tasks storage
├── index.js             # Main CLI entry point
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Add your chosen license here]
```