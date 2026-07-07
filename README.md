# Izabella Burghardt — Portfolio

A static portfolio site. No build step — plain HTML/CSS/JS, ready for GitHub Pages.

## Publish on GitHub Pages

1. Create a new repo on GitHub (e.g. `izabella-art` — or name it
   `<username>.github.io` to get the root URL).
2. Push this folder:
   ```sh
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
4. The site goes live at `https://<username>.github.io/<repo>/` in a minute or two.

## Editing

- **Add artwork**: in `index.html`, copy one `<figure class="work">` block in the
  Selected Work section, drop the image into `assets/`, and update the path,
  title, and caption.
- **Contact info**: the email and Instagram links in the footer are
  placeholders — search for `hello@example.com` in `index.html`.
- **Colors & fonts**: everything lives in the `:root` block at the top of
  `css/style.css`.

## Notes

- Images in `assets/` were pulled from her Vanderbilt Review and senior show
  pages. Swap in original high-res photos when available — especially for
  *Pear* and *Bird Talk*.
- `_research/` is scratch material and is git-ignored.
