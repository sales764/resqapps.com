@echo off
echo ========================================
echo   RESQ+ Website - GitHub Deployment
echo ========================================
echo.

cd /d "c:\Users\Sales\AndroidStudioProjects\Resq\website"

echo [1/5] Initializing Git repository...
git init

echo.
echo [2/5] Adding remote GitHub repository...
git remote add origin https://github.com/sales764/resqapps.com.git

echo.
echo [3/5] Adding all files...
git add .

echo.
echo [4/5] Committing files...
git commit -m "Deploy RESQ+ website to GitHub Pages"

echo.
echo [5/5] Pushing to GitHub...
git branch -M main
git push -u origin main -f

echo.
echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your website will be live in 2-3 minutes at:
echo https://sales764.github.io/resqapps.com/
echo.
echo After DNS setup, it will work at:
echo https://resq.com
echo.
echo NEXT STEPS:
echo 1. Enable GitHub Pages: Settings -^> Pages -^> Enable
echo 2. Add custom domain: resq.com
echo 3. Configure DNS records (see DEPLOY-INSTRUCTIONS.txt)
echo.
pause
