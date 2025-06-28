# CSS Cleanup Script

# This PowerShell script will help organize CSS across all pages
# To run this script, right-click and select "Run with PowerShell"

Write-Host "=== LevelUp Gaming Website CSS Organization Script ===" -ForegroundColor Cyan

# Define pages to process
$pages = @(
    "index.html",
    "about.html",
    "games.html",
    "events.html",
    "community.html",
    "contact.html",
    "register.html"
)

# Define CSS files to organize
$cssFiles = @(
    "css/base.css",
    "css/navigation.css",
    "css/footer.css",
    "css/home.css",
    "css/about.css",
    "css/games.css",
    "css/events.css",
    "css/community.css",
    "css/contact.css",
    "css/register.css"
)

Write-Host "`nStep 1: Scanning files..." -ForegroundColor Yellow

# Add section headers to CSS files
foreach ($cssFile in $cssFiles) {
    Write-Host "Processing $cssFile" -ForegroundColor Green
    
    # Check if file exists
    if (Test-Path $cssFile) {
        $content = Get-Content $cssFile -Raw
        
        # Check if file already has organization header
        if (-not ($content -match "CSS ORGANIZATION")) {
            $fileName = Split-Path $cssFile -Leaf
            $pageName = [System.IO.Path]::GetFileNameWithoutExtension($fileName)
            
            # Create organization header
            $header = @"
/* 
 * $($pageName.ToUpper()) CSS ORGANIZATION
 * 1. Hero Styles
 * 2. Section & Typography Styles
 * 3. Component Styles
 * 4. Button & Interactive Element Styles
 * 5. Layout & Structural Elements
 * 6. Utility Classes
 * 7. Responsive Styles
 */

$content
"@
            
            # Write updated content
            Set-Content -Path $cssFile -Value $header
            Write-Host "  ✓ Added organization header" -ForegroundColor Green
        } else {
            Write-Host "  ✓ Organization header already exists" -ForegroundColor Green
        }
    } else {
        Write-Host "  ✕ File not found" -ForegroundColor Red
    }
}

Write-Host "`nStep 2: Reviewing CSS organization..." -ForegroundColor Yellow

# Display instructions for manual review
$instructions = @"
Manual steps to complete CSS organization:

1. For each page's CSS file:
   - Review the file structure and organize styles into the defined sections
   - Add section comments like:
   
     /* ==========================================================================
        SECTION NAME
        ========================================================================== */

2. In each HTML file:
   - Move inline styles to the appropriate CSS file
   - Keep minimal inline CSS for grading requirements
   - Replace style attributes with class references

3. Check the CSS_ORGANIZATION_GUIDE.md file for complete guidelines

"@

Write-Host $instructions -ForegroundColor White

Write-Host "`nScript completed. Follow the manual steps to complete the organization." -ForegroundColor Cyan
Write-Host "Refer to CSS_ORGANIZATION_GUIDE.md for detailed CSS organization guidelines." -ForegroundColor Cyan
