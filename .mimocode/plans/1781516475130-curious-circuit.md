# Plan: Deep Performance Optimization (Phase 2)

## Goal
Massively reduce main bundle size, CSS output, and node_modules weight. **Site must remain visually identical — zero visual changes.** All optimizations are purely under-the-hood.

---

## 1. CSS Safelist — Narrow to 8 used colors

**File**: `src/styles/tailwind.css`

Current safelist (line 10-14) generates ~1,201 KB of CSS utilities for 15 colors.
Only 8 colors are actually used: `cyan`, `pink`, `purple`, `blue`, `emerald`, `amber`, `orange`, `rose`. The remaining 7 colors (`green`, `slate`, `red`, `indigo`, `sky`, `violet`, `teal`, `fuchsia`) generate unused CSS.

**Change**: Replace the broad safelist with only the 8 used colors. Visual output stays identical — all color classes used by components are preserved:
```css
@source inline("{,hover:,dark:,group-hover:}{bg,text,border,from,to,shadow,ring}-{cyan,pink,purple,blue,emerald,amber,orange,rose}-{50,100,200,300,400,500,600,700,800,900,950}");
```

**Impact**: ~400-600 KB CSS reduction (1,218 KB → ~600-800 KB).

---

## 2. Lazy-load 4 Pages in App.tsx

**File**: `src/app/App.tsx`

Convert direct imports to `React.lazy()`:
- `ProfilePage` (line ~18) → `lazy(() => import("./components/pages/ProfilePage"))`
- `ProfessionsPage` (line ~16) → `lazy(() => import("./components/pages/ProfessionsPage"))`
- `SkillLearningPage` (line ~20) → `lazy(() => import("./components/pages/SkillLearningPage"))`
- `Quiz` (QuizQuest, line ~14) → `lazy(() => import("./components/utils/QuizQuest"))`

Wrap their render sites in `<Suspense fallback={...}>`.

**Impact**: ~175 KB removed from main chunk.

---

## 3. Highlight.js — Dynamic import + core only

**File**: `src/app/components/pages/SkillLearningPage.tsx`

Replace:
```tsx
import hljs from 'highlight.js';
```
With dynamic import:
```tsx
const [hljs, setHljs] = useState<any>(null);
useEffect(() => {
  import('highlight.js/lib/core').then((mod) => {
    const h = mod.default;
    import('highlight.js/lib/languages/xml').then(m => h.registerLanguage('html', m.default));
    import('highlight.js/lib/languages/css').then(m => h.registerLanguage('css', m.default));
    import('highlight.js/lib/languages/javascript').then(m => h.registerLanguage('javascript', m.default));
    import('highlight.js/lib/languages/python').then(m => h.registerLanguage('python', m.default));
    setHljs(h);
  });
}, []);
```

Update `HighlightedCode` component to accept `hljs` as prop, show loading until ready. Same `atom-one-dark` theme, same languages, same output.

**Impact**: ~20-40 KB from main chunk, lazy-loads highlight.js. Visual output identical.

---

## 4. Lazy-load GuideCharacter

**File**: `src/app/App.tsx`

Convert:
```tsx
import { GuideCharacter } from "./components/utils/GuideCharacter";
```
To:
```tsx
const GuideCharacter = lazy(() => import("./components/utils/GuideCharacter").then(m => ({ default: m.GuideCharacter })));
```

Wrap the render site (line ~2061) in `<Suspense fallback={null}>`. Same cat, same animations, same appearance — loads slightly later.

**Impact**: ~47 KB from main chunk. Visual output identical.

---

## 5. Extract Translations to Separate Files

**New files**:
- `src/app/translations/en.ts` — EN translations object
- `src/app/translations/ru.ts` — RU translations object

**File**: `src/app/App.tsx`

Remove the ~63 KB inline `translations` object (lines 72-928). Import from new files. Same data, same structure, same text — just moved to separate files:
```tsx
import enTranslations from './translations/en';
import ruTranslations from './translations/ru';
const translations = { EN: enTranslations, RU: ruTranslations };
```

**Impact**: ~63 KB from main chunk. Visual output identical — all translations preserved verbatim.

---

## 6. Remove Unused Dependencies

**File**: `package.json`

Remove these unused packages:
```
@mui/material @mui/icons-material @emotion/react @emotion/styled
date-fns recharts react-router react-dnd react-dnd-html5-backend
react-slick react-zoom-pan-pinch embla-carousel-react cmdk
react-day-picker input-otp vaul sonner react-responsive-masonry
canvas-confetti react-hook-form react-resizable-panels react-popper
@popperjs/core
```

Then run `npm install` to clean up.

Also remove unused `src/app/components/ui/` files (39 unused shadcn components).

**Impact**: ~60 MB node_modules, cleaner tree-shaking.

---

## Files to modify

1. `src/styles/tailwind.css` — narrow safelist
2. `src/app/App.tsx` — lazy imports for 4 pages + GuideCharacter, remove translations
3. `src/app/components/pages/SkillLearningPage.tsx` — dynamic highlight.js
4. `package.json` — remove unused deps
5. `src/app/translations/en.ts` (new) — EN translations
6. `src/app/translations/ru.ts` (new) — RU translations
7. `src/app/components/ui/*.tsx` — delete 39 unused files

## Verification

1. `npm run build` — no errors, check main chunk size reduction
2. `npm run dev` — all pages work, lesson loading works, theme effects work
3. Compare build output: main chunk should drop from ~1,351 KB to ~800-900 KB
4. CSS should drop from ~1,218 KB to ~600-800 KB
5. **Visual check**: Open site in browser, compare before/after — all colors, animations, text, layouts must be identical
6. Check all 3 themes (blue/purple/mono) — backgrounds, colors, effects unchanged
7. Check mobile view — same visual as before optimizations
