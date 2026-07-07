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

## Password gate

The site opens with a password page (current password: `abyss`, case-insensitive).
To change it, run `printf 'newword' | shasum -a 256` and paste the hash into
`GATE_HASH` at the top of `js/main.js`. Visitors stay unlocked for their browser
session.

Note: this is a curtain, not a lock. On a static site the check happens in the
visitor's browser, so someone technical can bypass it by reading the source —
and if the GitHub repo is public, everything in it is visible there too. It's
fine for keeping casual visitors out; don't rely on it for anything sensitive.

## Notes

- Images in `assets/` were pulled from her Vanderbilt Review and senior show
  pages. Swap in original high-res photos when available — especially for
  *Pear* and *Bird Talk*.
- `_research/` is scratch material and is git-ignored.
