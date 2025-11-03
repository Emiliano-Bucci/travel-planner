#!/bin/bash

# Kill any process using port 3000
echo "Checking for processes on port 3000..."
PORT_PID=$(lsof -ti:3000)
if [ ! -z "$PORT_PID" ]; then
    echo "Killing process $PORT_PID using port 3000..."
    kill -9 $PORT_PID
    echo "Port 3000 freed!"
else
    echo "Port 3000 is available."
fi

# Build the Docker image
echo "Building Docker image..."
docker build -t aq-tech-dev .

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    
    # Stop and remove existing container if it exists
    echo "Cleaning up old container (if exists)..."
    docker stop aq-tech-dev-container 2>/dev/null
    docker rm aq-tech-dev-container 2>/dev/null
    
    # Run the container with --init for proper signal handling
    echo "Starting container..."
    docker run --init --rm --name aq-tech-dev-container -p 3000:80 aq-tech-dev
else
    echo "Build failed!"
    exit 1
fi

