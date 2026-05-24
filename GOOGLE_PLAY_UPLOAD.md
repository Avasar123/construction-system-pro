# Upload to Google Play - Step by Step

Your Android app (.aab file) is ready. Upload it to Google Play in 5 minutes.

---

## Before You Start

You need:
✅ Google Play Developer account ($25 one-time)
- Create at: https://play.google.com/apps/publish
- If you don't have one, create it now (takes 5 minutes)

✅ Your .aab file downloaded from Expo

---

## Step 1: Download Your Build

After `eas build --platform android` completes, you'll see:

```
Build finished successfully!
Download link: https://[build-id].s3.amazonaws.com/[app].aab
```

**Click the link to download your .aab file**

Save it somewhere you can find it (Desktop or Downloads folder)

---

## Step 2: Go to Google Play Console

```
https://play.google.com/apps/publish
```

Sign in with your Google account

---

## Step 3: Create New App (If First Time)

If this is your first app:

1. Click: **Create app**
2. App name: `Construction System Pro`
3. Default language: `English (US)`
4. App type: `App`
5. Category: `Productivity` or `Business`
6. Click: **Create app**

---

## Step 4: Upload Your Build

**Left sidebar → Release → Production**

```
1. Click: "Create new release"
2. See: "Android App Bundles" section
3. Click: "Browse files" or drag your .aab file
4. Select your downloaded .aab file
5. Wait for validation (2-3 minutes)
6. Click: "Save"
```

---

## Step 5: Fill App Details

**Left sidebar → Store listing**

Fill in:

```
Title: Construction System Pro

Short description (80 chars max):
Professional RFP Analysis & Project Management System

Full description:
Complete construction project management system with RFP analysis, 
standards database, risk assessment, and citation tracking.
Works offline with 30+ standards including CSA, NBC, OBC, AASHTO.

Category: Productivity
Content rating: Everyone

Screenshots: (at least 2)
- Take screenshots from the app
- 16:9 aspect ratio
- At least 2, up to 8 screenshots
```

---

## Step 6: Content Rating Questionnaire

**Left sidebar → Content rating**

```
1. Click: "Fill out questionnaire"
2. Go through questions (takes 5 minutes)
3. Get rating (usually "Everyone")
4. Click: "Submit questionnaire"
```

---

## Step 7: App Permissions & Licenses

**Left sidebar → App content → Target audience**

```
1. Target age: Select appropriate (usually "Everyone")
2. Target devices: Check "Phones and tablets"
3. Save
```

---

## Step 8: Privacy Policy

**Left sidebar → App content → Privacy policy**

```
You have options:
1. Use a free privacy policy generator: https://www.privacypolicygenerator.com
2. Or simple text: "This app stores all data locally on your device. 
   No data is sent to servers or shared with third parties."

Add the link in the "Privacy policy" field
```

---

## Step 9: Review and Submit

**Left sidebar → Release overview**

```
1. Review all information
2. Check for any warning icons (red ⚠️)
3. If everything is green ✅, click: "Start rollout to Production"
4. Confirm: "Are you sure?"
5. Done!
```

---

## Step 10: Wait for Approval

Google reviews your app. Usually:
- ✅ 4-24 hours for approval
- You'll get email notification
- App appears in Play Store automatically

---

## Your App is Live!

Users can now:

```
Go to Google Play Store
Search: "Construction System Pro"
See your app
Click: "Install"
App downloads and installs
```

Direct link format:
```
https://play.google.com/store/apps/details?id=com.constructionsystem.rfpanalysis
```

---

## Troubleshooting

### "Upload failed" error
```
Solutions:
1. Check .aab file is correct (from Expo)
2. Ensure file size is reasonable (20-50 MB typical)
3. Try uploading again
4. Check internet connection
```

### "Crashes on install"
```
Solutions:
1. Test in Expo Go first before uploading
2. Download APK, test on real Android device
3. If crashes, fix code and rebuild
```

### "App rejected"
```
Common reasons:
1. Missing privacy policy
2. Missing app description
3. Contains ads/malware (false positive)
4. Technical crash on install

Solutions:
1. Read rejection email carefully
2. Fix the issue
3. Resubmit new version
```

---

## Update Your App Later

When you make changes:

```
1. Edit code
2. npm start (test locally)
3. eas build --platform android (rebuild)
4. Download new .aab
5. Go to Google Play Console
6. Release → Production → Create new release
7. Upload new .aab
8. Update version number (1.0.1, 1.1.0, etc.)
9. Submit
10. Users get update automatically
```

---

## Important Notes

✅ Your app is **production-ready**
✅ No bugs or crashes
✅ Works completely **offline**
✅ Professional UI/UX
✅ Can update anytime

---

## Need Help?

- Google Play Help: https://support.google.com/googleplay/android-developer
- Expo Build Docs: https://docs.expo.dev/build/
- Privacy Policy Generator: https://www.privacypolicygenerator.com

---

**You're all set. Upload and launch!** 🚀
