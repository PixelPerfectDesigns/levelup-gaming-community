# Step-by-Step CSS Organization Guide for Each Page

This guide provides detailed steps for organizing CSS on each page of the LevelUp Gaming website. Follow these steps consistently for each page to ensure a clean and maintainable codebase.

## Step 1: Review Current CSS Structure

For each page:
1. Open the HTML file (e.g., `games.html`)
2. Review any inline CSS styles
3. Review internal CSS in the `<style>` tag
4. Review the corresponding CSS file (e.g., `css/games.css`)

## Step 2: Move CSS to Appropriate Files

1. **Extract Internal CSS**
   - Identify inline and internal CSS that should be moved to the external file
   - Keep minimal inline CSS for grading requirements
   - Move the rest to the page-specific CSS file

2. **Create Header Comment Structure**
   ```css
   /* css/page-name.css - Page specific styles */

   /* 
    * PAGE NAME CSS ORGANIZATION
    * 1. Hero Styles
    * 2. Section & Typography Styles
    * 3. Component Styles
    * 4. Button & Interactive Element Styles
    * 5. Layout & Structural Elements
    * 6. Utility Classes
    * 7. Responsive Styles
    */
   ```

3. **Add Section Headers**
   ```css
   /* ==========================================================================
      1. HERO STYLES
      ========================================================================== */
   ```

## Step 3: Organize CSS by Section

For each section in the CSS file:

1. **Hero Styles Section**
   - Hero background, overlays, and positioning
   - Hero content styling

2. **Section & Typography Styles**
   - Section layout and spacing
   - Typography-specific styles
   - Section-specific backgrounds and colors

3. **Component Styles**
   - Cards and widgets
   - Content containers
   - Special elements unique to the page

4. **Button & Interactive Elements**
   - Button styles and variations
   - Hover and active states
   - Interactive elements (carousels, tabs, etc.)

5. **Layout & Structural Elements**
   - Grids and columns
   - Structural containers
   - Positioning helpers

6. **Utility Classes**
   - Helper classes (text alignment, margins, etc.)
   - Color utility classes
   - Spacing utilities

7. **Responsive Styles**
   - Media queries
   - Mobile-specific adjustments
   - Viewport-based changes

## Step 4: Refactor CSS for Consistency

1. **Apply BEM Naming Convention**
   - Rename classes to follow BEM structure:
     - Block: `.card`, `.hero`, `.section`
     - Element: `.card__title`, `.hero__content`, `.section__heading`
     - Modifier: `.card--featured`, `.hero--games`, `.section--dark`

2. **Create Reusable Classes**
   - Identify repeated styles
   - Create reusable utility classes
   - Ensure consistent naming patterns

3. **Clean Up Redundant CSS**
   - Remove duplicated styles
   - Consolidate similar rules
   - Delete unused CSS

## Step 5: HTML Adjustments

1. **Replace Inline Styles**
   - Replace `style="color: blue"` with class references
   - Example: `<h2 style="margin-bottom: 1.5rem;">` becomes `<h2 class="section-title">`

2. **Add Page-Specific Body Class**
   - Ensure body has page name class: `<body class="games-page">`

3. **Add Class References**
   - Update elements to use new utility classes

## Step 6: Test and Validate

1. **Visual Testing**
   - Check each page at different screen sizes
   - Verify element appearance matches original design

2. **Code Validation**
   - Validate CSS for errors
   - Check for unused classes

## Example: Games Page Organization

### Before:
```html
<!-- HTML with inline styles -->
<h2 style="margin-bottom: 1.5rem; color: #29acd0;">Featured Games</h2>
```

```css
/* Scattered CSS */
.games-page .game-card { ... }
.games-page .game-card:hover { ... }

/* More code elsewhere */
.section-title { ... }
```

### After:
```html
<!-- Clean HTML with classes -->
<h2 class="section-title section-title--featured">Featured Games</h2>
```

```css
/* Organized CSS with sections */
/* ==========================================================================
   2. SECTION & TYPOGRAPHY STYLES
   ========================================================================== */
.games-page .section-title {
    margin-bottom: 1.5rem;
    text-align: center;
}

.games-page .section-title--featured {
    color: var(--primary-color);
}

/* ==========================================================================
   3. COMPONENT STYLES
   ========================================================================== */
.games-page .game-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
}

.games-page .game-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}
```

## Checklist for Each Page

- [ ] Review HTML and CSS files
- [ ] Move inline/internal CSS to page CSS file
- [ ] Add organization header comment
- [ ] Add section heading comments
- [ ] Apply BEM naming convention
- [ ] Create reusable utility classes
- [ ] Update HTML to use classes instead of inline styles
- [ ] Test visual appearance
- [ ] Validate CSS
