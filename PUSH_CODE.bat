@echo off
REM =====================================================================
REM   PUSH TO GITHUB - Avasar123 Account
REM   Construction System Pro - GitHub Actions APK Build
REM =====================================================================

color 0A
cls

cd /d "%~dp0"

echo =====================================================================
echo PUSHING CODE TO GITHUB - Avasar123/construction-system-pro
echo =====================================================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Download from: https://git-scm.com/download/win
    echo.
    timeout /t 5
    exit /b 1
)

REM Clean up any previous git config issues
git config --global --unset-all credential.helper 2>nul

echo [1] Checking git repository status...
if exist .git (
    echo [1] Git repository already initialized
    git status
) else (
    echo [1] Initializing git repository...
    git init
)

echo.
echo [2] Configuring git user...
git config user.email "padaliya.avasar@gmail.com"
git config user.name "Avasar"

echo [3] Adding all files to git...
git add -A

echo [4] Creating commit...
git commit -m "Initial commit: Construction System Pro - GitHub Actions APK Build" --allow-empty

echo [5] Setting up main branch...
git branch -M main

echo [6] Configuring remote...
git remote remove origin 2>nul
git remote add origin https://github.com/Avasar123/construction-system-pro.git

echo [7] Pushing to GitHub...
echo.
echo IMPORTANT: Enter your GitHub credentials when prompted
echo   Username: Your GitHub username (or email)
echo   Password: Your GitHub Personal Access Token
echo.

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo =====================================================================
    echo SUCCESS! CODE PUSHED TO GITHUB
    echo =====================================================================
    echo.
    echo NEXT STEPS:
    echo.
    echo 1. GitHub Actions builds automatically (takes ~10 minutes)
    echo    Watch progress at:
    echo    https://github.com/Avasar123/construction-system-pro/actions
    echo.
    echo 2. Download your APK when ready:
    echo    https://github.com/Avasar123/construction-system-pro/releases
    echo.
    echo 3. Upload APK to Google Play Console:
    echo    https://play.google.com/apps/publish
    echo.
) else (
    echo.
    echo ERROR: Push failed. Check your GitHub credentials and try again.
    echo.
)

timeout /t 10
