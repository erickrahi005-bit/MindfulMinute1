@echo off
echo Pushing GlowUp to GitHub...
echo.

REM Check if git is available
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed or not in PATH.
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo Or use GitHub Desktop: https://desktop.github.com/
    pause
    exit /b 1
)

echo Initializing git repository...
git init

echo Adding files...
git add .

echo Committing changes...
git commit -m "Initial commit: GlowUp MVP - Interactive TypeScript React app"

echo Setting main branch...
git branch -M main

echo Adding remote repository...
git remote remove origin 2>nul
git remote add origin git@github.com:erickrahi005-bit/MindfulMinute.git

echo.
echo Pushing to GitHub via SSH...
echo Make sure you have SSH keys set up with GitHub.
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo SUCCESS! Your code has been pushed to GitHub!
    echo View your repo at: https://github.com/erickrahi005-bit/MindfulMinute
) else (
    echo.
    echo Push failed. Please check your SSH keys.
    echo Set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
)

pause

