# How to Update Your GitHub Repository

You have two options to update your GitHub repository with the new LevelUp Gaming Community website files:

## Option 1: Using the Automated Script (Recommended)

1. Open PowerShell
2. Navigate to your project folder:
   ```
   cd "c:\Users\ajsta\OneDrive\Desktop\Pixel Perfect Designs\LEVEL_UP_NEW_VERSION"
   ```
3. Run the update script:
   ```
   .\update_repository.ps1
   ```
4. Follow the prompts:
   - Enter your GitHub repository URL
   - Enter a commit message
   - Enter your GitHub credentials when prompted

## Option 2: Manual Process

If you prefer to do it manually:

1. Open PowerShell
2. Create a temporary directory for the process:
   ```
   $tempDir = "$env:TEMP\levelup-temp"
   New-Item -Path $tempDir -ItemType Directory -Force
   ```
3. Clone your repository:
   ```
   cd $tempDir
   git clone https://github.com/yourusername/levelup-gaming-community
   ```
4. Remove existing files (keep .git folder):
   ```
   $repoDir = "$tempDir\levelup-gaming-community"
   Get-ChildItem -Path $repoDir -Exclude .git | Remove-Item -Recurse -Force
   ```
5. Copy your new files:
   ```
   Copy-Item -Path "c:\Users\ajsta\OneDrive\Desktop\Pixel Perfect Designs\LEVEL_UP_NEW_VERSION\*" -Destination $repoDir -Recurse
   ```
6. Commit and push changes:
   ```
   cd $repoDir
   git add .
   git commit -m "Update site with new design and features"
   git push
   ```

## What This Does

This process will:
1. Get your existing repository
2. Remove all current files (while preserving Git history)
3. Add all your new files
4. Commit and push the changes to GitHub

Your GitHub repository will now contain the complete, updated LevelUp Gaming Community website.
