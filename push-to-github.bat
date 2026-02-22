@echo off
REM KodBank - Push to GitHub Script (Windows)
REM This script helps you push your project to GitHub

echo ========================================
echo   KodBank - GitHub Push Helper
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed
    echo Please install Git from: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo [OK] Git is installed
echo.

REM Check if already initialized
if exist .git (
    echo [OK] Git repository already initialized
) else (
    echo [INFO] Initializing Git repository...
    git init
    echo [OK] Git repository initialized
)

echo.

REM Check git config
echo [INFO] Checking Git configuration...
git config user.name >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Git user not configured
    echo.
    set /p USER_NAME="Enter your name: "
    set /p USER_EMAIL="Enter your email: "
    
    git config --global user.name "%USER_NAME%"
    git config --global user.email "%USER_EMAIL%"
    
    echo [OK] Git user configured
) else (
    for /f "delims=" %%i in ('git config user.name') do set GIT_NAME=%%i
    for /f "delims=" %%i in ('git config user.email') do set GIT_EMAIL=%%i
    echo [OK] Git user: %GIT_NAME% ^<%GIT_EMAIL%^>
)

echo.

REM Check for .env file
if exist .env (
    echo [OK] .env file exists (will be ignored by .gitignore)
) else (
    echo [WARNING] No .env file found
    echo Remember to create one from .env.example
)

echo.

REM Stage files
echo [INFO] Staging files...
git add .
echo [OK] Files staged

echo.

REM Show status
echo [INFO] Git Status:
git status --short

echo.

REM Commit
set /p COMMIT_MSG="Enter commit message (or press Enter for default): "

if "%COMMIT_MSG%"=="" (
    set COMMIT_MSG=Initial commit: Full stack banking app with AI chatbot
)

echo [INFO] Creating commit...
git commit -m "%COMMIT_MSG%"
echo [OK] Commit created

echo.

REM Check for remote
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo [INFO] No remote repository configured
    echo.
    echo Please create a repository on GitHub first:
    echo 1. Go to https://github.com/new
    echo 2. Create a new repository (don't initialize with README)
    echo 3. Copy the repository URL
    echo.
    set /p REPO_URL="Enter your GitHub repository URL: "
    
    git remote add origin "%REPO_URL%"
    echo [OK] Remote repository added
) else (
    for /f "delims=" %%i in ('git remote get-url origin') do set REMOTE_URL=%%i
    echo [OK] Remote repository: %REMOTE_URL%
)

echo.

REM Rename branch to main if needed
for /f "delims=" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
if not "%CURRENT_BRANCH%"=="main" (
    echo [INFO] Renaming branch to 'main'...
    git branch -M main
    echo [OK] Branch renamed to main
)

echo.

REM Push to GitHub
echo [INFO] Pushing to GitHub...
echo.

git push -u origin main
if errorlevel 1 (
    echo.
    echo [ERROR] Push failed. Common issues:
    echo.
    echo 1. Authentication Error:
    echo    - Use Personal Access Token instead of password
    echo    - Generate at: https://github.com/settings/tokens
    echo.
    echo 2. Repository Already Has Content:
    echo    - Run: git pull origin main --allow-unrelated-histories
    echo    - Then: git push -u origin main
    echo.
    echo 3. Large Files:
    echo    - Check file sizes in node_modules
    echo    - Ensure .gitignore is working
    echo.
    echo For more help, see GIT_SETUP_GUIDE.md
) else (
    echo.
    echo [SUCCESS] Successfully pushed to GitHub!
    echo.
    echo Your KodBank project is now on GitHub!
    echo.
    echo Next steps:
    echo 1. Visit your repository on GitHub
    echo 2. Add a description and topics
    echo 3. Enable GitHub Pages (if needed)
    echo 4. Share your project!
)

echo.
echo ========================================
echo Script completed!
echo ========================================
pause
