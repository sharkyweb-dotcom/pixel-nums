#!/bin/bash

# Check if an argument was provided
if [ "$#" -eq 0 ]; then
    # If no argument, use the current date/time as the commit message
    COMMIT_MSG=$(date +"%Y.%m.%d.%H.%M")
else
    # If an argument was provided, use it as the commit message
    COMMIT_MSG=$1
fi

# Run the git commands
git pull
git add .
git commit -m "$COMMIT_MSG"
git push

echo "Changes committed with message: $COMMIT_MSG and pushed."

