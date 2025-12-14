#!/bin/bash

# Quick log viewer for Claude Code Sessions

PROJECT_NAME="${1:-subscriptiontracker}"
LOG_FILE=".claude/logs/${PROJECT_NAME}/session_log.md"

# Color codes
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Log Viewer - Project: ${PROJECT_NAME}${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"

if [ ! -f "$LOG_FILE" ]; then
    echo -e "${RED}❌ Log file not found: ${LOG_FILE}${NC}"
    echo -e "Available projects:"
    ls -1 .claude/logs/ 2>/dev/null || echo "  No logs found"
    exit 1
fi

# Display the log
cat "$LOG_FILE"

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}📍 Log location: ${LOG_FILE}${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
