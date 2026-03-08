#!/bin/bash

set -e

echo "🚀 Woopy Frontend - Quick Start"
echo "================================"
echo ""

echo "📚 Installing/updating dependencies..."
uv sync

# Run FastAPI app from project root
uv run fastapi dev app/main.py --port 8001
