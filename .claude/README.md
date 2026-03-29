# Claude Code - Project Log System

This directory contains session logs and management tools for tracking development progress across multiple projects.

## 📁 Directory Structure

```
.claude/
├── logs/
│   ├── subscriptiontracker/
│   │   ├── session_log.md       # Main development log
│   │   └── archive/              # Archived logs (when rotated)
│   ├── anotherproject/
│   │   ├── session_log.md
│   │   └── archive/
│   └── ...
├── log_manager.sh               # Log rotation manager
├── view_logs.sh                 # Quick log viewer
├── list_projects.sh             # List all projects
└── README.md                    # This file
```

## 🚀 Quick Start

### View Logs for Current Project
```bash
./.claude/view_logs.sh subscriptiontracker
```

### Check Log Size & Rotation Status
```bash
./.claude/log_manager.sh subscriptiontracker
```

### List All Projects
```bash
./.claude/list_projects.sh
```

## 🔧 How It Works

### Automatic Log Rotation
- **Max Size:** 500MB per log file
- **When Triggered:** Automatically when log exceeds 500MB
- **Action:** Moves current log to `archive/` with timestamp
- **Summary:** Creates new log with summary of archived content

### Multi-Project Support
Each project gets its own isolated log directory:
- Organized by project name
- Independent rotation for each project
- Easy to manage multiple concurrent projects

## 📝 Session Log Format

Each session log contains:
- **Project Overview:** Description, tech stack, goals
- **Session History:** Dated entries with progress
- **Completed Tasks:** What was accomplished
- **Next Steps:** What's coming up
- **Notes:** Important decisions, blockers, etc.

## 💡 Usage Examples

### Starting a New Project
The log system automatically creates a new project log when first accessed:
```bash
./.claude/log_manager.sh mynewproject
```

### Viewing Project History
```bash
# View current log
./.claude/view_logs.sh subscriptiontracker

# View archived logs
cat .claude/logs/subscriptiontracker/archive/session_log_20241213_173000.md
```

### Checking All Projects
```bash
./.claude/list_projects.sh
```

## 🎯 Benefits

1. **Never Forget Progress:** Resume exactly where you left off
2. **Multi-Project Support:** Manage logs for different projects independently
3. **Automatic Cleanup:** Logs rotate at 500MB with summaries
4. **Version History:** All old logs archived with timestamps
5. **Quick Reference:** Easy to see what's been done and what's next

## 📊 Log Rotation Details

When a log exceeds 500MB:
1. Current log moved to `archive/session_log_[timestamp].md`
2. Archive summary created (sessions count, line count, size)
3. New log started with reference to archived log
4. All history preserved - nothing lost!

## 🔍 Finding Old Sessions

All archived logs are stored in:
```
.claude/logs/[project-name]/archive/
```

Filename format: `session_log_YYYYMMDD_HHMMSS.md`

## 🛠️ Customization

Edit `.claude/log_manager.sh` to change:
- `MAX_SIZE_MB` - Default rotation size (500MB)
- Archive location
- Log format
- Summary details

---

**💡 Tip:** Run `./.claude/log_manager.sh [project]` at the start of each session to check log health!
