# Serving the App

## For Development

```bash
npm run dev
```
Open http://localhost:3000

## For Production (Static Files)

The app is pre-built in the `out/` folder. You can serve it with:

### Using npx serve
```bash
npx serve out
```

### Using Python
```bash
cd out
python3 -m http.server 8000
```
Then open http://localhost:8000

### Using Node.js http-server
```bash
npx http-server out -p 8000
```

## Deploy to Hosting

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
Drag and drop the `out/` folder to Netlify Drop, or:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=out
```

### GitHub Pages
1. Push the `out/` folder to a `gh-pages` branch
2. Enable GitHub Pages in repository settings
3. Select the `gh-pages` branch

## File Size

Total build size: ~500KB (optimized for fast loading on tablets)

## Browser Support

- Chrome/Edge (recommended)
- Safari (iOS/iPadOS)
- Firefox
- Samsung Internet

Minimum versions: Chrome 90+, Safari 14+, Firefox 88+
