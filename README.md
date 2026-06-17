# Field — A Form-Field Mini Design System

A small, accessible, reusable set of styled form controls and their states. One
source of truth for text, select, radio, checkbox, switch, date, file, and
textarea inputs — with first-class `:focus`, `:invalid`, `:checked`, disabled,
read-only, and error states.

No build step, no dependencies. Just open `index.html`.

## What's inside

- **A live form** built entirely from the system, with accessible client-side
  validation (errors wired via `aria-invalid` and `aria-describedby`).
- **A state gallery** showing every control pinned to each state, so the system
  is self-documenting.
- **Design tokens** — everything is driven by CSS custom properties
  (`--accent`, `--danger`, `--surface`, `--border`, `--text`, `--radius`,
  `--space`).
- **Light / dark theming** that respects the saved preference and the system
  `prefers-color-scheme`.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Markup for the demo form, state gallery, and token swatches. |
| `fields.css` | The design system: tokens, control styles, and every state. |
| `fields.js` | Interaction layer only — theme toggle, file-name reflection, and accessible validation. All visual state lives in CSS. |

## Usage

Clone and open the page directly in a browser:

```sh
git clone https://github.com/israelortizcpsc/MiniSys.git
cd MiniSys
# open index.html in your browser, or serve it:
python -m http.server 8000   # then visit http://localhost:8000
```

To reuse the controls in your own project, copy `fields.css` and apply the
classes (`control`, `field`, `choice`, `switch`, `select`, `file`, `btn`).
The JS is optional — it adds validation and theming but the visuals stand alone.

## Accessibility

- Labels and `aria-describedby` connect hints and errors to each control.
- `aria-invalid` reflects the live validation state.
- Visible focus rings, a skip link, and a `role="status"` live region for
  submit feedback.

## License

MIT — see [LICENSE](LICENSE).
