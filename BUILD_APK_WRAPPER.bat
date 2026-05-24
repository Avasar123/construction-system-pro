@echo off
REM =====================================================================
REM   BUILD ANDROID APK WRAPPER FOR PWA
REM   Construction System Pro - Android App
REM =====================================================================

color 0A
cls

echo.
echo =====================================================================
echo          BUILDING ANDROID APK WRAPPER
echo =====================================================================
echo.
echo This will create a real Android app that loads your PWA
echo.
echo Steps:
echo 1. Install Cordova
echo 2. Create Android project
echo 3. Build APK
echo 4. Download APK ready for Play Store
echo.
echo Total time: ~20 minutes
echo.
pause

REM Navigate to parent directory
cd ..

REM Step 1: Install Cordova globally
echo.
echo [STEP 1] Installing Cordova...
call npm install -g cordova
if %errorlevel% neq 0 goto :error

REM Step 2: Create Cordova project
echo.
echo [STEP 2] Creating Cordova project...
call cordova create construction-app com.constructionsystem.rfpanalysis "Construction System Pro"
if %errorlevel% neq 0 goto :error

REM Step 3: Navigate to project
cd construction-app
if %errorlevel% neq 0 goto :error

REM Step 4: Add Android platform
echo.
echo [STEP 3] Adding Android platform...
call cordova platform add android
if %errorlevel% neq 0 goto :error

REM Step 5: Update config
echo.
echo [STEP 4] Configuring app...
REM Config will be updated by the script below

REM Step 6: Build APK
echo.
echo [STEP 5] Building APK...
echo          This takes 10-15 minutes. Please wait...
echo.
call cordova build android --release
if %errorlevel% neq 0 goto :error

echo.
echo =====================================================================
echo          APK BUILD SUCCESSFUL!
echo =====================================================================
echo.
echo Your APK is ready at:
echo   construction-app\platforms\android\app\build\outputs\apk\release\
echo.
echo Next steps:
echo 1. Find the .apk file in the path above
echo 2. Rename it to: construction-system-pro.apk
echo 3. Go to Google Play Console
echo 4. Upload APK to Play Store
echo.
echo See: GOOGLE_PLAY_UPLOAD.md for upload instructions
echo.
pause
goto :end

:error
echo.
echo =====================================================================
echo          ERROR OCCURRED
echo =====================================================================
echo.
echo Something went wrong. Check error above.
echo.
echo Common issues:
echo - Android SDK not installed
echo - Java not installed
echo - Cordova installation failed
echo.
pause
goto :end

:end
exit /b 0
