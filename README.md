# Magic Portfolio

Magic Portfolio is a simple portfolio built with Next.js, Once UI and MDX. This version is focused on portfolio, services and blog content only.

![Magic Portfolio](public/images/og/home.jpg)

## Getting started

**1. Clone the repository**
```bash
git clone https://github.com/once-ui-system/magic-portfolio.git
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the dev server**
```bash
npm run dev
```

**4. Edit config**
```bash
src/resources/once-ui.config.ts
```

**5. Edit content**
```bash
src/resources/content.tsx
```

**6. Add blog posts or projects**
```bash
src/app/blog/posts
src/app/work/projects
```

## RSS

- Blog: `/rss.xml`

## Features

### Once UI
- All tokens, components and features of [Once UI](https://once-ui.com)

### SEO
- Automatic open graph image generation with `next/og`
- Automatic schema and metadata generation based on content files
- Sitemap and robots generation with static routes, blog and work entries

### Content
- MDX-based blog posts and project case studies
- Conditional sections driven by the content files
- Social links generated from the shared content config

## Documentation

Docs available at: [docs.once-ui.com](https://docs.once-ui.com/docs/magic-portfolio/quick-start)

## License

Distributed under the CC BY-NC 4.0 License.
- Attribution is required.
- Commercial usage is not allowed.
- You can extend the license to [Dopler CC](https://dopler.app/license) by purchasing a [Once UI Pro](https://once-ui.com/pricing) license.

See `LICENSE.txt` for more information.
