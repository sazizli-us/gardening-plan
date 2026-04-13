# Backyard Garden Helper

Simple static site for the family garden plan in Fulshear, Texas.

## Files

- `index.html` for the page structure
- `styles.css` for the visual design
- `data.js` for plant nicknames, routines, forecast notes, sources, and the 30-day plan
- `app.js` for rendering the cards and highlighting the current day

## Local preview

Open `index.html` directly in a browser, or run:

```powershell
py -m http.server 8000
```

Then visit `http://localhost:8000`.

## Editing

If you want to adjust care guidance later, edit `data.js` first. The page layout is intentionally simple so the content is easy to update.
