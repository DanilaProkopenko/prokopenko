# Prokopenko WordPress Theme — AI Development Guide

**Theme Location:** `/wp-content/themes/prokopenko/`  
**Repository:** Local development environment (Local by Flywheel)  
**Active Development Language:** Russian (code comments) / English (documentation)

---

## Quick Start

### Development Setup
```bash
# Install dependencies
npm i

# Start development server with file watching
npm start

# Build production bundle
npm run build
```

**Build Output:** `_dist/` directory (compiled JS/CSS)

---

## Architecture Overview

### Directory Structure
```
blocks/           # Custom Gutenberg blocks (self-contained, auto-discovered)
components/       # Reusable UI components
  post-card/        # Card variations (post-card__big, post-card__works-grid)
  header/
  footer/
  search/
  filter-bar/
assets/
  js/               # Webpack entry points, config
  css/              # SCSS source (compiled to _dist/)
  resource/         # Images, fonts, static files
includes/         # PHP utilities, theme hooks
page-templates/   # Custom page templates
acf-json/         # Advanced Custom Fields configuration
_dist/            # Built output (do NOT edit manually)
theme.json        # Block editor settings, typography, colors, spacing
COLOR_SYSTEM.md   # Centralized color system documentation
```

### Architectural Patterns

#### 1. **Block Structure** (Self-Contained)
Each block in `blocks/` follows this structure:
```
blocks/example-block/
  ├── block.json        # Gutenberg block definition
  ├── template.php      # Block markup + ACF field rendering
  ├── functions.php     # PHP logic, add_action(), register_block_type()
  ├── _index.js         # Optional: JS initialization
  └── _index.scss       # Optional: Block-scoped styles
```

**Auto-Discovery:** Blocks are auto-registered via `includes/load.php` glob pattern.

#### 2. **Component Organization**
Reusable components in `components/` (no `block.json`). Used via `get_template_part()` in block templates.

#### 3. **Build System** (Webpack 5 + Babel + SCSS)
- **Entry points:** Each block can have `_index.js` and `_index.scss`
- **Config files:**
  - `assets/js/config/webpack.common.js` — shared config
  - `assets/js/config/webpack.dev.js` — development (source maps, no minification)
  - `assets/js/config/webpack.prod.js` — production (minified, optimized)
- **Loaders:**
  - Babel for JS transpilation (ES6+ → ES5-compatible)
  - SCSS → CSS with PostCSS autoprefixer
  - Asset handling (fonts, images)

#### 4. **Styling System**

**Centralized Colors:** All colors via CSS variables in `style.scss` + `theme.json`.  
See [COLOR_SYSTEM.md](COLOR_SYSTEM.md) for complete variable list.

**CSS Naming Convention:** BEM-like pattern
```scss
.block-name { }              // Block
.block-name__element { }     // Element
.block-name--modifier { }    // Modifier
```

**Responsive Typography:** Uses CSS `clamp()` for fluid sizing
```css
font-size: clamp(0.9375rem, 0.894rem + 0.2174vw, 1.0625rem);
```

Preset sizes defined in `theme.json` → `text_46`, `text_24`, `text_16`, `text_-1`, `text_-2`.

#### 5. **Database Integration** (ACF + Custom Fields)
- Theme uses Advanced Custom Fields Pro
- Custom field definitions stored in `acf-json/` directory
- Field constants referenced in block `functions.php` (e.g., `'content'`, `'subtitle'`)
- ACF JSON synced with WordPress admin → auto-discovered via `acf-json/`

#### 6. **Page Transitions** (Barba.js + Taxi)
Implemented in `assets/js/index.js`:
- Smooth AJAX page navigation
- JS reinitializes on each page load (via Barba lifecycle hooks)
- See `page-transition.js` entry point for details

#### 7. **Recent Refactoring** (Post-Card Consolidation)
Component reduction from 4 card types → 2 (documented in repo memory):
- **Kept:** `post-card__big`, `post-card__works-grid`
- **Deleted:** `post-card.php`, `post-card__feed/`, `post-card__mini/`
- **Rationale:** Eliminate duplication, maintain single source of truth

---

## Key Development Workflows

### Adding a New Block

1. **Create directory** in `blocks/`:
   ```
   blocks/my-new-block/
   ```

2. **Create `block.json`** — Gutenberg block definition:
   ```json
   {
     "apiVersion": 2,
     "name": "prok/my-new-block",
     "title": "My New Block",
     "category": "common"
   }
   ```

3. **Create `template.php`** — Block markup:
   ```php
   <?php
   $my_field = get_field('my_field');
   ?>
   <div class="my-new-block">
     <?php echo $my_field; ?>
   </div>
   ```

4. **Create `functions.php`** (optional for hooks):
   ```php
   <?php
   function my_new_block_register() {
       register_block_type( __DIR__ );
   }
   add_action( 'init', 'my_new_block_register' );
   ```

5. **Create `_index.scss`** (optional for styles):
   - Will be discovered and compiled by Webpack

6. **Run build:** `npm start` (dev) or `npm run build` (prod)

### Styling a Block or Component

1. Create `_index.scss` in block/component directory
2. Use BEM naming convention
3. Reference centralized colors via CSS variables (see [COLOR_SYSTEM.md](COLOR_SYSTEM.md))
4. Avoid hardcoding colors — always use `var(--color-*)`

Example:
```scss
.my-block {
  background: var(--color-primary);
  color: var(--color-text-primary);

  &__title {
    font-size: var(--text-size-h2);
  }

  &--active {
    border: 2px solid var(--color-primary);
  }
}
```

### Adding JavaScript Interactivity

1. Create `_index.js` in block/component directory
2. Export default function or class
3. Webpack will bundle into `_dist/`
4. JS runs on page load and after every Barba.js page transition

### Modifying Colors

1. **Global colors** → Edit `style.scss` `:root {}` section
2. **Block editor colors** → Update `theme.json` `settings.color.palette`
3. Rebuild: `npm run build`

See [COLOR_SYSTEM.md](COLOR_SYSTEM.md) for complete color variable documentation.

### Updating ACF Fields

1. Edit field definitions in WordPress admin
2. Export changes → `acf-json/` directory (auto-synced)
3. Update block `template.php` to reference new field names

---

## Critical Files & Key Patterns

| File/Directory | Purpose | When to Edit |
|---|---|---|
| `theme.json` | Block editor settings, typography, colors, spacing | Theme-wide styling changes |
| `COLOR_SYSTEM.md` | Color variable documentation | When adding new color variables |
| `style.scss` | Global SCSS, CSS variable definitions | Global styling, color updates |
| `blocks/load.php` | Block auto-discovery glob pattern | When changing block directory structure |
| `acf-json/` | ACF field definitions (synced from admin) | When creating new ACF fields |
| `includes/` | PHP utilities, custom hooks | Custom PHP functionality |
| `_dist/` | **Compiled output** | Never edit manually — run `npm build` |

---

## Development Environment Notes

### Webpack Configuration
- **Dev Server:** Not configured (watch mode only, files written to disk)
- **Source Maps:** Enabled in dev mode, disabled in production
- **CSS Extraction:** MiniCssExtractPlugin separates CSS from JS bundles

### Build Times
- **Full development build:** ~3-5 seconds
- **Single file rebuild:** ~1-2 seconds (watch mode)
- **Production build:** Add ~2 seconds for minification/optimization

### Browser Support
Babel configured for ES5-compatible output (via `@babel/preset-env`). PostCSS autoprefixing handles vendor prefixes.

### Dependencies Overview
- **Build:** Webpack 5, Babel 7, SCSS, PostCSS
- **Runtime:** GSAP (animations), Barba.js + Taxi (page transitions), Fancy Box (lightbox)
- **CMS Framework:** WordPress 6.x, Advanced Custom Fields Pro

---

## Common Workflows & Troubleshooting

### Issue: Changes to `_index.scss` not appearing in frontend
**Solution:** Run `npm start` or `npm run build`. Check `_dist/` directory for compiled CSS.

### Issue: ACF fields not showing in block template
**Solution:**
1. Verify field name in block's `template.php` matches ACF field slug
2. Check `acf-json/` directory for field definition JSON
3. Clear WordPress cache if using caching plugin

### Issue: JavaScript code doesn't execute after page transition
**Solution:** Code must re-initialize on Barba.js `after` hook. See `assets/js/index.js` for pattern.

### Issue: New block not appearing in editor
**Solution:**
1. Ensure `block.json` exists in block directory
2. Check `blocks/load.php` glob pattern finds your block
3. Run `npm run build` (required for manifest generation in production)
4. Clear WordPress cache

### Adding CSS Transition/Animation Timing
All transitions/hovers should use centralized timing. Define in `:root` if not already present:
```scss
--transition-normal: 0.3s ease-in-out;
--transition-slow: 0.5s ease-in-out;
```

---

## Quick Commands Reference

```bash
# Development
npm start                    # Watch mode, rebuild on file change
npm run watch               # Alias for start

# Production
npm run build               # Minified, optimized build

# Git workflow (from theme root)
git status                  # Check uncommitted changes
git add .                   # Stage changes
git commit -m "message"     # Commit
git push                    # Push to remote (if configured)
```

---

## Resources & Links

- **[COLOR_SYSTEM.md](COLOR_SYSTEM.md)** — Complete centralized color variable system
- **[readme.md](readme.md)** — Theme setup & block examples
- **Webpack Config:** `assets/js/config/webpack.*.js`
- **ACF Fields:** WordPress Admin → Custom Fields
- **Block Patterns:** `blocks/` directory (each subdirectory is an example)

---

## Remote Repositories & Deployment

This is a **local development environment** (Local by Flywheel). No automated deployment configured. Changes require manual sync or git push to remote repository if one exists.

**Theme Git:** `.git/` directory present — use standard Git workflow for version control.

---

**Last Updated:** April 4, 2026  
**Theme Version:** 1.0.0  
**WordPress Version:** 6.x  
**Node Version:** 16+ (for build tools)
