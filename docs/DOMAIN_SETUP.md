# Custom Domain + SEO Setup

The old project used `raka-portfolio.example.com` as a placeholder. That placeholder is intentionally not shipped in production metadata.

After buying the real domain:

1. Configure the domain in GitHub Pages settings.
2. Add the correct DNS records at the domain provider.
3. Update `docs/sitemap-template.xml` with the real domain.
4. Copy it to `public/sitemap.xml`.
5. Add `Sitemap: https://YOUR-DOMAIN/sitemap.xml` to `public/robots.txt`.
6. Add canonical and Open Graph absolute URLs to each HTML entry.

Do not publish the old `.example.com` placeholder.
