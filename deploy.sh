#!/bin/zsh
set -eu     # fail on error and undefined variables

SITE_DIR="_site"
REMOTE="me@twelvefourseven.net"
TARGET="/var/www/twelvefourseven.net"

# Base rsync options
RSYNC_OPTS=(-avhz)

# Check for "--delete" flag
if [[ "${1:-}" = "--delete" ]]; then
    RSYNC_OPTS+=("--delete")
    echo "⚠️  WARNING: --delete is enabled!"
fi

echo "Dry run first..."
rsync ${RSYNC_OPTS[@]} --dry-run "$SITE_DIR/" "$REMOTE:$TARGET"

echo
echo "Does the dry run look okay? [y/N] "
read CONFIRM

if [ "$CONFIRM" = "y" ] || [ "$CONFIRM" = "Y" ]; then
    echo "Deploying..."
    rsync ${RSYNC_OPTS[@]} "$SITE_DIR/" "$REMOTE:$TARGET"
    echo "Done!"
else
    echo "Aborted."
fi