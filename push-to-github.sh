#!/bin/bash

# KodBank - Push to GitHub Script
# This script helps you push your project to GitHub

echo "🚀 KodBank - GitHub Push Helper"
echo "================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "Download from: https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Check if already initialized
if [ -d .git ]; then
    echo "✅ Git repository already initialized"
else
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
fi

echo ""

# Check git config
echo "🔍 Checking Git configuration..."
GIT_NAME=$(git config user.name)
GIT_EMAIL=$(git config user.email)

if [ -z "$GIT_NAME" ] || [ -z "$GIT_EMAIL" ]; then
    echo "⚠️  Git user not configured"
    echo ""
    read -p "Enter your name: " USER_NAME
    read -p "Enter your email: " USER_EMAIL
    
    git config --global user.name "$USER_NAME"
    git config --global user.email "$USER_EMAIL"
    
    echo "✅ Git user configured"
else
    echo "✅ Git user: $GIT_NAME <$GIT_EMAIL>"
fi

echo ""

# Check for .env file
if [ -f .env ]; then
    echo "✅ .env file exists (will be ignored by .gitignore)"
else
    echo "⚠️  No .env file found. Remember to create one from .env.example"
fi

echo ""

# Stage files
echo "📝 Staging files..."
git add .
echo "✅ Files staged"

echo ""

# Show status
echo "📊 Git Status:"
git status --short

echo ""

# Commit
read -p "Enter commit message (or press Enter for default): " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Initial commit: Full stack banking app with AI chatbot"
fi

echo "💾 Creating commit..."
git commit -m "$COMMIT_MSG"
echo "✅ Commit created"

echo ""

# Check for remote
REMOTE_URL=$(git remote get-url origin 2>/dev/null)

if [ -z "$REMOTE_URL" ]; then
    echo "🔗 No remote repository configured"
    echo ""
    echo "Please create a repository on GitHub first:"
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository (don't initialize with README)"
    echo "3. Copy the repository URL"
    echo ""
    read -p "Enter your GitHub repository URL: " REPO_URL
    
    git remote add origin "$REPO_URL"
    echo "✅ Remote repository added"
else
    echo "✅ Remote repository: $REMOTE_URL"
fi

echo ""

# Rename branch to main if needed
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "🔄 Renaming branch to 'main'..."
    git branch -M main
    echo "✅ Branch renamed to main"
fi

echo ""

# Push to GitHub
echo "🚀 Pushing to GitHub..."
echo ""

if git push -u origin main; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Your KodBank project is now on GitHub!"
    echo ""
    echo "Next steps:"
    echo "1. Visit your repository on GitHub"
    echo "2. Add a description and topics"
    echo "3. Enable GitHub Pages (if needed)"
    echo "4. Share your project!"
else
    echo ""
    echo "❌ Push failed. Common issues:"
    echo ""
    echo "1. Authentication Error:"
    echo "   - Use Personal Access Token instead of password"
    echo "   - Generate at: https://github.com/settings/tokens"
    echo ""
    echo "2. Repository Already Has Content:"
    echo "   - Run: git pull origin main --allow-unrelated-histories"
    echo "   - Then: git push -u origin main"
    echo ""
    echo "3. Large Files:"
    echo "   - Check file sizes: find . -type f -size +50M"
    echo "   - Add large files to .gitignore"
    echo ""
    echo "For more help, see GIT_SETUP_GUIDE.md"
fi

echo ""
echo "================================"
echo "Script completed!"
