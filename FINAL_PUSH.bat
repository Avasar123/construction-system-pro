@echo off
REM =====================================================================
REM   FINAL PUSH - huskydevlop Account with Token Authentication
REM   Construction System Pro - Automatic GitHub Actions APK Build
REM =====================================================================

color 0A
cls

cd /d "%~dp0"

echo =====================================================================
echo PUSHING TO GITHUB - huskydevlop Account
echo =====================================================================
echo.

REM Clean up any previous git config
git config --global --unset-all credential.helper 2>nul

REM Initialize or reset git
if exist .git (
    echo [1] Resetting git repository...
    git reset --hard HEAD
) else (
    echo [1] Initializing git repository...
    git init
)

echo [2] Configuring git user...
git config user.email "huskydevlop2025@gmail.com"
git config user.name "huskydevlop"

echo [3] Adding all files...
git add -A

echo [4] Creating commit...
git commit -m "Initial commit: Construction System Pro - GitHub Actions APK Build" --allow-empty

echo [5] Setting up main branch...
git branch -M main

echo [6] Configuring remote with authentication...
git remote remove origin 2>nul
git remote add origin "https://huskydevlop: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@github.com/huskydevlop/construction-system-pro.git"

echo [7] Pushing to GitHub...
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo =====================================================================
    echo ✓ SUCCESS! CODE PUSHED TO GITHUB
    echo =====================================================================
    echo.
    echo NEXT STEPS:
    echo.
    echo 1. GitHub Actions will build your APK automatically
    echo    Monitor progress at:
    echo    https://github.com/huskydevlop/construction-system-pro/actions
    echo.
    echo 2. Download your APK when ready:
    echo    https://github.com/huskydevlop/construction-system-pro/releases
    echo.
    echo 3. Upload APK to Google Play Console:
    echo    https://play.google.com/apps/publish
    echo.
    echo Build will take approximately 10 minutes.
    echo.
) else (
    echo.
    echo ERROR: Push failed. Check your token and try again.
    echo.
)

timeout /t 10
