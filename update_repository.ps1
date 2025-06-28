# PowerShell script to update GitHub repository
# This script will guide you through the process of updating your GitHub repository

Write-Host "LevelUp Gaming Site - Repository Update Utility" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Get repository URL
$repoUrl = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/username/levelup-gaming-community)"

# Extract repo name from URL
$repoName = ($repoUrl -split '/')[-1]
$repoName = $repoName -replace '\.git$', ''

# Step 2: Set up directories
$currentDir = Get-Location
$tempDir = Join-Path $ENV:TEMP "levelup-temp-$([DateTime]::Now.ToString('yyyyMMdd-HHmmss'))"

Write-Host "`nStep 1: Creating temporary directory at $tempDir..." -ForegroundColor Green
New-Item -Path $tempDir -ItemType Directory -Force | Out-Null

try {
    # Step 3: Clone the repository
    Write-Host "`nStep 2: Cloning the existing repository..." -ForegroundColor Green
    Set-Location $tempDir
    git clone $repoUrl
    
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to clone repository. Please check the URL and your internet connection."
    }
    
    $repoDir = Join-Path $tempDir $repoName
    Set-Location $repoDir
    
    # Step 4: Remove all existing files (except .git directory)
    Write-Host "`nStep 3: Removing existing files from repository (preserving .git folder)..." -ForegroundColor Green
    Get-ChildItem -Path $repoDir -Exclude .git | Remove-Item -Recurse -Force
    
    # Step 5: Copy all new files from current directory to repo directory
    Write-Host "`nStep 4: Copying your new files to repository..." -ForegroundColor Green
    Copy-Item -Path "$currentDir\*" -Destination $repoDir -Recurse -Force
    
    # Step 6: Add all files to git
    Write-Host "`nStep 5: Staging files for commit..." -ForegroundColor Green
    git add .
    
    # Step 7: Commit changes
    $commitMessage = Read-Host "Enter a commit message (e.g., 'Update site with new design and features')"
    Write-Host "`nStep 6: Committing changes..." -ForegroundColor Green
    git commit -m $commitMessage
    
    # Step 8: Push to GitHub
    Write-Host "`nStep 7: Pushing changes to GitHub..." -ForegroundColor Green
    git push
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`nYou might need to authenticate with GitHub." -ForegroundColor Yellow
        Write-Host "If you're asked for credentials, use your GitHub username and personal access token." -ForegroundColor Yellow
        git push
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`nSuccess! Your LevelUp Gaming site has been updated on GitHub." -ForegroundColor Green
        Write-Host "Repository URL: $repoUrl" -ForegroundColor Green
    } else {
        Write-Host "`nThere was an issue pushing to GitHub. You may need to push manually." -ForegroundColor Red
        Write-Host "Try running these commands manually in the terminal:" -ForegroundColor Yellow
        Write-Host "cd $repoDir" -ForegroundColor Yellow
        Write-Host "git push" -ForegroundColor Yellow
    }

} catch {
    Write-Host "`nError: $_" -ForegroundColor Red
    Write-Host "The update process was not completed. Please check the error message above." -ForegroundColor Red
} finally {
    # Return to original directory
    Set-Location $currentDir
    
    # Ask if user wants to keep or delete temp directory
    $keepTemp = Read-Host "`nDo you want to keep the temporary repository files? (y/n)"
    if ($keepTemp -ne "y") {
        Write-Host "Removing temporary directory..." -ForegroundColor Gray
        Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
    } else {
        Write-Host "Temporary repository kept at: $tempDir" -ForegroundColor Gray
    }
}

Write-Host "`nProcess completed!" -ForegroundColor Cyan
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
