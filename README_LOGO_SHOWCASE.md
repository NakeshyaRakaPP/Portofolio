# Logo Showcase — Image Replacement Guide

The modal and all five logo case-study pages are already wired. You only need to replace the placeholder JPG files below while keeping the same filenames.

## Recommended export

- Preferred working size: **1600 × 1200 px (4:3)** or larger.
- JPG/WebP is ideal for mockups/photos.
- Keep the important subject away from the extreme edges because the modal uses `object-fit: cover`.
- The first image (`01-hero.jpg`) should be the strongest composition because it becomes the first visual shown in the modal and the large hero visual on the case-study page.
- The actual logo mark is already pulled from the existing logo PNG, so you do **not** need to create a separate logo-only image.

## 1. JOKI RIF
Folder: `src/img/logo-projects/jokirif/`

- `01-hero.jpg` — strongest overall application / brand scene.
- `02-application-a.jpg` — digital profile, avatar, banner, or profile UI.
- `03-application-b.jpg` — promotional graphic / social media creative.
- `04-application-c.jpg` — merchandise, sticker, shirt, card, or another physical touchpoint.

## 2. RAJA 1BLIS E-Sport
Folder: `src/img/logo-projects/raja-iblis/`

- `01-hero.jpg` — strongest team / e-sports identity scene.
- `02-application-a.jpg` — jersey mockup.
- `03-application-b.jpg` — tournament poster / match-day graphic / social post.
- `04-application-c.jpg` — team merchandise, player card, banner, or related identity asset.

## 3. MINARA
Folder: `src/img/logo-projects/minara/`

- `01-hero.jpg` — mukena + packaging hero composition. This should be the strongest MINARA visual.
- `02-application-a.jpg` — packaging box.
- `03-application-b.jpg` — logo application on mukena fabric, embroidery, woven label, or close-up detail.
- `04-application-c.jpg` — product tag, shopping bag, thank-you card, ribbon, or other packaging detail.

## 4. RELASKA COMPUTER
Folder: `src/img/logo-projects/relaska/`

- `01-hero.jpg` — strongest RELASKA brand scene combining technology + retail.
- `02-application-a.jpg` — website/storefront/signage application.
- `03-application-b.jpg` — computer-part packaging, shipping box, sticker, or shopping bag.
- `04-application-c.jpg` — retail counter, receipt, staff shirt, product card, or other branded touchpoint.

## 5. PTM LUMBA-LUMBA PISANGAN BARU
Folder: `src/img/logo-projects/ptm/`

- `01-hero.jpg` — strongest table-tennis community scene.
- `02-application-a.jpg` — jersey / team shirt.
- `03-application-b.jpg` — tournament/event banner, poster, or backdrop.
- `04-application-c.jpg` — paddle case, ball box, sticker, towel, membership card, or equipment application.

## Modal behavior

The modal opens with `01-hero.jpg` by default. The logo itself is the second thumbnail. The thumbnail strip stays at the bottom of the modal and clicking a thumbnail swaps the large visual on the right.

The `VIEW CASE STUDY` button opens the dedicated page for that identity.
