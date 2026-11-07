# Portfolio7

Desktop-first recreation of the supplied portfolio reference. Built with React, TypeScript, and Vite, with shadcn/ui configured for additional components.

## Development

```sh
npm install
npm run dev
```

`npm run build` checks TypeScript and produces the static site in `dist/`. `npm run preview` serves the production build.

shadcn is installed as a development dependency. Add components with `npx shadcn@latest add <component-or-registry-url>`. Configuration lives in `components.json`; Tailwind v4 utilities and theme mappings live in `src/styles/shadcn.css`. The existing reset is retained, with its rules in the base layer so future component utilities can override them.

## Structure

```text
src/
  App.tsx                     Page composition and theme state
  components/
    sections/                 One component per portfolio section
    ui/                       Shared icons, headings, and links
    CommandMenu.tsx           Keyboard-accessible command menu
    SectionIndex.tsx          Scroll-aware desktop navigation
    ResumeDialog.tsx          Scrollable resume overlay and PDF download
  data/
    portfolio.ts              Profile, projects, links, section definitions
    socials.ts                Social profiles, hover-card content, resume URL
    resume.ts                 Local resume image and PDF paths
    reference-content.json    Reference experience, skills, blog, highlights
    github-activity.json      Public contribution-calendar snapshot
    github-contributions.json Public open/closed pull-request snapshot
  hooks/                      Scroll tracking
  styles/
    global.css                Fonts, tokens, resets, shared controls
    layout.css                Page geometry, header, navigation, footer
    sections.css              Section-specific styling
    dialogs.css               Command menu and highlight lightbox
    buttons.css               Tactile button effects, resume glow, social cards
    radial-glow-button.css    Original VengeanceUI radial glow and shine effects
    shadcn.css                 Tailwind utilities and shadcn theme mappings
    booking-button.css          Hinged booking-button cover animation
public/
  fonts/                      Locally hosted fonts
  icons/                      SVG icon sprite
  images/                     Images grouped by section
```

## Personalizing

Dark mode uses `public/images/hero/naren-banner.jpg`, copied unchanged from `public/banner.jpg` in `ntbnaren7/naren7.me`. Light mode uses `naren-banner-day.jpg`, a daylight edit of the same pixel-art scene generated with the built-in image tool. The source is 1376×768 and the daylight version is 1679×937. Both use `object-position: center 65%` to keep the resting knight visible within the shallow banner. The daylight generation prompt is saved alongside the image in `naren-banner-day.prompt.txt`.

`BannerAtmosphere.tsx` adds a decorative canvas with 20 drifting petals. Petals follow gravity, air drag, shared wind gusts, and local flutter, with off-screen wrapping and simulated tumbling. Only dark mode has star glints: one at a time in the upper-left sky, lasting 1.4–2.2 seconds with random 12–28 second gaps and a new position each time. Light mode has no glints. Motion pauses off-screen or in hidden tabs, and the overlay is disabled for reduced-motion preferences. No animation dependency is needed.

The visible experience entries in `src/data/portfolio.ts` are Hyle Global and Dot Com Infoway (DCI), with local logos from `assets-to-use`. The previous sample entries remain in `reference-content.json`, with their spread commented out in the visible array. The experience View All link is also commented out. Rows become expandable when descriptions, statistics, or tags are added; otherwise they display the supplied role, dates, and location without an empty disclosure.

The booking button uses `BookingLink.tsx`: a hinged cover folds down to reveal the booking domain, with a dark inner face and a soft cast shadow. It follows the supplied reference effect while retaining the compact button footprint and the owner's Calendly destination. Hover and keyboard focus open the cover, reduced-motion preferences are respected, and the surrounding layout stays in place.

The main avatar uses `public/images/profiles/goat.svg`. The favicon uses a circularly clipped copy at `public/favicon.svg`, with transparent corners. LinkedIn and Discord hover-card avatars use their respective PNGs in the profiles directory, copied from `assets-to-use`. Per-platform avatar overrides live in `src/data/socials.ts`.

The main profile text and project details still belong to the supplied reference, and are temporary content for visual matching. Replace the remaining reference content in `src/data/portfolio.ts` and `src/data/reference-content.json` with your own details before publishing. Update the title and description in `index.html` as well.

Social links and profile previews are configured in `src/data/socials.ts`. GitHub details and its local avatar come from the public GitHub API; LinkedIn details come from its public listing with the follower count supplied by the owner; Twitter and Discord details come from the supplied screenshots. Counts are static snapshots rather than live API requests. Discord opens the supplied numeric profile ID directly. The social buttons use the same `FaGithub`, `FaTwitter`, `FaLinkedin`, and `FaDiscord` exports from `react-icons/fa`; the resume uses `FileText` from `lucide-react`.

Social hover cards are horizontally centered on their buttons, shifting only when needed to maintain a 16px viewport margin. They open below by default and flip above when there is insufficient space below and more room above. Placement updates while open on scroll, resize, and changes to card dimensions, including image and font loading. The gap remains hoverable on either side so the card stays open when the pointer moves onto it.

The card design is adapted from [the reference portfolio's original component](https://github.com/Ashutoshx7/Portfolio-v2-/blob/main/src/components/pixel-perfect/social-hover-card.tsx), using `src/styles/social-hover-card.css`: 250px desktop / 230px mobile widths, translucent light/dark surfaces, grayscale avatars, flat GitHub/Discord layouts, stacked Twitter/LinkedIn layouts, and the original spacing and typography. Hover delays are 80ms open / 120ms close, with the original 220ms fade/scale easing. Twitter uses this portfolio's day/night banner; LinkedIn retains the supplied LinkedIn banner. Profile details, links, avatars, counts, and the manually set Discord status remain local data.

The social buttons and resume share the original `.small-button` sizing. `buttons.css` supplies tactile surfaces, social cards, and compact resume overrides. The resume component was installed using `npx shadcn@latest add https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/radial-glow-button.json`. Its original effects are kept in `radial-glow-button.css`, loaded once by `radial-glow-button.tsx`. The compact override clips the gradient to the padding box and adjusts the inner radii to prevent it painting outside the border. Hover cards open on focus and dismiss with Escape.

The Resume button and command-menu action open the same native dialog with a fade/scale transition and blurred backdrop. The supplied image and PDF are copied unchanged into `public/resume/`, with paths in `src/data/resume.ts`. The image scrolls inside the preview, while the toolbar remains visible. Download PDF uses the installed VengeanceUI `LiquidMetalButton`, sized for the toolbar, to activate a same-origin download link. Its shader mounts only while the preview is open and uses zero animation speed for reduced-motion preferences. Escape, the close button, or a backdrop click dismiss the preview; native dialog behavior handles focus and the page scrolls only after dismissal.

The GitHub calendar uses a public contribution snapshot for `ntbnaren7`, with no runtime API requests. Replace `src/data/github-activity.json` when refreshing the graph. `GitHubActivitySection.tsx` renders the calendar independently. The `OpenSourceSection` import and render in `App.tsx`, plus the Open Source entry in `src/data/portfolio.ts`, are commented out for now. Its implementation and sample data remain available for later use.

Desktop geometry follows the reference: a centered 40vw column, a 22vh banner, a 112px identity row, locally hosted Geist, dotted rules, and a fixed section index. Basic small-screen fallbacks are included; a dedicated mobile matching pass is pending mobile references.

Horizontal rules include small 3px circular junctions where they meet the column rails and project-grid divider. The shared CSS backgrounds follow both themes, add no layout space, and hide rail junctions when the rails are hidden on small screens.

Interactions include native expandable experience rows, command search with Cmd/Ctrl+K and arrow-key navigation, a persistent light/dark theme, contribution tabs, project hover previews, and a highlights gallery that pauses on hover/focus and opens images in a dialog. Reduced-motion preferences are respected.

Source reference: https://www.ashutoshx7.me/
