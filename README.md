# Ferreti Wall Systems — Digital Business Card

A single-page digital business card, hosted on GitHub Pages. Plain HTML/CSS/JS with no build step.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The card. Contact details, services and license live here. |
| `style.css` | Styles (brand colors are the variables at the top). |
| `script.js` | Share button, QR code popup, footer year. |
| `ferreti-wall-systems.vcf` | The "Save contact" file (vCard with the logo as the contact photo). |
| `assets/` | Logo, favicon, app icons, link-preview image (`og-image.png`), QR library. |

## Changing contact details

Update the phone or email in **both** `index.html` and `ferreti-wall-systems.vcf`.

## Publishing

Push these files to the root of a GitHub repo, then go to **Settings → Pages → Deploy from a branch → `main` / root**.
If the repo is named `<account>.github.io`, the card is served at `https://<account>.github.io/`.
