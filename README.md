# learn2phoenix.github.io

Personal site for Anubhav Gupta — <https://learn2phoenix.github.io/>

Plain static files, no build step. GitHub Pages serves the repo root as-is;
pushing to `main` deploys.

```
index.html                  the whole site (one page)
assets/css/main.css         the whole stylesheet
assets/js/main.js           scroll-spy, email assembly, footer year
assets/img/teasers/*.webp   paper teasers, 960w + 480w
assets/img/og.jpg           social preview card
assets/favicon.svg
files/                      CV and hosted PDFs
projects/                   original full-resolution figures (sources only,
                            not referenced by the page)
```

## Preview locally

```bash
python3 -m http.server 8000    # then open http://localhost:8000
```

## Adding a paper

1. Drop the full-resolution teaser in `projects/`.
2. Generate the two web sizes:

   ```bash
   NAME=myproject
   magick projects/$NAME.png -resize 960x540\> -background white \
     -gravity center -extent 960x540 -strip PNG24:/tmp/w.png
   cwebp -q 82 /tmp/w.png -o assets/img/teasers/$NAME.webp
   magick projects/$NAME.png -resize 480x270\> -background white \
     -gravity center -extent 480x270 -strip PNG24:/tmp/n.png
   cwebp -q 78 /tmp/n.png -o assets/img/teasers/$NAME@480.webp
   ```

   The figures are letterboxed onto white rather than cropped, so nothing is cut
   off. `.pub__fig` frames them on an explicit white plate with a hairline rule,
   so a paper figure reads as a printed plate rather than as a bright patch.

3. Copy an existing `<article class="pub">` block in `index.html` to the top of
   `#publications` and edit it. Rows are uniform — newest simply goes first,
   there is no special "featured" markup to maintain. The marginalia column
   carries the venue, an optional crimson `.pub__stamp` (first author, equal
   contribution) and the `[ PAPER ]`-style links.
4. Add a `<li>` to the top of the news list.

## Notes

- The email address is assembled in `main.js` rather than written into the
  markup, so it is copy-pasteable but not sitting in plain text for scrapers.
- The design is a university-press monograph: warm paper (`#f9f8f5`), Newsreader
  for anything that reads as text and Schibsted Grotesk for anything that reads
  as metadata, and one crimson (`#8b261e`) used only for rubrics, stamps and
  hovers — never as a default link colour. `border-radius` is 0 everywhere.
- Every section is the same two-track `.spread`: a narrow marginalia column for
  dates, venues and links, and a wide column for prose. That single grid is what
  keeps the page aligned; new sections should reuse it rather than invent a
  layout.
- Newsreader is a variable font with an optical-size axis. The stylesheet drives
  `font-variation-settings: "opsz"` explicitly — 72 for the name, 36 for section
  titles, 24 for paper titles. Dropping that makes large type look bloated.
- `font-variant-numeric: tabular-nums` is scoped to `.role__when`, `.news time`
  and `.pub__venue` only. In Schibsted Grotesk `tnum` also widens the comma and
  full stop, which visibly gaps the punctuation in author lists and prose.
- Light-only by design; the print stylesheet just drops the furniture.
