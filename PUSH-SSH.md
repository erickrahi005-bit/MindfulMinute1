# Push to GitHub using SSH

## Prerequisites
1. **Install Git** (if not already installed):
   - Download: https://git-scm.com/download/win
   - Or use: `winget install Git.Git`

2. **Set up SSH keys** (if not already done):
   ```bash
   # Generate SSH key
   ssh-keygen -t ed25519 -C "your_email@example.com"
   
   # Start ssh-agent
   eval "$(ssh-agent -s)"
   
   # Add your SSH key
   ssh-add ~/.ssh/id_ed25519
   
   # Copy public key to clipboard
   cat ~/.ssh/id_ed25519.pub | clip
   
   # Add to GitHub: https://github.com/settings/keys
   ```

## Push Commands (Run in PowerShell)

Navigate to the glowup folder:
```powershell
cd C:\Users\erick\mindfulminute\glowup
```

Then run these commands:
```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: GlowUp MVP - Interactive TypeScript React app"

# Set main branch
git branch -M main

# Add SSH remote
git remote add origin git@github.com:erickrahi005-bit/MindfulMinute.git

# Push to GitHub
git push -u origin main
```

## Or use the batch script:
```powershell
.\push-to-github.bat
```

The script is now configured to use SSH instead of HTTPS.



