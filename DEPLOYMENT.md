# Deploying GlowUp to GitHub

## Option 1: Using GitHub Desktop (Easiest)

1. **Install GitHub Desktop** (if not already installed):
   - Download from: https://desktop.github.com/

2. **Open GitHub Desktop** and sign in with your GitHub account

3. **Add the repository**:
   - Click "File" → "Add Local Repository"
   - Navigate to: `C:\Users\erick\mindfulminute\glowup`
   - Click "Add Repository"

4. **Publish to GitHub**:
   - Click "Publish repository" button
   - Repository name: `MindfulMinute`
   - Owner: `erickrahi005-bit`
   - Make sure "Keep this code private" is unchecked (or checked if you want it private)
   - Click "Publish Repository"

## Option 2: Using Git Command Line

1. **Install Git for Windows** (if not installed):
   - Download from: https://git-scm.com/download/win
   - Install with default settings

2. **Open PowerShell or Command Prompt** and navigate to the project:
   ```powershell
   cd C:\Users\erick\mindfulminute\glowup
   ```

3. **Initialize git and push**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: GlowUp MVP"
   git branch -M main
   git remote add origin https://github.com/erickrahi005-bit/MindfulMinute.git
   git push -u origin main
   ```

   If prompted for credentials, use a Personal Access Token:
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate a new token with `repo` permissions
   - Use the token as your password

## Option 3: Using GitHub Web Interface

1. Go to https://github.com/erickrahi005-bit/MindfulMinute
2. Click "uploading an existing file"
3. Drag and drop all files from the `glowup` folder
4. Commit directly to the main branch
5. Click "Commit changes"

## After Pushing to GitHub

Once your code is on GitHub, you can deploy to Vercel:

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your `MindfulMinute` repository
4. Vercel will auto-detect it's a Vite project
5. Click "Deploy" - no configuration needed!

Your app will be live at: `https://your-project-name.vercel.app`

