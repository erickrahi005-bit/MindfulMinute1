# GlowUp - Push to GitHub Script
# Run this script after installing Git for Windows

Write-Host "🚀 Pushing GlowUp to GitHub..." -ForegroundColor Cyan

# Check if git is available
try {
    git --version | Out-Null
} catch {
    Write-Host "❌ Git is not installed or not in PATH." -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Navigate to script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "📁 Current directory: $scriptPath" -ForegroundColor Gray

# Initialize git if not already initialized
if (-not (Test-Path .git)) {
    Write-Host "🔧 Initializing git repository..." -ForegroundColor Yellow
    git init
}

# Add all files
Write-Host "📦 Adding files..." -ForegroundColor Yellow
git add .

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host "💾 Committing changes..." -ForegroundColor Yellow
    git commit -m "Initial commit: GlowUp MVP - Interactive TypeScript React app"
} else {
    Write-Host "ℹ️  No changes to commit." -ForegroundColor Gray
}

# Set main branch
git branch -M main

# Add remote if it doesn't exist
$remote = git remote get-url origin 2>$null
if (-not $remote) {
    Write-Host "🔗 Adding remote repository..." -ForegroundColor Yellow
    git remote add origin git@github.com:erickrahi005-bit/MindfulMinute.git
} else {
    Write-Host "✅ Remote already configured: $remote" -ForegroundColor Green
    # Update to SSH if it's currently HTTPS
    if ($remote -like "*https://*") {
        Write-Host "🔄 Updating remote to use SSH..." -ForegroundColor Yellow
        git remote set-url origin git@github.com:erickrahi005-bit/MindfulMinute.git
    }
}

# Push to GitHub
Write-Host "⬆️  Pushing to GitHub via SSH..." -ForegroundColor Yellow
Write-Host "   (Make sure you have SSH keys set up with GitHub)" -ForegroundColor Gray
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "🌐 View your repo at: https://github.com/erickrahi005-bit/MindfulMinute" -ForegroundColor Cyan
} else {
    Write-Host "❌ Push failed. Please check your SSH keys." -ForegroundColor Red
    Write-Host "💡 Set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh" -ForegroundColor Yellow
}

