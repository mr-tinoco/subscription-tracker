#!/bin/bash

# List all projects with logs

# Color codes
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Claude Code - Project Logs${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"

if [ ! -d ".claude/logs" ]; then
    echo -e "${YELLOW}⚠️  No log directory found${NC}"
    exit 0
fi

echo -e "${GREEN}Available projects:${NC}"
echo ""

for project_dir in .claude/logs/*/; do
    if [ -d "$project_dir" ]; then
        project_name=$(basename "$project_dir")
        log_file="${project_dir}session_log.md"

        if [ -f "$log_file" ]; then
            # Get file size
            size_bytes=$(stat -f%z "$log_file" 2>/dev/null || stat -c%s "$log_file" 2>/dev/null)
            size_kb=$((size_bytes / 1024))

            # Get last modified date
            last_modified=$(stat -f "%Sm" -t "%Y-%m-%d %H:%M" "$log_file" 2>/dev/null || stat -c "%y" "$log_file" 2>/dev/null | cut -d'.' -f1)

            # Count sessions
            sessions=$(grep -c "^### Session" "$log_file" 2>/dev/null || echo "0")

            echo -e "  ${GREEN}📁 ${project_name}${NC}"
            echo -e "     Size: ${size_kb}KB | Sessions: ${sessions} | Updated: ${last_modified}"
            echo -e "     Location: ${log_file}"
            echo ""
        fi
    fi
done

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}💡 Usage:${NC}"
echo -e "   View logs:    ./.claude/view_logs.sh [project_name]"
echo -e "   Check size:   ./.claude/log_manager.sh [project_name]"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
