# PowerShell script to push to GitHub repository
# This script will add all files, commit them, and push to GitHub

Write-Host "LevelUp Gaming Site - Repository Setup Utility" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Get repository URL
$repoUrl = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/username/levelup-gaming-community)"

# Check if already initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Green
    git init
}

# Add all files
Write-Host "`nAdding all files to git..." -ForegroundColor Green
git add .

# Commit changes
$commitMessage = Read-Host "Enter a commit message (e.g., 'Initial commit with complete LevelUp Gaming site')"
Write-Host "`nCommitting changes..." -ForegroundColor Green
git commit -m $commitMessage

# Add remote and push
Write-Host "`nSetting up remote repository..." -ForegroundColor Green
git remote add origin $repoUrl

Write-Host "`nPushing to GitHub..." -ForegroundColor Green
git push -u origin master

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nTrying to push to main branch instead..." -ForegroundColor Yellow
    git push -u origin main
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nYou might need to authenticate with GitHub." -ForegroundColor Yellow
    Write-Host "If you're asked for credentials, use your GitHub username and personal access token." -ForegroundColor Yellow
    
    Write-Host "`nIf you're still having issues, try these commands manually:" -ForegroundColor Yellow
    Write-Host "git remote add origin $repoUrl" -ForegroundColor Yellow
    Write-Host "git push -u origin master   # or 'git push -u origin main' if your default branch is named 'main'" -ForegroundColor Yellow
    
    $createRepo = Read-Host "Do you need instructions to create a repository on GitHub? (y/n)"
    
    if ($createRepo -eq "y") {
        Write-Host "`n1. Go to https://github.com/new" -ForegroundColor Green
        Write-Host "2. Enter 'levelup-gaming-community' as the repository name" -ForegroundColor Green
        Write-Host "3. Add a description (optional)" -ForegroundColor Green
        Write-Host "4. Choose Public or Private" -ForegroundColor Green
        Write-Host "5. DO NOT initialize with README, .gitignore, or license" -ForegroundColor Green
        Write-Host "6. Click 'Create repository'" -ForegroundColor Green
        Write-Host "7. Come back and run this script again" -ForegroundColor Green
    }
} else {
    Write-Host "`nSuccess! Your LevelUp Gaming site has been pushed to GitHub." -ForegroundColor Green
    Write-Host "Repository URL: $repoUrl" -ForegroundColor Green
}

Write-Host "`nProcess completed!" -ForegroundColor Cyan
