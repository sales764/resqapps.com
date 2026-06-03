@echo off
echo =============================================
echo 🚀 RESQ+ Website Automated Deployment
echo =============================================
echo.

echo 📦 1. Optimizing and minifying files...
if exist "minify-all.ps1" (
    powershell -ExecutionPolicy Bypass -File "minify-all.ps1"
) else (
    echo ⚠️ minify-all.ps1 not found. Skipping optimization.
)
echo.

echo 🌐 2. Deploying to Netlify (Production)...
echo Running Netlify CLI... (A browser window may open if you need to log in)
echo.

call npx --yes netlify deploy --prod --dir=.

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ DEPLOYMENT SUCCESSFUL!
    echo Your updated website with the new AI Nurse profiles and First Aid Kit features is now LIVE.
) else (
    echo.
    echo ❌ DEPLOYMENT FAILED
    echo If you saw an authentication error, please type 'npx netlify login' to authenticate, then run this script again.
)

echo =============================================
pause
