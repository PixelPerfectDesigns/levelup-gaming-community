# CSS Organization Guide for LevelUp Gaming Website

## Overview
This document outlines the CSS organization strategy for the LevelUp Gaming website to maintain consistency, readability, and maintainability across all pages.

## CSS Structure

### 1. Modular CSS Architecture
- **Base CSS**: `base.css` - Contains variables, resets, and common elements
- **Component CSS**: Individual files for specific components (navigation, footer)
- **Page-specific CSS**: Separate CSS files for each page (home.css, games.css, etc.)

### 2. File Organization
- `style-modular.css` - Main entry point that imports all other CSS files
- `/css` folder contains all modular CSS files

## CSS File Structure Template

Each CSS file should follow this consistent organization pattern:

```css
/* 
 * FILENAME - Brief description
 * 1. Variables & Settings (if needed)
 * 2. Layout & Structure
 * 3. Typography
 * 4. Components & UI Elements
 * 5. Animations & Effects
 * 6. Utility Classes
 * 7. Media Queries & Responsive Styles
 */
```

## CSS Conventions

### Naming Conventions
- Use BEM (Block Element Modifier) methodology
  - Block: `.card`, `.button`, `.hero`
  - Element: `.card__title`, `.button__icon`, `.hero__content`
  - Modifier: `.card--featured`, `.button--primary`, `.hero--home`

### Class Organization
- **Page-specific prefix**: Use `[page-name]-page` class on body tag
  - Example: `<body class="games-page">`
  - This allows for page-specific styling without duplicating classes

### Section Comments
- Use clear section comments to organize code:
```css
/* ==========================================================================
   SECTION NAME
   ========================================================================== */
```

### Whitespace and Formatting
- Use 4 spaces for indentation
- Add blank line between rule sets
- Group related properties

## Implementation Steps for Each Page

1. **Audit Current CSS**
   - Review all inline styles in HTML
   - Review internal styles in `<style>` tags
   - Review page-specific CSS file

2. **Organize CSS**
   - Move inline styles to appropriate CSS file (keeping minimal inline CSS for grading purposes)
   - Group related styles 
   - Add descriptive comments
   - Use consistent class naming
   
3. **Create Utility Classes**
   - Identify repeated styles that could be utility classes
   - Move to appropriate CSS file
   
4. **Document Changes**
   - Add comment headers to each section
   - Note purpose of complex selectors

## CSS Checklist for Each Page

- [ ] Moving inline styles to CSS files (except minimal ones for grading requirements)
- [ ] Organizing styles with clear section comments
- [ ] Converting repeated styles to reusable classes
- [ ] Using BEM naming conventions consistently
- [ ] Adding consistent section layout and spacing
- [ ] Ensuring responsive behavior is consistent
- [ ] Validating CSS for errors or redundancies

## Example Implementation (events.css)

```css
/* 
 * EVENTS CSS ORGANIZATION
 * 1. Hero Styles
 * 2. Section & Typography Styles
 * 3. Event Card Styles
 * 4. Button & Interactive Element Styles
 * 5. Schedule & Timeline Styles
 * 6. Utility Classes
 * 7. Responsive Styles
 */

/* ==========================================================================
   HERO STYLES
   ========================================================================== */
.hero--events {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    position: relative;
}

/* Hero overlay and content styles... */

/* ==========================================================================
   SECTION & TYPOGRAPHY STYLES
   ========================================================================== */
.events-page .section-title {
    text-align: center;
    margin-bottom: 1.5rem;
    /* More styles... */
}

/* ==========================================================================
   EVENT CARD STYLES
   ========================================================================== */
.events-page .event-card {
    position: relative;
    overflow: hidden;
}

/* ==========================================================================
   BUTTON & INTERACTIVE ELEMENT STYLES
   ========================================================================== */
.events-page .btn--primary {
    transition: all 0.3s ease;
}

/* ==========================================================================
   SCHEDULE & TIMELINE STYLES
   ========================================================================== */
.schedule-grid {
    /* Styles... */
}

/* ==========================================================================
   UTILITY CLASSES
   ========================================================================== */
.events-page .primary-color {
    color: var(--primary-color);
}

/* ==========================================================================
   RESPONSIVE STYLES
   ========================================================================== */
@media (max-width: 768px) {
    /* Mobile styles... */
}
```

## Maintenance
Review and update this document as the project evolves. Consistent application of these guidelines will improve development efficiency and code maintainability.
