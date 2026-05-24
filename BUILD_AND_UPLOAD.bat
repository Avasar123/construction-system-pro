@echo off
REM =====================================================================
REM   ANDROID APP BUILD AUTOMATION
REM   RFP Analysis Pro v1.0
REM =====================================================================

color 0A
cls

echo.
echo =====================================================================
echo          BUILDING ANDROID APP - RFP Analysis Pro
echo =====================================================================
echo.
echo This script will:
echo 1. Initialize Git repository
echo 2. Commit all files
echo 3. Build Android APK/AAB
echo 4. Download build artifact
echo.
echo Total time: ~15 minutes
echo.
pause

REM Step 1: Initialize Git
echo.
echo [STEP 1] Initializing Git repository...
git init
if %errorlevel% neq 0 goto :error

REM Step 2: Force add all files
echo.
echo [STEP 2] Adding all project files...
git add -A
git add -f .gitignore

REM Step 3: Try to commit (ignore if nothing to commit)
echo.
echo [STEP 3] Committing files...
git commit -m "Android app build" --allow-empty
if %errorlevel% neq 0 (
    echo Continuing despite git commit status...
)

REM Step 4: Build Android
echo.
echo [STEP 4] Building Android APK/AAB...
echo          This takes 10-15 minutes. Please wait...
echo.
eas build --platform android

if %errorlevel% neq 0 goto :error

echo.
echo =====================================================================
echo          BUILD SUCCESSFUL!
echo =====================================================================
echo.
echo Your Android app has been built successfully.
echo.
echo Next steps:
echo 1. Download the .aab file from the Expo dashboard link above
echo 2. Go to: https://play.google.com/apps/publish
echo 3. Upload the .aab file
echo 4. See: GOOGLE_PLAY_UPLOAD.md for detailed steps
echo.
pause
goto :end

:error
echo.
echo =====================================================================
echo          ERROR OCCURRED
echo =====================================================================
echo.
echo Something went wrong. Check the error message above.
echo Common issues:
echo - Not logged into Expo (run: eas login)
echo - Git not found (install Git for Windows)
echo - Node_modules issues (try: rm -r node_modules, then npm install)
echo.
pause
goto :end

:end
exit /b 0
