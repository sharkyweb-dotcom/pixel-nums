#!/bin/bash

# Define the name for the virtual environment
VENV_NAME="my_venv"

# Ensure the script exits on errors
set -e

# Create a virtual environment
# echo "create a virtual environment"
# python3 -m venv $VENV_NAME

# Check if the virtual environment was created successfully
echo "find activation script"
if [ ! -d "$VENV_NAME" ]; then
    echo "Failed to create virtual environment!"
    exit 1
fi

# Determine the activation script based on OS
if [ "$(uname)" == "Darwin" ] || [ "$(uname)" == "Linux" ]; then
    # macOS or Linux
    ACTIVATE_SCRIPT="$VENV_NAME/bin/activate"
elif [ "$(expr substr $(uname -s) 1 5)" == "MINGW" ] || [ "$(expr substr $(uname -s) 1 5)" == "MSYS" ]; then
    # Windows (Git Bash, etc.)
    ACTIVATE_SCRIPT="$VENV_NAME/Scripts/activate"
else
    echo "Unsupported platform!"
    exit 1
fi

# Activate the virtual environment
echo "activate the venv"
source $ACTIVATE_SCRIPT

# Install required packages
# echo "installing packages"
# pip install torch torchvision onnx

# Run your python script inside the virtual environment
echo "running script"
python3 pixel-nums/models/conversion_pt_to_onnx/c2onversion_pt_to_onnx.py
# python3 pixel-nums/models/conversion_pt_to_onnx/conversion_pt_to_onnx.py
# Replace 'your_script.py' with the name of your script
# python your_script.py

# Deactivate the virtual environment after script execution (optional)
echo "deactivating"
deactivate
