# Construction System Pro - RFP Analysis & Project Management

Professional RFP Analysis System with Automatic APK Builds via GitHub Actions.

## 🎯 What You Have

✅ **PWA (Progressive Web App)** - Already deployed at: https://construction-project-overview.netlify.app
✅ **GitHub Actions Automation** - Automatic APK builds on every push
✅ **Android App** - Ready for Google Play Console upload
✅ **Zero Local Setup Required** - All building happens in the cloud

---

## 📱 Features

- **RFP Analysis System** with 30+ construction/engineering standards database
- **Requirements Extraction** with automatic triangular research methodology
- **Standards Coverage** including CSA, NBC, OBC, AASHTO, MTO standards
- **Risk Assessment** with gap analysis and mitigation strategies
- **Citation Tracking** with automatic bibliography generation
- **Reference Projects** database for benchmarking
- **Works Offline** with full PWA support
- **Mobile Optimized** for seamless site-based access

---

## 🚀 Quick Start: Build & Upload Your APK

### Step 1: Push Code to GitHub

This repository is configured to automatically build your Android APK when you push code.

### Step 2: GitHub Actions Builds Automatically

When you push to this repository:
1. GitHub Actions triggers automatically
2. Builds your Android APK in the cloud (takes ~10 minutes)
3. Saves the APK as a release asset

### Step 3: Download Your APK

1. Go to: https://github.com/Avasar123/construction-system-pro/releases
2. Find the latest release
3. Download `construction-system-pro.apk`

### Step 4: Upload to Google Play Console

1. Go to: https://play.google.com/apps/publish
2. Create new app or use existing
3. Upload the APK
4. Fill in app details
5. Submit for review

---

## 🔧 What's Configured

### GitHub Actions Workflow
Located in `.github/workflows/build.yml`:
- Triggers on push to main/master branches
- Sets up Node.js 18, Java 11, Cordova
- Adds Android platform
- Builds APK in release mode
- Creates automatic release with APK as asset

### Project Configuration
Located in `config.xml`:
- App ID: `com.constructionsystem.rfpanalysis`
- App name: Construction System Pro
- Loads PWA from: https://construction-project-overview.netlify.app
- Android SDK: min 21, target 33

---

## 📂 Project Structure

```
construction-system-pro/
├── .github/
│   └── workflows/
│       └── build.yml              # GitHub Actions config
├── www/
│   └── index.html                 # App entry point (loads PWA)
├── config.xml                     # Cordova configuration
├── package.json                   # Dependencies
├── .gitignore                     # Git configuration
└── README.md                      # This file
```

---

## 🔄 How to Make Changes & Rebuild

### To Update Your App:

1. **Edit the PWA** at https://construction-project-overview.netlify.app (deployed separately)
   - Make changes to RFP analysis system
   - PWA updates automatically
   - Your Android app will show new version next time it's opened

2. **Update config.xml** if needed
   - Change app name, version, icon
   - Modify permissions
   - Save and push to GitHub

3. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update: your changes"
   git push origin main
   ```

4. **GitHub Actions builds automatically**
5. **Download new APK** from Releases
6. **Upload to Play Store**

---

## 🔐 Android Signing & Keystore

For production Play Store uploads, you need a signed APK.

The GitHub Actions workflow builds a release APK. For production signing:

1. Generate keystore (one-time):
   ```bash
   keytool -genkey -v -keystore my-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
   ```

2. Store safely - this is required for all future updates

3. To sign APK locally (if needed):
   ```bash
   jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
     -keystore my-key.jks app-release.apk my-key-alias
   ```

---

## 🛠️ Local Development (Optional)

If you want to build locally instead of using GitHub Actions:

### Requirements:
- Node.js & npm
- Java JDK 11+
- Android SDK (via Android Studio)

### Build Commands:
```bash
# Install dependencies
npm install

# Add Android platform
cordova platform add android

# Build APK
cordova build android --release

# APK output:
platforms/android/app/build/outputs/apk/release/app-release.apk
```

---

## 📦 GitHub Actions Workflow Explained

The `.github/workflows/build.yml` file:

1. **Triggers on**: Push to main/master branches or manual workflow_dispatch
2. **Runs on**: ubuntu-latest (cloud environment)
3. **Steps**:
   - Checks out code
   - Sets up Node.js 18
   - Sets up Java 11
   - Installs Cordova globally
   - Adds Android platform
   - Builds APK in release mode
   - Creates GitHub release
   - Uploads APK as release asset

Result: Your APK is ready in GitHub Releases without any local setup.

---

## 📤 Upload to Google Play Console

See `GOOGLE_PLAY_UPLOAD.md` for detailed step-by-step instructions.

Quick version:
1. Go to: https://play.google.com/apps/publish
2. Upload APK
3. Fill app details (description, screenshots, category)
4. Set pricing
5. Submit for review
6. Wait for approval (usually 24-48 hours)

---

## 🔄 Update Cycle

### When PWA Updates:
1. Changes appear in web version automatically
2. Android app loads PWA from Netlify
3. Users see updates next time they open app

### When You Need APK Update:
1. Modify config.xml (version number, etc.)
2. Push to GitHub
3. GitHub Actions builds new APK
4. Download from Releases
5. Upload to Play Store

---

## ✅ Checklist

- [x] Repository created
- [x] GitHub Actions workflow configured
- [x] Cordova config set up
- [x] PWA URL integrated (https://construction-project-overview.netlify.app)
- [x] Package.json configured
- [ ] Push code to GitHub
- [ ] Verify first build completes
- [ ] Download APK from Releases
- [ ] Upload to Google Play Console
- [ ] App live in Play Store!

---

## 🎯 Next Steps

1. **Initialize Git** (if not done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/Avasar123/construction-system-pro.git
   git push -u origin main
   ```

2. **Watch GitHub Actions**:
   - Go to Actions tab in GitHub
   - Watch the build complete (~10 minutes)

3. **Download & Upload**:
   - Releases tab → latest release
   - Download `construction-system-pro.apk`
   - Upload to Google Play Console

---

## 📞 Support

For issues with:
- **Builds**: Check `.github/workflows/build.yml`
- **App config**: Edit `config.xml`
- **Android SDK errors**: Ensure Java 11 installed locally (if building)
- **Play Store**: See `GOOGLE_PLAY_UPLOAD.md`

---

## 📝 Version

**v1.0.0** - May 2026
- Cordova Android wrapper
- GitHub Actions automation
- PWA integration
- Ready for Play Store

---

**Everything is automated. Just push to GitHub and your APK is built automatically! 🚀**
