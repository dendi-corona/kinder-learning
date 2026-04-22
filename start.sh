#!/bin/bash

# Quick start script for Kindergarten Learning Quest

echo "🌟 Starting Kindergarten Learning Quest! 📚"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start development server
echo "Starting development server..."
echo "Open http://localhost:3000 in your browser"
echo ""
npm run dev
