#!/bin/bash

set -e

echo "🚀 Woopy Frontend - Quick Start"
echo "================================"
echo ""

echo "📚 Installing/updating dependencies..."
uv sync

# Change to app directory and run
cd app
uv run fastapi dev --port 8001
