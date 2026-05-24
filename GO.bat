@echo off
color 0A
cls
cd /d "%~dp0"

echo =====================================================================
echo FINAL PUSH - Avasar123 Account
echo =====================================================================
echo.

git config --global --unset-all credential.helper 2>nul

if exist .git (
    echo Resetting git...
    git reset --hard HEAD
) else (
    echo Initializing git...
    git init
)

echo Configuring git user...
git config user.email "padaliya.avasar@gmail.com"
git config user.name "Avasar"

echo Adding files...
git add -A

echo Committing...
git commit -m "Initial commit: Construction System Pro - GitHub Actions APK Build" --allow-empty

echo Setting up branch...
git branch -M main

echo Configuring remote...
git remote remove origin 2>nul
git remote add origin "https://Avasar123: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@github.com/Avasar123/construction-system-pro.git"

echo.
echo Pushing to GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo SUCCESS! Code pushed. GitHub Actions building APK now...
    echo.
    echo Download APK: https://github.com/Avasar123/construction-system-pro/releases
    echo Upload to Play Store: https://play.google.com/apps/publish
    echo.
) else (
    echo ERROR: Push failed
)

timeout /t 10
