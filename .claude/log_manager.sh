#!/bin/bash

# Log Manager for Claude Code Sessions - Multi-Project Support
# Automatically rotates logs when they exceed 500MB

# Project name (passed as argument or auto-detected)
PROJECT_NAME="${1:-subscriptiontracker}"

LOG_DIR=".claude/logs/${PROJECT_NAME}"
LOG_FILE="${LOG_DIR}/session_log.md"
ARCHIVE_DIR="${LOG_DIR}/archive"
MAX_SIZE_MB=500

# Create directories if they don't exist
mkdir -p "$LOG_DIR"
mkdir -p "$ARCHIVE_DIR"

# Color codes for pretty output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Log Manager - Project: ${PROJECT_NAME}${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"

# Check if log file exists
if [ ! -f "$LOG_FILE" ]; then
    echo -e "${YELLOW}⚠️  Log file not found. Creating new log...${NC}"
    cat > "$LOG_FILE" << EOF
# ${PROJECT_NAME} - Development Log

## Project: ${PROJECT_NAME}
**Created:** $(date +"%Y-%m-%d %H:%M:%S")

---

## Session Log

### Session 1 - [Initial Session]
**Date:** $(date +"%Y-%m-%d")

**Status:** Project started

**Notes:**
- Log system initialized
- Ready to track development progress

---

## Log Rotation Info
- **Current Size:** <1KB
- **Max Size:** ${MAX_SIZE_MB}MB
- **Rotation Strategy:** When log exceeds ${MAX_SIZE_MB}MB, create summary and archive
EOF
    echo -e "${GREEN}✅ New log created: ${LOG_FILE}${NC}"
    exit 0
fi

# Get current log file size in MB
SIZE_BYTES=$(stat -f%z "$LOG_FILE" 2>/dev/null || stat -c%s "$LOG_FILE" 2>/dev/null)
SIZE_MB=$((SIZE_BYTES / 1024 / 1024))
SIZE_KB=$((SIZE_BYTES / 1024))

# Display size info
if [ $SIZE_MB -lt 1 ]; then
    echo -e "${GREEN}📊 Current log size: ${SIZE_KB}KB / ${MAX_SIZE_MB}MB${NC}"
else
    echo -e "${GREEN}📊 Current log size: ${SIZE_MB}MB / ${MAX_SIZE_MB}MB${NC}"
fi

# Check if rotation is needed
if [ $SIZE_MB -ge $MAX_SIZE_MB ]; then
    echo -e "${YELLOW}⚠️  Log file exceeds ${MAX_SIZE_MB}MB. Rotating...${NC}"

    # Create timestamp for archive
    TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
    ARCHIVE_FILE="${ARCHIVE_DIR}/session_log_${TIMESTAMP}.md"

    # Move current log to archive
    mv "$LOG_FILE" "$ARCHIVE_FILE"

    # Create summary of archived log
    TOTAL_LINES=$(wc -l < "$ARCHIVE_FILE")
    TOTAL_SESSIONS=$(grep -c "^### Session" "$ARCHIVE_FILE" 2>/dev/null || echo "0")

    # Create new log with summary
    cat > "$LOG_FILE" << EOF
# ${PROJECT_NAME} - Development Log

## Project: ${PROJECT_NAME}

## Log Rotation Notice
**Rotated:** $(date +"%Y-%m-%d %H:%M:%S")
**Reason:** Previous log exceeded ${MAX_SIZE_MB}MB size limit

### Archived Log Summary
- **File:** session_log_${TIMESTAMP}.md
- **Size:** ${SIZE_MB}MB
- **Total Lines:** ${TOTAL_LINES}
- **Total Sessions:** ${TOTAL_SESSIONS}
- **Location:** .claude/logs/${PROJECT_NAME}/archive/

---

## Session Log

### New Session - Continuing Development
**Date:** $(date +"%Y-%m-%d %H:%M:%S")

**Status:** Log rotated - continuing development

**Notes:**
- Previous log archived successfully
- All historical data preserved in archive
- Starting fresh log file

---

## Log Rotation Info
- **Current Size:** <1KB
- **Max Size:** ${MAX_SIZE_MB}MB
- **Rotation Strategy:** When log exceeds ${MAX_SIZE_MB}MB, create summary and archive
EOF

    echo -e "${GREEN}✅ Log rotated successfully!${NC}"
    echo -e "${BLUE}   📁 Archived: ${ARCHIVE_FILE}${NC}"
    echo -e "${BLUE}   📝 New log: ${LOG_FILE}${NC}"
    echo -e "${BLUE}   📊 Archive summary: ${TOTAL_SESSIONS} sessions, ${TOTAL_LINES} lines${NC}"
else
    echo -e "${GREEN}✅ Log size OK - No rotation needed${NC}"
fi

# Show log location
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}📍 Log location: ${LOG_FILE}${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
