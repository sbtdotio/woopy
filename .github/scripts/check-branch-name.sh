#!/bin/bash
branch=$(git rev-parse --abbrev-ref HEAD)
pattern='^(feat|fix|chore|docs|refactor)/[0-9]+-'

if [[ "$branch" == "main" || "$branch" == "develop" ]]; then
  exit 0
fi

if ! echo "$branch" | grep -qE "$pattern"; then
  echo "ERROR: Branch '$branch' does not match required pattern:"
  echo "  feat|fix|chore|docs|refactor/<issue-number>-description"
  echo "  Example: feat/1-frontend-backbone"
  exit 1
fi
