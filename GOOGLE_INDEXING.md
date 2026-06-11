# Google Indexing Setup

This site can only be found through Google after it is published on a public domain.

## Before publishing

Replace every `https://example.com/` value with the final public domain in:

- `index.html`
- `robots.txt`
- `sitemap.xml`

## Recommended publishing steps

1. Upload the files to a public hosting provider such as Netlify, Vercel, Cloudflare Pages, GitHub Pages or a private web server.
2. Connect the final domain.
3. Open Google Search Console.
4. Add and verify the domain property.
5. Submit the sitemap URL:

   `https://your-domain.com/sitemap.xml`

6. Use URL Inspection in Google Search Console and request indexing for:

   `https://your-domain.com/`

## Important confidentiality note

The current static website is a presentation gate, not a real security system. Search engines and technically skilled visitors may still inspect files delivered to the browser. For a truly confidential property page, the access code must be checked on a server before the protected property content is sent to the visitor.
