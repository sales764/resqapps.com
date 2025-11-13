@echo off
REM ============================================
REM Script de conversion PNG vers WebP
REM RESQ+ Website Image Optimizer
REM ============================================

echo.
echo ========================================================
echo      PNG TO WebP CONVERTER - RESQ+ Website
echo ========================================================
echo.

REM Exécuter le script PowerShell
powershell.exe -ExecutionPolicy Bypass -File "%~dp0convert-to-webp.ps1"

echo.
pause
