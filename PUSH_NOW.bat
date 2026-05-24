@echo off
REM =====================================================================
REM   PUSH TO GITHUB - huskydevlop Account
REM =====================================================================

color 0A
cls

cd /d "%~dp0"

echo PUSHING TO GITHUB FOR APK BUILD...
echo.

git init
git config user.email "padaliya.avasar@gmail.com"
git config user.name "Avasar"
git add -A
git commit -m "Initial commit: Construction System Pro with GitHub Actions"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/Avasar123/construction-system-pro.git

echo.
echo =====================================================================
echo READY TO PUSH - Enter credentials when prompted
echo =====================================================================
echo.
echo When prompted:
echo   Username: huskydevlop
echo   Password: Your GitHub Personal Access Token from https://github.com/settings/tokens
echo.
timeout /t 3

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo SUCCESS! Code pushed to GitHub
    echo.
    echo NEXT:
    echo 1. GitHub Actions builds APK (10 minutes)
    echo 2. Download: https://github.com/huskydevlop/construction-system-pro/releases
    echo 3. Upload to Play Store: https://play.google.com/apps/publish
    echo.
) else (
    echo.
    echo ERROR during push. Check your GitHub credentials.
    echo.
)

timeout /t 5
