@echo off
REM =====================================================================
REM   PUSH TO GITHUB - Automatic Git Setup and Push (SILENT MODE)
REM   Construction System Pro - GitHub Actions APK Build
REM =====================================================================

color 0A
cls

echo =====================================================================
echo PUSHING TO GITHUB FOR AUTOMATIC APK BUILD
echo =====================================================================
echo.

REM Navigate to Design folder
cd /d "%~dp0"

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Download from: https://git-scm.com/download/win
    echo.
    timeout /t 5
    exit /b 1
)

echo [1] Initializing git repository...
git init

echo [2] Configuring git...
git config user.email "padaliya.avasar@gmail.com"
git config user.name "Avasar"

echo [3] Adding all files to git...
git add -A

echo [4] Creating commit...
git commit -m "Initial commit: Construction System Pro with GitHub Actions"

echo [5] Setting up main branch...
git branch -M main

echo [6] Connecting to GitHub...
git remote remove origin 2>nul
git remote add origin https://github.com/Avasar123/construction-system-pro.git

echo [7] Pushing to GitHub...
echo.
echo IMPORTANT: When prompted for credentials:
echo   Username: Your GitHub username
echo   Password: Your GitHub Personal Access Token (from https://github.com/settings/tokens)
echo.
timeout /t 5

git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ERROR occurred during push. Check:
    echo - Internet connection
    echo - GitHub credentials
    echo - Repository exists: https://github.com/Avasar123/construction-system-pro
    timeout /t 10
    exit /b 1
)

echo.
echo =====================================================================
echo SUCCESS! CODE PUSHED TO GITHUB
echo =====================================================================
echo.
echo NEXT STEPS:
echo 1. GitHub Actions builds automatically (takes ~10 minutes)
echo 2. Watch progress: https://github.com/Avasar123/construction-system-pro/actions
echo 3. Download APK: https://github.com/Avasar123/construction-system-pro/releases
echo 4. Upload to Play Store: https://play.google.com/apps/publish
echo.
timeout /t 5
exit /b 0
