@echo off
echo ========================================
echo   SUPER EASY UPLOAD TO GITHUB
echo ========================================
echo.
echo This will upload your website to GitHub.
echo.
echo IMPORTANT: You need to enter your GitHub info when asked!
echo.
pause
echo.

cd /d "c:\Users\Sales\AndroidStudioProjects\Resq\website"

echo Step 1: Cleaning up old Git files...
if exist .git rmdir /s /q .git
echo Done!
echo.

echo Step 2: Starting Git...
git init
echo Done!
echo.

echo Step 3: Connecting to GitHub...
git remote add origin https://github.com/sales764/resqapps.com.git
echo Done!
echo.

echo Step 4: Adding your website files...
git add index.html
git add privacy.html
git add thank-you.html
git add terms.html
git add 404.html
git add 500.html
git add offline.html
git add manifest.json
git add sw.js
git add sitemap.xml
git add robots.txt
git add netlify.toml
git add *.css
git add *.js
git add images/
echo Done!
echo.

echo Step 5: Saving changes...
git commit -m "Upload RESQ+ website to GitHub Pages"
echo Done!
echo.

echo Step 6: Uploading to GitHub...
echo YOU WILL BE ASKED FOR:
echo - Username: sales764
echo - Password: Your GitHub password or token
echo.
git branch -M main
git push -u origin main --force
echo.

echo ========================================
echo   UPLOAD COMPLETE!
echo ========================================
echo.
echo Your website is now on GitHub!
echo.
echo NEXT STEPS:
echo 1. Go to: https://github.com/sales764/resqapps.com/settings/pages
echo 2. Under "Source" select: main branch
echo 3. Click Save
echo 4. Wait 3 minutes
echo 5. Visit: https://sales764.github.io/resqapps.com/
echo.
echo After that, add custom domain: resqapps.com
echo.
pause
