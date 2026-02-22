# Git Setup and Push Guide for KodBank

This guide will help you push your KodBank project to GitHub.

## Prerequisites

- Git installed on your system
- GitHub account created
- Terminal/Command Prompt access

## Step 1: Check Git Installation

```bash
git --version
```

If Git is not installed, download from: https://git-scm.com/downloads

## Step 2: Configure Git (First Time Only)

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

## Step 3: Create GitHub Repository

1. Go to https://github.com
2. Click the "+" icon in top right
3. Select "New repository"
4. Repository name: `kodbank` (or your preferred name)
5. Description: "Full Stack Banking Application with AI Chatbot"
6. Choose Public or Private
7. **DO NOT** initialize with README (we already have one)
8. Click "Create repository"

## Step 4: Initialize Local Git Repository

Open terminal in your project root directory (where package.json is):

```bash
# Initialize Git repository
git init

# Check status
git status
```

## Step 5: Stage All Files

```bash
# Add all files to staging
git add .

# Verify what will be committed
git status
```

## Step 6: Create First Commit

```bash
# Commit with a message
git commit -m "Initial commit: Full stack banking app with AI chatbot"
```

## Step 7: Connect to GitHub Repository

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Verify remote
git remote -v
```

## Step 8: Push to GitHub

```bash
# Push to main branch
git push -u origin main
```

If you get an error about "master" vs "main", try:

```bash
# Rename branch to main
git branch -M main

# Push again
git push -u origin main
```

## Step 9: Verify on GitHub

1. Go to your GitHub repository URL
2. Refresh the page
3. You should see all your files uploaded

## Common Issues and Solutions

### Issue 1: Authentication Failed

**Solution**: Use Personal Access Token (PAT)

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Copy the token
4. When pushing, use token as password

Or use SSH:
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Add to GitHub: Settings → SSH and GPG keys → New SSH key
# Change remote to SSH
git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Issue 2: Large Files Error

If you get errors about large files:

```bash
# Check file sizes
find . -type f -size +50M

# Add large files to .gitignore
echo "path/to/large/file" >> .gitignore
```

### Issue 3: Already Exists Error

If repository already has content:

```bash
# Pull first, then push
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## Future Updates

After making changes to your code:

```bash
# Check what changed
git status

# Stage changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push
```

## Useful Git Commands

```bash
# View commit history
git log

# View changes
git diff

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Merge branch
git merge feature-name

# Discard changes
git checkout -- filename

# Remove file from staging
git reset HEAD filename

# View remote repositories
git remote -v

# Clone repository
git clone https://github.com/USERNAME/REPO_NAME.git
```

## .gitignore File

Your project already has a `.gitignore` file that excludes:

```
node_modules/
.env
frontend/node_modules/
frontend/build/
```

This ensures sensitive data and dependencies are not pushed to GitHub.

## Best Practices

1. **Never commit `.env` file** - Contains sensitive credentials
2. **Commit often** - Small, logical commits are better
3. **Write clear commit messages** - Describe what changed and why
4. **Use branches** - For new features or experiments
5. **Pull before push** - Avoid conflicts when working with others
6. **Review changes** - Use `git diff` before committing

## Commit Message Examples

Good commit messages:
```
✅ "Add AI chatbot with Hugging Face integration"
✅ "Fix authentication bug in login route"
✅ "Update dashboard UI with glassmorphism effects"
✅ "Add quick questions toggle to chatbot"
```

Bad commit messages:
```
❌ "Update"
❌ "Fix bug"
❌ "Changes"
❌ "asdf"
```

## Collaboration Workflow

If working with a team:

```bash
# Update your local repository
git pull origin main

# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push feature branch
git push origin feature/new-feature

# Create Pull Request on GitHub
# After review and approval, merge to main
```

## Emergency: Undo Last Commit

```bash
# Undo last commit but keep changes
git reset --soft HEAD~1

# Undo last commit and discard changes
git reset --hard HEAD~1
```

## Need Help?

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com
- Git Cheat Sheet: https://education.github.com/git-cheat-sheet-education.pdf

---

## Quick Start Summary

```bash
# 1. Initialize
git init

# 2. Add files
git add .

# 3. Commit
git commit -m "Initial commit"

# 4. Add remote
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# 5. Push
git push -u origin main
```

That's it! Your KodBank project is now on GitHub! 🎉
